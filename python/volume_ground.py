import os
from PIL import Image

# Пути к папкам
input_folder = r"C:\Users\dkrap\Desktop\liver\DICOM_anon\Ground"
output_folder = r"C:\Users\dkrap\Desktop\liver\DICOM_anon_result_ground"

# Создайте выходную папку, если её нет
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Функция для обработки изображения
def process_image(image_path, output_path):
    # Открываем изображение
    image = Image.open(image_path)

    # Преобразуем 1-битное изображение в 8-битное
    # Где 1 -> 255, а 0 -> 0
    image_8bit = image.point(lambda p: p * 255)

    # Явно преобразуем изображение в 8-битный режим
    image_8bit = image_8bit.convert('L')  # 'L' — 8-битный grayscale

    # Изменяем размер до 640x640
    resized_image = image_8bit.resize((640, 640), Image.Resampling.LANCZOS)

    # Создаём новое изображение в режиме 'L' (8-битное grayscale)
    new_image = Image.new('L', (640, 640))

    # Вставляем обработанное изображение в новое
    new_image.paste(resized_image, (0, 0))

    # Сохраняем результат
    new_image.save(output_path)

# Обработка всех PNG-файлов в папке
for filename in os.listdir(input_folder):
    if filename.endswith(".png"):  # Проверка, что файл имеет расширение .png
        image_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)

        # Обработка и сохранение
        process_image(image_path, output_path)
        print(f"Обработан файл: {filename}")

print("Все файлы успешно обработаны!")