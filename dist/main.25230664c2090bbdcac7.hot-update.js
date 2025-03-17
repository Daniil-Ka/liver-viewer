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

/***/ "./src/Rendering/VTKJS/Images/applyPiecewiseFunction.js":
/*!**************************************************************!*\
  !*** ./src/Rendering/VTKJS/Images/applyPiecewiseFunction.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/readOnlyError */ \"./node_modules/@babel/runtime/helpers/esm/readOnlyError.js\");\n\nfunction applyPiecewiseFunction(context, event) {\n  var _context$images$piece;\n  var name = event.data.name;\n  var component = event.data.component;\n  // const range = event.data.range\n  var nodes = event.data.nodes;\n  var actorContext = context.images.actorContext.get(name);\n  var image = actorContext.image;\n  var pwf = (_context$images$piece = context.images.piecewiseFunctions) === null || _context$images$piece === void 0 ? void 0 : _context$images$piece.get(component);\n  if (pwf && image) {\n    var slicePiecewiseFunction = pwf.slice;\n    var volumePiecewiseFunction = pwf.volume;\n    volumePiecewiseFunction.setNodes(nodes);\n    var sliceNodes = nodes.length > 2 ? nodes.slice(1, -1) : nodes; // if more than 2, remove \"window\" nodes with y = 0\n\n    [], (0,_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"sliceNodes\");\n    slicePiecewiseFunction.setNodes(sliceNodes);\n    console.log(sliceNodes);\n    context.service.send('RENDER');\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (applyPiecewiseFunction);\n\n//# sourceURL=webpack://itkVtkViewer/./src/Rendering/VTKJS/Images/applyPiecewiseFunction.js?");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/readOnlyError.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/readOnlyError.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _readOnlyError)\n/* harmony export */ });\nfunction _readOnlyError(name) {\n  throw new TypeError(\"\\\"\" + name + \"\\\" is read-only\");\n}\n\n//# sourceURL=webpack://itkVtkViewer/./node_modules/@babel/runtime/helpers/esm/readOnlyError.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3097a3e92004d2d0261a")
/******/ })();
/******/ 
/******/ }
);