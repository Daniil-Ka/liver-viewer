import os
import numpy as np
import imageio.v2 as imageio
import matplotlib.pyplot as plt
import vtk
import plotly.graph_objects as go
from trimesh import Trimesh


def load_masks(mask_folder):
    """Загружает маски из указанной папки и формирует 3D-массив."""
    files = sorted(os.listdir(mask_folder))
    slices = []
    for filename in files:
        file_path = os.path.join(mask_folder, filename)
        img = imageio.imread(file_path)
        binary_mask = img > 0  # Преобразуем в бинарную маску
        slices.append(binary_mask)
    return np.array(slices, dtype=np.uint8)


def compute_3d_model(image_volume, voxel_size=3, physical_size=332.569088):
    """Создает 3D-модель, вычисляет площадь и объем с использованием VTK FlyingEdges3D."""
    pixel_spacing = physical_size / image_volume.shape[1]  # Размер пикселя в мм

    # Преобразуем numpy-массив в vtkImageData
    depth, height, width = image_volume.shape
    vtk_data = vtk.vtkImageData()
    vtk_data.SetDimensions(width, height, depth)
    vtk_data.SetSpacing(pixel_spacing, pixel_spacing, voxel_size)

    flat_data = image_volume.ravel(order='F')
    vtk_array = vtk.vtkUnsignedCharArray()
    vtk_array.SetNumberOfValues(flat_data.size)
    for i, val in enumerate(flat_data):
        vtk_array.SetValue(i, val)
    vtk_data.GetPointData().SetScalars(vtk_array)

    # Используем VTK FlyingEdges3D для извлечения поверхности
    flying_edges = vtk.vtkFlyingEdges3D()
    flying_edges.SetInputData(vtk_data)
    flying_edges.SetValue(0, 0.5)
    flying_edges.Update()

    poly_data = flying_edges.GetOutput()
    verts_vtk = poly_data.GetPoints()
    verts = np.array([verts_vtk.GetPoint(i) for i in range(verts_vtk.GetNumberOfPoints())])

    faces_vtk = poly_data.GetPolys()
    faces = []
    id_list = vtk.vtkIdList()
    faces_vtk.InitTraversal()
    while faces_vtk.GetNextCell(id_list):
        faces.append([id_list.GetId(j) for j in range(id_list.GetNumberOfIds())])
    faces = np.array(faces)

    # Создаем mesh и вычисляем параметры
    mesh = Trimesh(vertices=verts, faces=faces)
    surface_area_cm2 = mesh.area / 100  # мм² -> см²
    volume_cm3 = mesh.volume / 1000  # мм³ -> см³

    return verts, faces, surface_area_cm2, volume_cm3


def plot_3d_model(verts, faces):
    """Отображает 3D-модель с возможностью вращения и улучшенной визуализацией."""
    x, y, z = verts.T
    i, j, k = faces.T
    fig = go.Figure(
        data=[go.Mesh3d(
            x=x, y=y, z=z,
            i=i, j=j, k=k,
            color='lightblue',
            opacity=0.8,
            lighting=dict(ambient=0.4, diffuse=1, specular=0.8, roughness=0.5, fresnel=0.2),
            flatshading=False
        )]
    )
    fig.update_layout(
        scene=dict(
            xaxis_title='X (mm)',
            yaxis_title='Y (mm)',
            zaxis_title='Z (mm)',
            aspectmode='data',
            camera=dict(eye=dict(x=1.2, y=1.2, z=1.2))
        ),
        margin=dict(l=0, r=0, b=0, t=40),
        title="3D Модель"
    )
    fig.show()


def main(mask_folder):
    """Основная функция для загрузки масок, построения 3D-модели и вывода результатов."""
    image_volume = load_masks(mask_folder)
    verts, faces, surface_area_cm2, volume_cm3 = compute_3d_model(image_volume)

    print(f"Площадь поверхности: {surface_area_cm2:.2f} см²")
    print(f"Объем: {volume_cm3:.2f} см³")

    plot_3d_model(verts, faces)

# Пример использования
# main('/путь/к/папке/с/масками')
main(r"C:\Users\dkrap\Desktop\liver\DICOM_anon_result")
