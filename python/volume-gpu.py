import sys
import glfw
import numpy as np
import OpenGL.GL as gl
from OpenGL.GL.shaders import compileShader, compileProgram
import ctypes
import time

# Размер поля (будем использовать куб 32x32x32)
GRID_SIZE = 32
MAX_VERTICES = GRID_SIZE ** 3

# -------------------------- Генерация 3D скалярного поля --------------------------
def generate_scalar_field(size=32):
    """Генерирует 3D массив, где значение зависит от расстояния от центра:
       от 1 (в центре) до 0 (на границе)"""
    x = np.linspace(-1, 1, size)
    y = np.linspace(-1, 1, size)
    z = np.linspace(-1, 1, size)
    X, Y, Z = np.meshgrid(x, y, z, indexing='ij')
    # Расстояние от центра, инвертированное, чтобы центр имел значение ~1
    field = 1.0 - np.sqrt(X ** 2 + Y ** 2 + Z ** 2)
    field = np.clip(field, 0, 1)
    return field.astype(np.float32)

# -------------------------- Создание 3D текстуры --------------------------
def create_3d_texture(data):
    texture_id = gl.glGenTextures(1)
    gl.glBindTexture(gl.GL_TEXTURE_3D, texture_id)
    gl.glTexParameteri(gl.GL_TEXTURE_3D, gl.GL_TEXTURE_WRAP_S, gl.GL_CLAMP_TO_EDGE)
    gl.glTexParameteri(gl.GL_TEXTURE_3D, gl.GL_TEXTURE_WRAP_T, gl.GL_CLAMP_TO_EDGE)
    gl.glTexParameteri(gl.GL_TEXTURE_3D, gl.GL_TEXTURE_WRAP_R, gl.GL_CLAMP_TO_EDGE)
    gl.glTexParameteri(gl.GL_TEXTURE_3D, gl.GL_TEXTURE_MIN_FILTER, gl.GL_LINEAR)
    gl.glTexParameteri(gl.GL_TEXTURE_3D, gl.GL_TEXTURE_MAG_FILTER, gl.GL_LINEAR)
    gl.glTexImage3D(gl.GL_TEXTURE_3D, 0, gl.GL_R32F,
                    data.shape[0], data.shape[1], data.shape[2],
                    0, gl.GL_RED, gl.GL_FLOAT, data)
    gl.glBindTexture(gl.GL_TEXTURE_3D, 0)
    return texture_id

# -------------------------- Шейдеры --------------------------
# Compute Shader: перебирает 3D поле, если значение ≥ threshold, записывает позицию в массив.
compute_shader_src = """
#version 430
layout(local_size_x = 8, local_size_y = 8, local_size_z = 8) in;

layout(binding = 0) uniform sampler3D scalarField;
uniform float threshold;

layout(std430, binding = 1) buffer VertexBuffer {
    vec4 vertices[];
};

layout(binding = 2, offset = 0) uniform atomic_uint vertexCount;

void main() {
    ivec3 gid = ivec3(gl_GlobalInvocationID);
    ivec3 texSize = textureSize(scalarField, 0);
    // Если вышли за границу, выходим
    if(gid.x >= texSize.x || gid.y >= texSize.y || gid.z >= texSize.z)
        return;

    // Нормализуем координаты в диапазон [0,1]
    vec3 pos = vec3(gid) / vec3(texSize - ivec3(1));

    float value = texture(scalarField, pos).r;
    if (value >= threshold) {
        uint index = atomicCounterIncrement(vertexCount);
        // Переводим pos из [0,1] в диапазон [-1,1] для визуализации
        vertices[index] = vec4(pos * 2.0 - 1.0, 1.0);
    }
}
"""

# Вершинный шейдер для отрисовки точек
vertex_shader_src = """
#version 330 core
layout(location = 0) in vec4 inPos;
void main(){
    gl_Position = inPos;
    gl_PointSize = 4.0;
}
"""

# Фрагментный шейдер (рисуем жёлтые точки)
fragment_shader_src = """
#version 330 core
out vec4 FragColor;
void main(){
    FragColor = vec4(1.0, 1.0, 0.0, 1.0);
}
"""

