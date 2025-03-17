import io
import os

import numpy as np
from PIL import Image, ImageOps, ImageChops
import pydicom
from dicom2jpg import io2img

from model.model import model  # Подключаем YOLO

# 📂 Указываем папки
input_folder = r"C:\Users\dkrap\Desktop\liver\DICOM_anon"
output_folder = r"C:\Users\dkrap\Desktop\liver\DICOM_anon_result"

# Создаем папку для результата, если она не существует
os.makedirs(output_folder, exist_ok=True)

# 🔍 Перебираем файлы в папке
for file_name in os.listdir(input_folder):
    file_path = os.path.join(input_folder, file_name)

    # Пропускаем не DICOM-файлы
    if not file_name.lower().endswith(".dcm"):
        continue

    print(f"🔹 Обрабатываем файл: {file_name}")

    try:
        # Открываем DICOM-файл и читаем его в переменную file_content
        with open(file_path, "rb") as f:
            file_content = f.read()

        dicom_io = io.BytesIO(file_content)
        img_data = io2img(dicom_io)

        # 📌 Извлекаем первый слой, если DICOM многослойный
        if len(img_data.shape) == 3:
            img_data = img_data[:, :, 0]

        # ⚙️ Нормализуем изображение в диапазон [0, 255]
        img_data = (img_data - np.min(img_data)) / (np.max(img_data) - np.min(img_data)) * 255
        img_data = img_data.astype(np.uint8)

        # 🎨 Преобразуем в изображение PIL (градации серого)
        base_image = Image.fromarray(img_data).convert("L")

        # 🔍 Масштабируем изображение до 640x640
        base_image = ImageOps.fit(base_image, (640, 640), Image.Resampling.LANCZOS)

        # 🔍 Прогоняем изображение через YOLO
        img_data_rgb = np.array(base_image.convert("RGB"))  # Преобразуем в RGB для YOLO
        results = model.predict(img_data_rgb)

        # 🟡 Создаем пустую черную маску
        mask_layer = Image.new("L", base_image.size, 0)

        # 🎭 Если YOLO нашла маску – заполняем ее белым (255)
        if results[0].masks is not None:
            masks = results[0].masks.data.cpu().numpy()  # Преобразуем в numpy

            for mask in masks:
                mask_image = Image.fromarray((mask * 255).astype(np.uint8))  # Маска в градациях серого
                mask_layer = ImageChops.lighter(mask_layer, mask_image)

        # 💾 Сохраняем обработанную маску в `DICOM_anon_result`
        mask_output_path = os.path.join(output_folder, file_name.replace(".dcm", "_mask.png"))
        mask_layer.save(mask_output_path, format="PNG")
        print(f"✅ Маска сохранена: {mask_output_path}")

    except Exception as e:
        print(f"❌ Ошибка обработки {file_name}: {e}")

print("🎉 Обработка завершена!")
