import numpy as np
import glfw
from OpenGL.GL import *
from OpenGL.GL.shaders import compileProgram, compileShader
import math

# Переменные камеры
angle_x, angle_y = 0, 0  # Угол вращения камеры
slice_index = 256  # Начальный срез (из 512)


# Генерация 3D массива с прозрачностью, зависящей от интенсивности цвета
def generate_3d_texture(size=512):
    """
    Создаёт 3D-массив RGBA (size x size x size),
    где прозрачность (альфа) зависит от интенсивности (R+G+B).
    """
    texture_data = np.random.randint(0, 255, (size, size, size, 3), dtype=np.uint8)

    # Вычисляем интенсивность (яркость) пикселя
    intensity = np.mean(texture_data, axis=3).astype(np.uint8)

    # Инвертируем альфа-канал (тёмные → прозрачные)
    alpha = 255 - intensity

    # Создаём RGBA массив
    rgba_texture = np.concatenate((texture_data, alpha[..., None]), axis=3)

    return rgba_texture


# Функция загрузки 3D-текстуры в OpenGL
def load_3d_texture(texture_data):
    size = texture_data.shape[0]  # Размер кубической текстуры (512)

    texture_id = glGenTextures(1)
    glBindTexture(GL_TEXTURE_3D, texture_id)

    # Загружаем текстуру в OpenGL
    glTexImage3D(GL_TEXTURE_3D, 0, GL_RGBA, size, size, size, 0,
                 GL_RGBA, GL_UNSIGNED_BYTE, texture_data)

    # Настройки текстуры
    glTexParameteri(GL_TEXTURE_3D, GL_TEXTURE_MIN_FILTER, GL_LINEAR)
    glTexParameteri(GL_TEXTURE_3D, GL_TEXTURE_MAG_FILTER, GL_LINEAR)
    glTexParameteri(GL_TEXTURE_3D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE)
    glTexParameteri(GL_TEXTURE_3D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE)
    glTexParameteri(GL_TEXTURE_3D, GL_TEXTURE_WRAP_R, GL_CLAMP_TO_EDGE)

    return texture_id


# Функция инициализации окна GLFW
def init_glfw_window(width=800, height=600):
    if not glfw.init():
        raise Exception("Не удалось инициализировать GLFW")

    window = glfw.create_window(width, height, "3D Texture Rendering", None, None)
    if not window:
        glfw.terminate()
        raise Exception("Не удалось создать окно GLFW")

    glfw.make_context_current(window)
    return window


# Обработчик клавиатуры
def key_callback(window, key, scancode, action, mods):
    global angle_x, angle_y, slice_index

    if action == glfw.PRESS or action == glfw.REPEAT:
        if key == glfw.KEY_LEFT:
            angle_y -= 5
        elif key == glfw.KEY_RIGHT:
            angle_y += 5
        elif key == glfw.KEY_UP:
            slice_index = min(slice_index + 10, 511)  # Листаем срез вверх
        elif key == glfw.KEY_DOWN:
            slice_index = max(slice_index - 10, 0)  # Листаем срез вниз
        elif key == glfw.KEY_W:
            angle_x -= 5
        elif key == glfw.KEY_S:
            angle_x += 5


# Отрисовка срезов 3D-текстуры
def render_3d_texture(texture_id):
    global slice_index

    glEnable(GL_BLEND)
    glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA)  # Прозрачность

    glEnable(GL_TEXTURE_3D)
    glBindTexture(GL_TEXTURE_3D, texture_id)

    glPushMatrix()
    glRotatef(angle_x, 1, 0, 0)
    glRotatef(angle_y, 0, 1, 0)

    glBegin(GL_QUADS)

    # Отображаем только один срез из 3D текстуры (slice_index)
    z = slice_index / 512.0
    z_pos = (slice_index - 256) / 256.0

    glTexCoord3f(0, 0, z);
    glVertex3f(-1, -1, z_pos)
    glTexCoord3f(1, 0, z);
    glVertex3f(1, -1, z_pos)
    glTexCoord3f(1, 1, z);
    glVertex3f(1, 1, z_pos)
    glTexCoord3f(0, 1, z);
    glVertex3f(-1, 1, z_pos)

    glEnd()
    glPopMatrix()


# Основная функция рендеринга
def main():
    window = init_glfw_window()

    glEnable(GL_DEPTH_TEST)
    glEnable(GL_TEXTURE_3D)

    glfw.set_key_callback(window, key_callback)

    # Генерируем и загружаем 3D-текстуру
    texture_data = generate_3d_texture()
    texture_id = load_3d_texture(texture_data)

    while not glfw.window_should_close(window):
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
        glLoadIdentity()

        render_3d_texture(texture_id)  # Отрисовываем 3D-текстуру

        glfw.swap_buffers(window)
        glfw.poll_events()

    glfw.terminate()


if __name__ == "__main__":
    main()
