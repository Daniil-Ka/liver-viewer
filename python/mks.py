import xml.etree.ElementTree as ET


def parse_plist(xml_data):
  # Парсим XML данные
  tree = ET.ElementTree(ET.fromstring(xml_data))
  root = tree.getroot()

  # Ищем <dict> элемент в корневом элементе
  plist_dict = root.find('dict')

  clut_colors = []
  for key, array in zip(plist_dict.findall('key'), plist_dict.findall('array')):
    # Ищем ключи и соответствующие им массивы
    if key.text == '16bitClutColors':
      for color_array in array:
        for color_dict in color_array:
          red = float(color_dict.find('real[../key="red"]').text)
          green = float(color_dict.find('real[../key="green"]').text)
          blue = float(color_dict.find('real[../key="blue"]').text)
          clut_colors.append((red, green, blue))

  return clut_colors

# Пример XML plist
xml_data = '''<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>16bitClutColors</key>
	<array>
		<array>
			<dict>
				<key>blue</key>
				<real>0.0</real>
				<key>green</key>
				<real>0.0</real>
				<key>red</key>
				<real>0.0</real>
			</dict>
			<dict>
				<key>blue</key>
				<real>0.0</real>
				<key>green</key>
				<real>0.0</real>
				<key>red</key>
				<real>1</real>
			</dict>
			<dict>
				<key>blue</key>
				<real>0.0</real>
				<key>green</key>
				<real>0.99920654296875</real>
				<key>red</key>
				<real>1</real>
			</dict>
			<dict>
				<key>blue</key>
				<real>1</real>
				<key>green</key>
				<real>1</real>
				<key>red</key>
				<real>1</real>
			</dict>
		</array>
		<array>
			<dict>
				<key>blue</key>
				<real>0.0</real>
				<key>green</key>
				<real>0.0</real>
				<key>red</key>
				<real>0.0</real>
			</dict>
			<dict>
				<key>blue</key>
				<real>0.0</real>
				<key>green</key>
				<real>0.0</real>
				<key>red</key>
				<real>1</real>
			</dict>
			<dict>
				<key>blue</key>
				<real>0.0</real>
				<key>green</key>
				<real>0.99920654296875</real>
				<key>red</key>
				<real>1</real>
			</dict>
			<dict>
				<key>blue</key>
				<real>1</real>
				<key>green</key>
				<real>1</real>
				<key>red</key>
				<real>1</real>
			</dict>
		</array>
	</array>
	<key>16bitClutCurves</key>
	<array>
		<array>
			<dict>
				<key>x</key>
				<real>-643.78106689453125</real>
				<key>y</key>
				<real>0.0</real>
			</dict>
			<dict>
				<key>x</key>
				<real>-584.65887451171875</real>
				<key>y</key>
				<real>0.26931655406951904</real>
			</dict>
			<dict>
				<key>x</key>
				<real>-382.65924072265625</real>
				<key>y</key>
				<real>0.46969130635261536</real>
			</dict>
			<dict>
				<key>x</key>
				<real>-237.65838623046875</real>
				<key>y</key>
				<real>0.51899993419647217</real>
			</dict>
		</array>
		<array>
			<dict>
				<key>x</key>
				<real>-75.40606689453125</real>
				<key>y</key>
				<real>0.0</real>
			</dict>
			<dict>
				<key>x</key>
				<real>114.5941162109375</real>
				<key>y</key>
				<real>0.27931660413742065</real>
			</dict>
			<dict>
				<key>x</key>
				<real>316.5936279296875</real>
				<key>y</key>
				<real>0.28899994492530823</real>
			</dict>
			<dict>
				<key>x</key>
				<real>461.59375</real>
				<key>y</key>
				<real>0.28899994492530823</real>
			</dict>
		</array>
	</array>
	<key>CLUT</key>
	<string>16-bit CLUT</string>
	<key>advancedCLUT</key>
	<true/>
	<key>backgroundColorBlueComponent</key>
	<real>0.0</real>
	<key>backgroundColorGreenComponent</key>
	<real>0.0</real>
	<key>backgroundColorRedComponent</key>
	<real>0.0</real>
	<key>convolutionFilters</key>
	<array>
		<string>Basic Smooth 5x5</string>
	</array>
	<key>groupName</key>
	<string>Soft Tissue CT</string>
	<key>name</key>
	<string>Soft + Skin</string>
	<key>opacity</key>
	<string>Logarithmic Inverse Table</string>
	<key>projection</key>
	<integer>1</integer>
	<key>shading</key>
	<string>Endoscopy</string>
	<key>useShading</key>
	<true/>
	<key>wl</key>
	<real>-440.7197265625</real>
	<key>ww</key>
	<real>406.1226806640625</real>
</dict>
</plist>'''

clut_colors, clut_curves = parse_plist(xml_data)

# Преобразование данных в необходимый формат
result = {
    "Soft + Skin": {
        "ColorSpace": "Diverging",
        "Name": "TestMap",
        "NanColor": [1, 0, 0],
        "License": "CC0",
        "Creator": "Eric Firing",
        "RGBPoints": []
    }
}

# Заполнение RGBPoints с некоторым преобразованием (интерполяцией)
for i, color in enumerate(clut_colors):
    # Здесь мы предполагаем равномерное распределение точек между 0 и 1.0
    intensity = i / (len(clut_colors) - 1)
    red, green, blue = color
    result["Soft + Skin"]["RGBPoints"].extend([intensity, red, green, blue])

print(result)
