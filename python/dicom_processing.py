import io
import os
import pydicom
import numpy as np
from dicom2jpg import dicom2img, io2img
from PIL import ImageOps, ImageChops, Image

from model.model import model


def generate_mask(input_path):
    """
    Обрабатывает DICOM-файлы напрямую из байтового содержимого,
    использует модель для анализа и возвращает обработанное изображение с цветными масками.
    """

    dicom_io = io.BytesIO(open(input_path, 'rb').read())
    img_data = io2img(dicom_io)  # Конвертируем DICOM в numpy.ndarray

    # Проверка размерностей
    print(f"Размерность img_data: {img_data.shape}")
    if len(img_data.shape) > 3:
        raise ValueError("DICOM содержит больше измерений, чем поддерживается.")

    # Извлекаем первый слой, если это многослойный DICOM
    if len(img_data.shape) == 3:
        img_data = img_data[:, :, 0]

    # Нормализуем массив к диапазону 0-255 (если это необходимо)
    img_data = (img_data - np.min(img_data)) / (np.max(img_data) - np.min(img_data)) * 255
    img_data = img_data.astype(np.uint8)

    # Преобразуем 2D массив в PIL Image (градации серого)
    base_image = Image.fromarray(img_data).convert("L")

    # Масштабируем изображение до 640x640
    base_image = ImageOps.fit(base_image, (640, 640), Image.Resampling.LANCZOS)

    # Прогон изображения через модель YOLO
    results = model.predict(base_image)

    combined_mask = Image.new("L", base_image.size, 0)
    # Наложение масок
    if results[0].masks is not None:  # Проверяем наличие масок
        masks = results[0].masks.data.cpu().numpy()  # Маски (numpy array)

        for mask in masks:
            mask_image = Image.fromarray((mask * 255).astype(np.uint8))
            # Объединяем текущую маску с общей маской
            combined_mask = ImageChops.lighter(combined_mask, mask_image)

    return combined_mask


def process_dicom_folder(input_folder, output_folder, brightness_increase=50):
    # Создаем выходную папку, если её нет
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Рекурсивно проходим по всем файлам в папке
    for root, dirs, files in os.walk(input_folder):
        for file in files:
            # Обрабатываем только файлы с расширением .dcm
            if file.lower().endswith('.dcm'):
                input_path = os.path.join(root, file)
                try:
                    ds = pydicom.dcmread(input_path)
                    mask = generate_mask(input_path)
                except Exception as e:
                    print(f"Ошибка при чтении {input_path}: {e}")
                    continue

                # Получаем пиксельное изображение и сохраняем оригинальный тип данных
                image = ds.pixel_array
                orig_dtype = image.dtype

                # Преобразуем изображение в тип с большим диапазоном для арифметических операций
                img = image.astype(np.int32)
                height, width = img.shape

                # Используем сгенерированную маску для повышения яркости
                # Сначала масштабируем маску до исходного размера изображения
                mask_resized = mask.resize((width, height), Image.Resampling.LANCZOS)
                mask_np = np.array(mask_resized)

                # Создаем булеву маску: области, где значение маски > 128 (можете настроить порог при необходимости)
                mask_bool = mask_np > 128
                anti_mask_bool = ~mask_bool

                # Повышаем яркость только в областях, определенных маской
                img[mask_bool] += brightness_increase
                img[anti_mask_bool] = 0

                # Определяем допустимый диапазон значений в зависимости от типа данных
                if np.issubdtype(orig_dtype, np.integer):
                    min_val = np.iinfo(orig_dtype).min
                    max_val = np.iinfo(orig_dtype).max
                else:
                    min_val = np.finfo(orig_dtype).min
                    max_val = np.finfo(orig_dtype).max

                # Ограничиваем значения пикселей допустимым диапазоном
                img = np.clip(img, min_val, max_val)

                # Приводим изображение обратно к исходному типу данных
                img = img.astype(orig_dtype)

                # Обновляем PixelData в объекте DICOM
                ds.PixelData = img.tobytes()

                # Формируем путь для сохранения обработанного файла, сохраняя структуру папок
                relative_path = os.path.relpath(root, input_folder)
                save_dir = os.path.join(output_folder, relative_path)
                if not os.path.exists(save_dir):
                    os.makedirs(save_dir)
                output_path = os.path.join(save_dir, file)

                try:
                    ds.save_as(output_path)
                    print(f"Обработан файл: {input_path} -> {output_path}")
                except Exception as e:
                    print(f"Ошибка при сохранении {output_path}: {e}")


# Пример вызова:
input_folder = r"C:\Users\dkrap\Desktop\liver\DICOM_anon"
output_folder = r"C:\Users\dkrap\Desktop\liver\DICOM_anon_o"
process_dicom_folder(input_folder, output_folder, brightness_increase=150)
