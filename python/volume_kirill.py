import os
import numpy as np
import imageio.v2 as imageio
import vtk
import SimpleITK as sitk
from scipy.ndimage import gaussian_filter, binary_closing
from skimage.transform import resize
from skimage.measure import label, regionprops


def load_dicom_metadata(dicom_file):
    """
    Загружает метаданные DICOM и возвращает spacing (spacing_x, spacing_y, spacing_z) в мм.
    """
    image = sitk.ReadImage(dicom_file)
    spacing = image.GetSpacing()  # (spacing_x, spacing_y, spacing_z) в мм
    return spacing


def load_masks(mask_folder, target_size=(512, 512), area_threshold_ratio=0.1):
    """
    Загружает маски из папки, масштабирует каждую до target_size, бинаризует,
    сглаживает и выполняет морфологическое закрытие.

    Затем для каждого среза (или для всего 3D-объёма) объединяет связанные компоненты,
    площадь которых не менее area_threshold_ratio от площади самой крупной компоненты.

    Возвращает 3D-массив volume (shape: [depth, target_size[0], target_size[1]]).
    """
    files = sorted(os.listdir(mask_folder))
    slices = []
    for filename in files:
        file_path = os.path.join(mask_folder, filename)
        # Считываем изображение маски
        img = imageio.imread(file_path)

        # Масштабируем до target_size (например, 512x512)
        img_resized = resize(img, target_size, anti_aliasing=True, preserve_range=True).astype(np.uint8)

        # Бинаризация: пиксели 255 → 1, остальные → 0
        binary_mask = np.where(img_resized == 255, 1, 0).astype(np.uint8)
        slices.append(binary_mask)

    # Собираем 3D-массив: (кол-во срезов, height, width)
    volume = np.array(slices, dtype=np.uint8)

    # Гауссовое сглаживание для уменьшения шума
    volume = gaussian_filter(volume.astype(float), sigma=3)

    # Морфологическое закрытие для устранения дыр
    volume = binary_closing(volume > 0, structure=np.ones((7, 7, 7))).astype(np.uint8)

    # Выделяем связные компоненты по всему 3D-объёму
    labeled_volume = label(volume)
    regions = regionprops(labeled_volume)

    if regions:
        # Находим максимальную площадь среди компонентов
        max_area = max(region.area for region in regions)
        # Объединяем все компоненты, площадь которых >= area_threshold_ratio * max_area
        merged = np.zeros_like(volume, dtype=np.uint8)
        for region in regions:
            if region.area >= area_threshold_ratio * max_area:
                merged[labeled_volume == region.label] = 1
        volume = merged

    return volume


