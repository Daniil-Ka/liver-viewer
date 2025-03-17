import pyvista as pv
import numpy as np

# Допустим, массив имеет форму (nx, ny, nz).
nx, ny, nz = 64, 64, 64
data = np.random.rand(nx, ny, nz)

# Определим границу посередине вдоль оси X:
mid_x = nx // 2

# "Левая" часть: x от 0 до mid_x (исключительно)
data_left = data[:mid_x, :, :]
# "Правая" часть: x от mid_x до nx
data_right = data[mid_x:, :, :]

# --- Создаём PyVista-объект для левой части ---
grid_left = pv.ImageData()
# dimensions = shape + 1
grid_left.dimensions = np.array(data_left.shape) + 1
grid_left.spacing = (1, 1, 1)
grid_left.origin = (0, 0, 0)  # пусть левая часть начинается в x=0

# Записываем данные как cell_data (важно ravel(..., order='F'))
grid_left.cell_data["values"] = data_left.ravel(order='F')

# --- Создаём PyVista-объект для правой части ---
grid_right = pv.ImageData()
grid_right.dimensions = np.array(data_right.shape) + 1
grid_right.spacing = (1, 1, 1)
# Смещаем origin, чтобы правая часть "встала" рядом (слева x=mid_x)
grid_right.origin = (mid_x, 0, 0)

grid_right.cell_data["values"] = data_right.ravel(order='F')

# --- Визуализируем ---
plotter = pv.Plotter()

# Левая часть: непрозрачная (opacity=1.0)
plotter.add_volume(grid_left, cmap="viridis", opacity=1.0)

# Правая часть: делаем 50% прозрачности
plotter.add_volume(grid_right, cmap="viridis", opacity=0.2)

plotter.show()
