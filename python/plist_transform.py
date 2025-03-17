# p1 = curve[0]
# p2 = curve[-1]
# half = (p2["x"] - p1["x"]) / 2.0
# middle = p1["x"] + half
#
# shiftWL = wl - middle
# shiftWW = p1["x"] + shiftWL - (wl - 0.5 * ww)

#!/usr/bin/env python3

#!/usr/bin/env python3

#!/usr/bin/env python3

import plistlib
import json

def plist_to_json(plist_path, json_path):
    # 1. Считываем plist-файл
    with open(plist_path, "rb") as f:
        plist_data = plistlib.load(f)

    # Извлекаем исходные массивы (если в plist их нет - подставим пустые)
    clut_colors = plist_data.get("16bitClutColors", [])
    clut_curves = plist_data.get("16bitClutCurves", [])

    # 2. Сбор всех x-координат для нормализации
    all_x_values = []
    for curve_array in clut_curves:
        for point in curve_array:
            x_val = point.get("x", 0.0)
            all_x_values.append(x_val)

    if not all_x_values:
        # Если по какой-то причине у нас нет точек вообще, зададим дефолт
        x_min, x_max = 0.0, 1.0
    else:
        x_min = min(all_x_values)
        x_max = max(all_x_values)

    # Функция для нормализации x
    def normalize_x(x):
        if x_max != x_min:
            return (x - x_min) / (x_max - x_min)
        else:
            return 0.0

    # 2. Формируем Colors в плоском виде: [x1, r1, g1, b1, x2, r2, g2, b2, ...]
    colors_result = []
    for color_array, curve_array in zip(clut_colors, clut_curves):
        for color_dict, curve_dict in zip(color_array, curve_array):
            x_val = curve_dict.get("x", 0.0)
            x_norm = normalize_x(x_val)
            r_val = color_dict.get("red", 0.0)
            g_val = color_dict.get("green", 0.0)
            b_val = color_dict.get("blue", 0.0)
            colors_result.extend([x_norm, r_val, g_val, b_val])

    # 3. Формируем Curves: [[{ x, y, midpoint, sharpness }, ...], [...], ...]
    curves_result = []
    for curve_array in clut_curves:
        one_curve_list = []
        for point in curve_array:
            x_val = point.get("x", 0.0)
            y_val = point.get("y", 0.0)
            one_curve_list.append({
                "x": x_val,
                "y": y_val,
                "midpoint": 0.5,
                "sharpness": 0
            })
        curves_result.append(one_curve_list)

    curves_positions = []
    for curve_array in clut_curves:
        one_curve_list = []
        for point in curve_array:
            x_val = point.get("x", 0.0)
            x_norm = normalize_x(x_val)
            y_val = point.get("y", 0.0)
            one_curve_list.append([
                x_norm,
                y_val,
            ])
        curves_positions.append(one_curve_list)


    # 4. Собираем итоговый словарь, «подмешивая» все остальные поля
    json_data = dict(plist_data)
    # Удаляем исходные ключи, чтобы не дублировать
    json_data.pop("16bitClutColors", None)
    json_data.pop("16bitClutCurves", None)

    # Добавляем новые ключи
    json_data["Colors"] = colors_result
    json_data["Curves"] = curves_result
    json_data["curves_positions"] = curves_positions

    # 5. Записываем всё в JSON
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(json_data, f, ensure_ascii=False, indent=4)


if __name__ == "__main__":
    # Пример использования
    plist_file = "Bone + Skin II.plist"
    json_file = "Bone + Skin II.json"
    plist_to_json(plist_file, json_file)
    print(f"Сконвертировано: {plist_file} -> {json_file}")