def main():
    # Инициализация GLFW
    if not glfw.init():
        sys.exit("Не удалось инициализировать GLFW")

    # Запрашиваем контекст OpenGL 4.3 для Compute Shader
    glfw.window_hint(glfw.CONTEXT_VERSION_MAJOR, 4)
    glfw.window_hint(glfw.CONTEXT_VERSION_MINOR, 3)
    glfw.window_hint(glfw.OPENGL_PROFILE, glfw.OPENGL_CORE_PROFILE)

    window = glfw.create_window(800, 600, "Marching Cubes на GPU (Compute Shader)", None, None)
    if not window:
        glfw.terminate()
        sys.exit("Не удалось создать окно GLFW")

    glfw.make_context_current(window)
    gl.glEnable(gl.GL_DEPTH_TEST)

    # Генерация скалярного поля и создание 3D текстуры
    scalar_field = generate_scalar_field(GRID_SIZE)
    texture_id = create_3d_texture(scalar_field)

    # Компилируем шейдеры
    compute_shader = compileProgram(compileShader(compute_shader_src, gl.GL_COMPUTE_SHADER))
    render_shader = compileProgram(
        compileShader(vertex_shader_src, gl.GL_VERTEX_SHADER),
        compileShader(fragment_shader_src, gl.GL_FRAGMENT_SHADER)
    )

    # -------------------------- Создание буфера для вершин (SSBO) --------------------------
    vertex_buffer = gl.glGenBuffers(1)
    gl.glBindBuffer(gl.GL_SHADER_STORAGE_BUFFER, vertex_buffer)
    gl.glBufferData(gl.GL_SHADER_STORAGE_BUFFER, MAX_VERTICES * 4 * 4, None, gl.GL_DYNAMIC_DRAW)
    gl.glBindBufferBase(gl.GL_SHADER_STORAGE_BUFFER, 1, vertex_buffer)
    gl.glBindBuffer(gl.GL_SHADER_STORAGE_BUFFER, 0)

    # -------------------------- Создание атомарного счётчика --------------------------
    atomic_buffer = gl.glGenBuffers(1)
    gl.glBindBuffer(gl.GL_ATOMIC_COUNTER_BUFFER, atomic_buffer)
    zero = np.array([0], dtype=np.uint32)
    gl.glBufferData(gl.GL_ATOMIC_COUNTER_BUFFER, zero.nbytes, zero, gl.GL_DYNAMIC_DRAW)
    gl.glBindBufferBase(gl.GL_ATOMIC_COUNTER_BUFFER, 2, atomic_buffer)
    gl.glBindBuffer(gl.GL_ATOMIC_COUNTER_BUFFER, 0)

    # -------------------------- Создание VAO для рендеринга --------------------------
    VAO = gl.glGenVertexArrays(1)
    gl.glBindVertexArray(VAO)
    gl.glBindBuffer(gl.GL_ARRAY_BUFFER, vertex_buffer)
    gl.glEnableVertexAttribArray(0)
    gl.glVertexAttribPointer(0, 4, gl.GL_FLOAT, gl.GL_FALSE, 4 * 4, ctypes.c_void_p(0))
    gl.glBindBuffer(gl.GL_ARRAY_BUFFER, 0)
    gl.glBindVertexArray(0)

    # Функция для сброса атомарного счётчика
    def reset_atomic_counter():
        zero = np.array([0], dtype=np.uint32)
        gl.glBindBuffer(gl.GL_ATOMIC_COUNTER_BUFFER, atomic_buffer)
        gl.glBufferSubData(gl.GL_ATOMIC_COUNTER_BUFFER, 0, zero.nbytes, zero)
        gl.glBindBuffer(gl.GL_ATOMIC_COUNTER_BUFFER, 0)

    start_time = time.time()
    while not glfw.window_should_close(window):
        glfw.poll_events()

        current_time = time.time() - start_time
        # Порог колеблется от 0.3 до 0.7
        threshold_value = 0.5 + 0.2 * np.sin(current_time)

        # Сброс атомарного счётчика
        reset_atomic_counter()

        # Запуск Compute Shader
        gl.glUseProgram(compute_shader)
        threshold_loc = gl.glGetUniformLocation(compute_shader, "threshold")
        gl.glUniform1f(threshold_loc, threshold_value)

        gl.glActiveTexture(gl.GL_TEXTURE0)
        gl.glBindTexture(gl.GL_TEXTURE_3D, texture_id)

        groups = (GRID_SIZE // 8, GRID_SIZE // 8, GRID_SIZE // 8)
        gl.glDispatchCompute(*groups)
        gl.glMemoryBarrier(gl.GL_SHADER_STORAGE_BARRIER_BIT | gl.GL_ATOMIC_COUNTER_BARRIER_BIT)

        # Чтение количества вершин из атомарного буфера
        count_buffer = np.zeros(1, dtype=np.uint32)
        gl.glBindBuffer(gl.GL_ATOMIC_COUNTER_BUFFER, atomic_buffer)
        gl.glGetBufferSubData(gl.GL_ATOMIC_COUNTER_BUFFER, 0, count_buffer.nbytes, count_buffer)
        gl.glBindBuffer(gl.GL_ATOMIC_COUNTER_BUFFER, 0)
        vertex_count = count_buffer[0]

        gl.glClearColor(0.1, 0.1, 0.1, 1.0)
        gl.glClear(gl.GL_COLOR_BUFFER_BIT | gl.GL_DEPTH_BUFFER_BIT)

        # Отрисовка точек
        gl.glUseProgram(render_shader)
        gl.glBindVertexArray(VAO)
        gl.glDrawArrays(gl.GL_POINTS, 0, vertex_count)
        gl.glBindVertexArray(0)

        glfw.swap_buffers(window)

    # Очистка ресурсов
    gl.glDeleteProgram(compute_shader)
    gl.glDeleteProgram(render_shader)
    gl.glDeleteBuffers(1, [vertex_buffer])
    gl.glDeleteBuffers(1, [atomic_buffer])
    glfw.terminate()

if __name__ == "__main__":
    main()
