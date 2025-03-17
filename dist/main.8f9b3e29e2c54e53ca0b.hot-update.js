/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateitkVtkViewer"]("main",{

/***/ "./src/index.js?c170":
/*!******************************!*\
  !*** ./src/index-exposed.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var ___EXPOSE_LOADER_IMPORT___ = __webpack_require__(/*! -!./index.js */ \"./src/index.js?b635\");\nvar ___EXPOSE_LOADER_GET_GLOBAL_THIS___ = __webpack_require__(/*! ../node_modules/expose-loader/dist/runtime/getGlobalThis.js */ \"./node_modules/expose-loader/dist/runtime/getGlobalThis.js\");\nvar ___EXPOSE_LOADER_GLOBAL_THIS___ = ___EXPOSE_LOADER_GET_GLOBAL_THIS___;\nif (typeof ___EXPOSE_LOADER_GLOBAL_THIS___[\"itkVtkViewer\"] === 'undefined') ___EXPOSE_LOADER_GLOBAL_THIS___[\"itkVtkViewer\"] = ___EXPOSE_LOADER_IMPORT___;else throw new Error('[exposes-loader] The \"itkVtkViewer\" value exists in the global scope, it may not be safe to overwrite it, use the \"override\" option');\nmodule.exports = ___EXPOSE_LOADER_IMPORT___;\n\n//# sourceURL=webpack://itkVtkViewer/./src/index.js?");

/***/ }),

/***/ "./src/UserInterface/addLogo.js":
/*!**************************************!*\
  !*** ./src/UserInterface/addLogo.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ItkVtkViewer_module_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ItkVtkViewer.module.css */ \"./src/UserInterface/ItkVtkViewer.module.css\");\n/* harmony import */ var _icons_logo_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icons/logo.png */ \"./src/UserInterface/icons/logo.png\");\n/* harmony import */ var vtk_js_Sources_Interaction_UI_FPSMonitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vtk.js/Sources/Interaction/UI/FPSMonitor */ \"./node_modules/vtk.js/Sources/Interaction/UI/FPSMonitor/index.js\");\n\n\n\nfunction addLogo(store) {\n  var logo = new Image();\n  logo.src = _icons_logo_png__WEBPACK_IMPORTED_MODULE_1__;\n  logo.setAttribute('class', _ItkVtkViewer_module_css__WEBPACK_IMPORTED_MODULE_0__[\"default\"].logo);\n  store.container.appendChild(logo);\n  var showCredits = function showCredits() {\n    logo.style.display = 'none';\n    if (!store.appAttribution) {\n      var appAttribution = document.createElement('div');\n      appAttribution.setAttribute('class', _ItkVtkViewer_module_css__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fpsMonitor);\n      appAttribution.innerHTML = \"\\n  <p style=\\\"border:2px; border-radius: 3px; border-style:solid; border-color:#4488BB; padding: 1em;\\\"><a href=\\\"https://kitware.github.io/itk-vtk-viewer/index.html\\\">itk-vtk-viewer</a> development is <br>lead by the hearts and minds at <br> <a href=\\\"https://www.kitware.com\\\">Kitware</a>.</p>\";\n      store.container.appendChild(appAttribution);\n      store.appAttribution = appAttribution;\n    }\n  };\n  var showFps = function showFps() {\n    logo.style.display = 'none';\n    if (!store.fpsMonitor) {\n      var fpsMonitor = vtk_js_Sources_Interaction_UI_FPSMonitor__WEBPACK_IMPORTED_MODULE_2__[\"default\"].newInstance();\n      var fpsElement = fpsMonitor.getFpsMonitorContainer();\n      fpsElement.setAttribute('class', _ItkVtkViewer_module_css__WEBPACK_IMPORTED_MODULE_0__[\"default\"].fpsMonitor);\n      fpsMonitor.setContainer(store.container);\n      fpsMonitor.setBufferSize(100);\n      fpsMonitor.setRenderWindow(store.renderWindow);\n      fpsMonitor.update();\n      // store.fpsMonitor = fpsMonitor\n    }\n  };\n\n  logo.addEventListener('mousedown', function (e) {\n    if (e.button === 0) {\n      showCredits();\n    } else {\n      showFps();\n    }\n  });\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addLogo);\n\n//# sourceURL=webpack://itkVtkViewer/./src/UserInterface/addLogo.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/get javascript chunk filename */
/******/ (() => {
/******/ 	// This function allow to reference async chunks
/******/ 	__webpack_require__.u = (chunkId) => {
/******/ 		// return url for filenames based on template
/******/ 		return "" + chunkId + ".itkVtkViewerCDN.js";
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/get javascript update chunk filename */
/******/ (() => {
/******/ 	// This function allow to reference all chunks
/******/ 	__webpack_require__.hu = (chunkId) => {
/******/ 		// return url for filenames based on template
/******/ 		return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8de99107e61d9a65e94c")
/******/ })();
/******/ 
/******/ }
);