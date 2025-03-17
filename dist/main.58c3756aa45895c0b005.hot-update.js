"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdateitk_vtk_viewer"]("main",{

/***/ "./src/Rendering/VTKJS/Images/applyPiecewiseFunction.js":
/*!**************************************************************!*\
  !*** ./src/Rendering/VTKJS/Images/applyPiecewiseFunction.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/readOnlyError */ \"./node_modules/@babel/runtime/helpers/esm/readOnlyError.js\");\n\nfunction applyPiecewiseFunction(context, event) {\n  var _context$images$piece;\n  var name = event.data.name;\n  var component = event.data.component;\n  // const range = event.data.range\n  var nodes = event.data.nodes;\n  var actorContext = context.images.actorContext.get(name);\n  var image = actorContext.image;\n  var pwf = (_context$images$piece = context.images.piecewiseFunctions) === null || _context$images$piece === void 0 ? void 0 : _context$images$piece.get(component);\n  if (pwf && image) {\n    var slicePiecewiseFunction = pwf.slice;\n    var volumePiecewiseFunction = pwf.volume;\n    volumePiecewiseFunction.setNodes(nodes);\n    var sliceNodes = nodes.length > 2 ? nodes.slice(1, -1) : nodes; // if more than 2, remove \"window\" nodes with y = 0\n\n    [], (0,_babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(\"sliceNodes\");\n    slicePiecewiseFunction.setNodes(sliceNodes);\n    console.log(sliceNodes);\n    context.service.send('RENDER');\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (applyPiecewiseFunction);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUmVuZGVyaW5nL1ZUS0pTL0ltYWdlcy9hcHBseVBpZWNld2lzZUZ1bmN0aW9uLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLFNBQVNBLHNCQUFzQkEsQ0FBQ0MsT0FBTyxFQUFFQyxLQUFLLEVBQUU7RUFBQSxJQUFBQyxxQkFBQTtFQUM5QyxJQUFNQyxJQUFJLEdBQUdGLEtBQUssQ0FBQ0csSUFBSSxDQUFDRCxJQUFJO0VBQzVCLElBQU1FLFNBQVMsR0FBR0osS0FBSyxDQUFDRyxJQUFJLENBQUNDLFNBQVM7RUFDdEM7RUFDQSxJQUFNQyxLQUFLLEdBQUdMLEtBQUssQ0FBQ0csSUFBSSxDQUFDRSxLQUFLO0VBRTlCLElBQU1DLFlBQVksR0FBR1AsT0FBTyxDQUFDUSxNQUFNLENBQUNELFlBQVksQ0FBQ0UsR0FBRyxDQUFDTixJQUFJLENBQUM7RUFDMUQsSUFBTU8sS0FBSyxHQUFHSCxZQUFZLENBQUNHLEtBQUs7RUFFaEMsSUFBTUMsR0FBRyxJQUFBVCxxQkFBQSxHQUFHRixPQUFPLENBQUNRLE1BQU0sQ0FBQ0ksa0JBQWtCLGNBQUFWLHFCQUFBLHVCQUFqQ0EscUJBQUEsQ0FBbUNPLEdBQUcsQ0FBQ0osU0FBUyxDQUFDO0VBQzdELElBQUlNLEdBQUcsSUFBSUQsS0FBSyxFQUFFO0lBQ2hCLElBQU1HLHNCQUFzQixHQUFHRixHQUFHLENBQUNHLEtBQUs7SUFDeEMsSUFBTUMsdUJBQXVCLEdBQUdKLEdBQUcsQ0FBQ0ssTUFBTTtJQUUxQ0QsdUJBQXVCLENBQUNFLFFBQVEsQ0FBQ1gsS0FBSyxDQUFDO0lBRXZDLElBQU1ZLFVBQVUsR0FBR1osS0FBSyxDQUFDYSxNQUFNLEdBQUcsQ0FBQyxHQUFHYixLQUFLLENBQUNRLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBR1IsS0FBSyxFQUFDOztJQUVwRCxFQUFFLEVBQUFjLGdGQUFBO0lBRWZQLHNCQUFzQixDQUFDSSxRQUFRLENBQUNDLFVBQVUsQ0FBQztJQUUzQ0csT0FBTyxDQUFDQyxHQUFHLENBQUNKLFVBQVUsQ0FBQztJQUV2QmxCLE9BQU8sQ0FBQ3VCLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDLFFBQVEsQ0FBQztFQUNoQztBQUNGO0FBRUEsaUVBQWV6QixzQkFBc0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pdGstdnRrLXZpZXdlci8uL3NyYy9SZW5kZXJpbmcvVlRLSlMvSW1hZ2VzL2FwcGx5UGllY2V3aXNlRnVuY3Rpb24uanM/NTE1YyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBhcHBseVBpZWNld2lzZUZ1bmN0aW9uKGNvbnRleHQsIGV2ZW50KSB7XHJcbiAgY29uc3QgbmFtZSA9IGV2ZW50LmRhdGEubmFtZVxyXG4gIGNvbnN0IGNvbXBvbmVudCA9IGV2ZW50LmRhdGEuY29tcG9uZW50XHJcbiAgLy8gY29uc3QgcmFuZ2UgPSBldmVudC5kYXRhLnJhbmdlXHJcbiAgY29uc3Qgbm9kZXMgPSBldmVudC5kYXRhLm5vZGVzXHJcblxyXG4gIGNvbnN0IGFjdG9yQ29udGV4dCA9IGNvbnRleHQuaW1hZ2VzLmFjdG9yQ29udGV4dC5nZXQobmFtZSlcclxuICBjb25zdCBpbWFnZSA9IGFjdG9yQ29udGV4dC5pbWFnZVxyXG5cclxuICBjb25zdCBwd2YgPSBjb250ZXh0LmltYWdlcy5waWVjZXdpc2VGdW5jdGlvbnM/LmdldChjb21wb25lbnQpXHJcbiAgaWYgKHB3ZiAmJiBpbWFnZSkge1xyXG4gICAgY29uc3Qgc2xpY2VQaWVjZXdpc2VGdW5jdGlvbiA9IHB3Zi5zbGljZVxyXG4gICAgY29uc3Qgdm9sdW1lUGllY2V3aXNlRnVuY3Rpb24gPSBwd2Yudm9sdW1lXHJcblxyXG4gICAgdm9sdW1lUGllY2V3aXNlRnVuY3Rpb24uc2V0Tm9kZXMobm9kZXMpXHJcblxyXG4gICAgY29uc3Qgc2xpY2VOb2RlcyA9IG5vZGVzLmxlbmd0aCA+IDIgPyBub2Rlcy5zbGljZSgxLCAtMSkgOiBub2RlcyAvLyBpZiBtb3JlIHRoYW4gMiwgcmVtb3ZlIFwid2luZG93XCIgbm9kZXMgd2l0aCB5ID0gMFxyXG5cclxuICAgIHNsaWNlTm9kZXMgPSBbXVxyXG5cclxuICAgIHNsaWNlUGllY2V3aXNlRnVuY3Rpb24uc2V0Tm9kZXMoc2xpY2VOb2RlcylcclxuXHJcbiAgICBjb25zb2xlLmxvZyhzbGljZU5vZGVzKVxyXG5cclxuICAgIGNvbnRleHQuc2VydmljZS5zZW5kKCdSRU5ERVInKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXBwbHlQaWVjZXdpc2VGdW5jdGlvblxyXG4iXSwibmFtZXMiOlsiYXBwbHlQaWVjZXdpc2VGdW5jdGlvbiIsImNvbnRleHQiLCJldmVudCIsIl9jb250ZXh0JGltYWdlcyRwaWVjZSIsIm5hbWUiLCJkYXRhIiwiY29tcG9uZW50Iiwibm9kZXMiLCJhY3RvckNvbnRleHQiLCJpbWFnZXMiLCJnZXQiLCJpbWFnZSIsInB3ZiIsInBpZWNld2lzZUZ1bmN0aW9ucyIsInNsaWNlUGllY2V3aXNlRnVuY3Rpb24iLCJzbGljZSIsInZvbHVtZVBpZWNld2lzZUZ1bmN0aW9uIiwidm9sdW1lIiwic2V0Tm9kZXMiLCJzbGljZU5vZGVzIiwibGVuZ3RoIiwiX3JlYWRPbmx5RXJyb3IiLCJjb25zb2xlIiwibG9nIiwic2VydmljZSIsInNlbmQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Rendering/VTKJS/Images/applyPiecewiseFunction.js\n");

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/readOnlyError.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/readOnlyError.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ _readOnlyError)\n/* harmony export */ });\nfunction _readOnlyError(name) {\n  throw new TypeError(\"\\\"\" + name + \"\\\" is read-only\");\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vcmVhZE9ubHlFcnJvci5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQWUsU0FBU0EsY0FBY0EsQ0FBQ0MsSUFBSSxFQUFFO0VBQzNDLE1BQU0sSUFBSUMsU0FBUyxDQUFDLElBQUksR0FBR0QsSUFBSSxHQUFHLGlCQUFpQixDQUFDO0FBQ3REIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaXRrLXZ0ay12aWV3ZXIvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vcmVhZE9ubHlFcnJvci5qcz9iMWY4Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9yZWFkT25seUVycm9yKG5hbWUpIHtcbiAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlxcXCJcIiArIG5hbWUgKyBcIlxcXCIgaXMgcmVhZC1vbmx5XCIpO1xufSJdLCJuYW1lcyI6WyJfcmVhZE9ubHlFcnJvciIsIm5hbWUiLCJUeXBlRXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/@babel/runtime/helpers/esm/readOnlyError.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9199bc94a40f18a12d0b")
/******/ })();
/******/ 
/******/ }
);