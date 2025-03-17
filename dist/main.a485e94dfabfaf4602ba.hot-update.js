"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateitkVtkViewer"]("main",{

/***/ "./src/Rendering/VTKJS/Images/applyColorMap.js":
/*!*****************************************************!*\
  !*** ./src/Rendering/VTKJS/Images/applyColorMap.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var itk_viewer_color_maps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! itk-viewer-color-maps */ \"./node_modules/itk-viewer-color-maps/dist/index.js\");\n\n\n// We want an offset so there is contrast with label image colors\nvar COLOR_OFFSET = 146;\nfunction applyColorMap(context, _ref) {\n  var _context$images$color;\n  var _ref$data = _ref.data,\n    name = _ref$data.name,\n    colorMap = _ref$data.colorMap,\n    component = _ref$data.component;\n  var actorContext = context.images.actorContext.get(name);\n\n  // Optional chain on colorTransferFunctions in case compare set in createViewer\n  var colorTransferFunction = (_context$images$color = context.images.colorTransferFunctions) === null || _context$images$color === void 0 ? void 0 : _context$images$color.get(component);\n\n  // if number of components increased after compare set and applyRenderedImage has not happened yet\n  if (!colorTransferFunction) return;\n  console.log((0,itk_viewer_color_maps__WEBPACK_IMPORTED_MODULE_0__.getColorMap)(colorMap, component + COLOR_OFFSET));\n  colorMap = (0,itk_viewer_color_maps__WEBPACK_IMPORTED_MODULE_0__.getColorMap)(colorMap, component + COLOR_OFFSET);\n  colorMap = {\n    \"ColorSpace\": \"Diverging\",\n    \"Name\": \"Viridis (matplotlib)\",\n    \"NanColor\": [1, 0, 0],\n    \"License\": \"CC0\",\n    \"Creator\": \"Eric Firing\",\n    \"RGBPoints\": [0, 0.267004, 0.004874, 0.329415, 0.003922, 0.26851, 0.009605, 0.335427, 0.007843, 0.269944, 0.014625, 0.341379, 0.011765, 0.271305, 0.019942, 0.347269, 0.015686, 0.272594, 0.025563, 0.353093, 0.019608, 0.273809, 0.031497, 0.358853, 0.023529, 0.274952, 0.037752, 0.364543, 0.027451, 0.276022, 0.044167, 0.370164, 0.031373, 0.277018, 0.050344, 0.375715, 0.035294, 0.277941, 0.056324, 0.381191, 0.039216, 0.278791, 0.062145, 0.386592, 0.043137, 0.279566, 0.067836, 0.391917, 0.047059, 0.280267, 0.073417, 0.397163, 1, 0.993248, 0.906157, 0.143936]\n  };\n  console.log(colorMap);\n  colorTransferFunction.applyColorMap(colorMap);\n  colorTransferFunction.modified(); // applyColorMap does not always trigger modified()\n  if (actorContext.colorRanges.has(component)) {\n    var range = actorContext.colorRanges.get(component);\n    colorTransferFunction.setMappingRange(range[0], range[1]);\n    colorTransferFunction.updateRange();\n  }\n\n  // update UI\n  context.service.send('IMAGE_COLOR_MAP_DEPENDENCIES_UPDATE', {\n    data: {\n      name: name,\n      component: component\n    }\n  });\n  context.service.send('RENDER');\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (applyColorMap);\n\n//# sourceURL=webpack://itkVtkViewer/./src/Rendering/VTKJS/Images/applyColorMap.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("658d8d1db2e3a84e28f0")
/******/ })();
/******/ 
/******/ }
);