def compute_3d_model(image_volume, dicom_spacing):
    """
    Создаёт 3D-модель печени из 3D-маски и вычисляет:
      - Линейные размеры (через bounding box по вокселям, где маска > 0)
      - Площадь поверхности (см²)
      - Объём (см³)

    Порядок осей в image_volume: (depth, height, width) → (Z, Y, X).
    Spacing передаётся как (spacing_x, spacing_y, spacing_z) в мм.
    """
    # Преобразуем spacing из мм в см
    spacing_x_mm, spacing_y_mm, spacing_z_mm = dicom_spacing
    px_x_cm = spacing_x_mm / 10.0
    px_y_cm = spacing_y_mm / 10.0
    px_z_cm = spacing_z_mm / 10.0

    depth, height, width = image_volume.shape
    print(f"Размер пикселя (X×Y): {px_x_cm:.3f} × {px_y_cm:.3f} см")
    print(f"Толщина слоя (Z): {px_z_cm:.3f} см")

    # Вычисляем bounding box по всем вокселям, где маска > 0
    indices = np.argwhere(image_volume > 0)
    if len(indices) == 0:
        print("Маска пуста! Не удалось найти печень.")
        return None, 0, 0
    zmin, ymin, xmin = indices.min(axis=0)
    zmax, ymax, xmax = indices.max(axis=0)

    bb_depth = (zmax - zmin + 1)  # количество срезов (ось Z)
    bb_height = (ymax - ymin + 1)  # число вокселей по оси Y
    bb_width = (xmax - xmin + 1)  # число вокселей по оси X

    # Вычисляем линейные размеры печени (в см) по каждой оси
    size_z_cm = bb_depth * px_z_cm  # по оси Z
    size_y_cm = bb_height * px_y_cm  # по оси Y
    size_x_cm = bb_width * px_x_cm  # по оси X

    # Выводим отсортированные размеры по убыванию, чтобы понять, какая ось самая длинная
    dims = [
        ('Ось Z (кол-во срезов)', size_z_cm),
        ('Ось Y', size_y_cm),
        ('Ось X', size_x_cm)
    ]
    dims_sorted = sorted(dims, key=lambda x: x[1], reverse=True)
    print("Размеры по осям (от максимального к минимальному):")
    for name, val in dims_sorted:
        print(f" - {name}: {val:.2f} см")

    # Здесь нужно сопоставить оси с анатомическими направлениями.
    # По умолчанию предполагаем, что:
    #   ось Z (depth) должна быть кранио-каудальной (сверху вниз),
    #   ось X – левая-правая,
    #   ось Y – передне-задняя (толщина).
    #
    # Если печень присутствует не на всех срезах, то bounding box по оси Z
    # отражает именно те срезы, где есть печень.

    # Например, если ожидалось, что кранио-каудальный размер ~12-14 см,
    # а size_z_cm оказывается 8.20 см, значит печень видна лишь на части срезов.
    # Вы можете оставить расчёт так, а потом интерпретировать:
    liver_craniocaudal_cm = size_z_cm  # от zmin до zmax (кранио-каудальный)
    liver_lr_cm = size_x_cm  # левая–правая
    liver_ap_cm = size_y_cm  # передне–задний (толщина)

    print(
        f"\nКранио-каудальный размер (Z): {liver_craniocaudal_cm:.2f} см (ожидается ~12–14 см, если печень полностью охвачена)")
    print(f"Лево–правая ось (X):         {liver_lr_cm:.2f} см (норма ~до 5 см)")
    print(f"Перед–задняя ось (Y):         {liver_ap_cm:.2f} см (норма ~8–10 см)")
    # Создаём VTK-объект для 3D-реконструкции. Используем исходный объем (512x512xdepth).
    vtk_data = vtk.vtkImageData()
    vtk_data.SetDimensions(width, height, depth)
    vtk_data.SetSpacing(px_x_cm, px_y_cm, px_z_cm)
    vtk_data.AllocateScalars(vtk.VTK_FLOAT, 1)

    # Заполняем VTK-объём значениями из image_volume
    for z in range(depth):
        for y in range(height):
            for x in range(width):
                val = float(image_volume[z, y, x])
                vtk_data.SetScalarComponentFromFloat(x, y, z, 0, val)

    # Извлекаем изоверхность с помощью FlyingEdges3D
    flying_edges = vtk.vtkFlyingEdges3D()
    flying_edges.SetInputData(vtk_data)
    flying_edges.SetValue(0, 0.5)
    flying_edges.Update()

    # Сглаживание полученной поверхности
    smoother = vtk.vtkSmoothPolyDataFilter()
    smoother.SetInputData(flying_edges.GetOutput())
    smoother.SetNumberOfIterations(200)
    smoother.SetRelaxationFactor(0.2)
    smoother.FeatureEdgeSmoothingOff()
    smoother.BoundarySmoothingOn()
    smoother.Update()

    poly_data = smoother.GetOutput()

    # Вычисляем площадь поверхности и объём модели
    mass_properties = vtk.vtkMassProperties()
    mass_properties.SetInputData(poly_data)
    mass_properties.Update()

    surface_area = mass_properties.GetSurfaceArea()  # см²
    volume_cc = mass_properties.GetVolume()  # см³

    print(f"\nПлощадь поверхности печени: {surface_area:.2f} см²")
    print(f"Объём печени: {volume_cc:.2f} см³")

    return poly_data, surface_area, volume_cc


def render_3d_model(poly_data):
    """
    Рендерит 3D-модель печени с помощью VTK.
    """
    if poly_data is None or poly_data.GetNumberOfPoints() == 0:
        print("Ошибка: модель не содержит точек!")
        return

    mapper = vtk.vtkPolyDataMapper()
    mapper.SetInputData(poly_data)

    actor = vtk.vtkActor()
    actor.SetMapper(mapper)
    actor.GetProperty().SetColor(0.0, 1.0, 0.0)
    actor.GetProperty().SetSpecular(0.7)
    actor.GetProperty().SetOpacity(1.0)

    renderer = vtk.vtkRenderer()
    renderer.AddActor(actor)
    renderer.SetBackground(0.1, 0.1, 0.1)

    # Освещение
    light1 = vtk.vtkLight()
    light1.SetPosition(1, 1, 1)
    light1.SetIntensity(1.2)
    renderer.AddLight(light1)

    light2 = vtk.vtkLight()
    light2.SetPosition(-1, -1, -1)
    light2.SetIntensity(0.8)
    renderer.AddLight(light2)

    render_window = vtk.vtkRenderWindow()
    render_window.AddRenderer(renderer)

    render_window_interactor = vtk.vtkRenderWindowInteractor()
    render_window_interactor.SetRenderWindow(render_window)

    render_window.Render()
    render_window_interactor.Start()


def main(dicom_file, mask_folder):
    """
    Основная функция:
      1. Загружает DICOM-метаданные (spacing).
      2. Загружает маски из mask_folder (учитывая, что печень не на всех срезах).
      3. Строит 3D-модель печени, вычисляет линейные размеры, площадь и объём.
      4. Рендерит модель.
    """
    # 1. Получаем spacing из DICOM
    dicom_spacing = load_dicom_metadata(dicom_file)

    # 2. Загружаем маски и объединяем компоненты (с учетом area_threshold_ratio)
    image_volume = load_masks(mask_folder, target_size=(512, 512), area_threshold_ratio=0.1)

    # 3. Строим 3D-модель и вычисляем параметры
    poly_data, surface_area, volume_cc = compute_3d_model(image_volume, dicom_spacing)

    if poly_data is not None:
        print("\nИтоговые данные:")
        print(f"Площадь печени: {surface_area:.2f} см²")
        print(f"Объём печени: {volume_cc:.2f} см³")
        # 4. Рендерим модель
        render_3d_model(poly_data)


main('e.dcm', '../DICOM_anon_result')
