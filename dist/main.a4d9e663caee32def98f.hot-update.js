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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction applyPiecewiseFunction(context, event) {\n  var _context$images$piece;\n  var name = event.data.name;\n  var component = event.data.component;\n  // const range = event.data.range\n  var nodes = event.data.nodes;\n  var actorContext = context.images.actorContext.get(name);\n  var image = actorContext.image;\n  var pwf = (_context$images$piece = context.images.piecewiseFunctions) === null || _context$images$piece === void 0 ? void 0 : _context$images$piece.get(component);\n  if (pwf && image) {\n    var slicePiecewiseFunction = pwf.slice;\n    var volumePiecewiseFunction = pwf.volume;\n    volumePiecewiseFunction.setNodes(nodes);\n    var sliceNodes = nodes.length > 2 ? nodes.slice(1, -1) : nodes; // if more than 2, remove \"window\" nodes with y = 0\n    slicePiecewiseFunction.setNodes(sliceNodes);\n    console.log(slicePiecewiseFunction);\n    context.service.send('RENDER');\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (applyPiecewiseFunction);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUmVuZGVyaW5nL1ZUS0pTL0ltYWdlcy9hcHBseVBpZWNld2lzZUZ1bmN0aW9uLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxTQUFTQSxzQkFBc0JBLENBQUNDLE9BQU8sRUFBRUMsS0FBSyxFQUFFO0VBQUEsSUFBQUMscUJBQUE7RUFDOUMsSUFBTUMsSUFBSSxHQUFHRixLQUFLLENBQUNHLElBQUksQ0FBQ0QsSUFBSTtFQUM1QixJQUFNRSxTQUFTLEdBQUdKLEtBQUssQ0FBQ0csSUFBSSxDQUFDQyxTQUFTO0VBQ3RDO0VBQ0EsSUFBTUMsS0FBSyxHQUFHTCxLQUFLLENBQUNHLElBQUksQ0FBQ0UsS0FBSztFQUU5QixJQUFNQyxZQUFZLEdBQUdQLE9BQU8sQ0FBQ1EsTUFBTSxDQUFDRCxZQUFZLENBQUNFLEdBQUcsQ0FBQ04sSUFBSSxDQUFDO0VBQzFELElBQU1PLEtBQUssR0FBR0gsWUFBWSxDQUFDRyxLQUFLO0VBRWhDLElBQU1DLEdBQUcsSUFBQVQscUJBQUEsR0FBR0YsT0FBTyxDQUFDUSxNQUFNLENBQUNJLGtCQUFrQixjQUFBVixxQkFBQSx1QkFBakNBLHFCQUFBLENBQW1DTyxHQUFHLENBQUNKLFNBQVMsQ0FBQztFQUM3RCxJQUFJTSxHQUFHLElBQUlELEtBQUssRUFBRTtJQUNoQixJQUFNRyxzQkFBc0IsR0FBR0YsR0FBRyxDQUFDRyxLQUFLO0lBQ3hDLElBQU1DLHVCQUF1QixHQUFHSixHQUFHLENBQUNLLE1BQU07SUFFMUNELHVCQUF1QixDQUFDRSxRQUFRLENBQUNYLEtBQUssQ0FBQztJQUV2QyxJQUFNWSxVQUFVLEdBQUdaLEtBQUssQ0FBQ2EsTUFBTSxHQUFHLENBQUMsR0FBR2IsS0FBSyxDQUFDUSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUdSLEtBQUssRUFBQztJQUNqRU8sc0JBQXNCLENBQUNJLFFBQVEsQ0FBQ0MsVUFBVSxDQUFDO0lBRTNDRSxPQUFPLENBQUNDLEdBQUcsQ0FBQ1Isc0JBQXNCLENBQUM7SUFFbkNiLE9BQU8sQ0FBQ3NCLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDLFFBQVEsQ0FBQztFQUNoQztBQUNGO0FBRUEsaUVBQWV4QixzQkFBc0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9pdGstdnRrLXZpZXdlci8uL3NyYy9SZW5kZXJpbmcvVlRLSlMvSW1hZ2VzL2FwcGx5UGllY2V3aXNlRnVuY3Rpb24uanM/NTE1YyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBhcHBseVBpZWNld2lzZUZ1bmN0aW9uKGNvbnRleHQsIGV2ZW50KSB7XHJcbiAgY29uc3QgbmFtZSA9IGV2ZW50LmRhdGEubmFtZVxyXG4gIGNvbnN0IGNvbXBvbmVudCA9IGV2ZW50LmRhdGEuY29tcG9uZW50XHJcbiAgLy8gY29uc3QgcmFuZ2UgPSBldmVudC5kYXRhLnJhbmdlXHJcbiAgY29uc3Qgbm9kZXMgPSBldmVudC5kYXRhLm5vZGVzXHJcblxyXG4gIGNvbnN0IGFjdG9yQ29udGV4dCA9IGNvbnRleHQuaW1hZ2VzLmFjdG9yQ29udGV4dC5nZXQobmFtZSlcclxuICBjb25zdCBpbWFnZSA9IGFjdG9yQ29udGV4dC5pbWFnZVxyXG5cclxuICBjb25zdCBwd2YgPSBjb250ZXh0LmltYWdlcy5waWVjZXdpc2VGdW5jdGlvbnM/LmdldChjb21wb25lbnQpXHJcbiAgaWYgKHB3ZiAmJiBpbWFnZSkge1xyXG4gICAgY29uc3Qgc2xpY2VQaWVjZXdpc2VGdW5jdGlvbiA9IHB3Zi5zbGljZVxyXG4gICAgY29uc3Qgdm9sdW1lUGllY2V3aXNlRnVuY3Rpb24gPSBwd2Yudm9sdW1lXHJcblxyXG4gICAgdm9sdW1lUGllY2V3aXNlRnVuY3Rpb24uc2V0Tm9kZXMobm9kZXMpXHJcblxyXG4gICAgY29uc3Qgc2xpY2VOb2RlcyA9IG5vZGVzLmxlbmd0aCA+IDIgPyBub2Rlcy5zbGljZSgxLCAtMSkgOiBub2RlcyAvLyBpZiBtb3JlIHRoYW4gMiwgcmVtb3ZlIFwid2luZG93XCIgbm9kZXMgd2l0aCB5ID0gMFxyXG4gICAgc2xpY2VQaWVjZXdpc2VGdW5jdGlvbi5zZXROb2RlcyhzbGljZU5vZGVzKVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHNsaWNlUGllY2V3aXNlRnVuY3Rpb24pXHJcblxyXG4gICAgY29udGV4dC5zZXJ2aWNlLnNlbmQoJ1JFTkRFUicpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcHBseVBpZWNld2lzZUZ1bmN0aW9uXHJcbiJdLCJuYW1lcyI6WyJhcHBseVBpZWNld2lzZUZ1bmN0aW9uIiwiY29udGV4dCIsImV2ZW50IiwiX2NvbnRleHQkaW1hZ2VzJHBpZWNlIiwibmFtZSIsImRhdGEiLCJjb21wb25lbnQiLCJub2RlcyIsImFjdG9yQ29udGV4dCIsImltYWdlcyIsImdldCIsImltYWdlIiwicHdmIiwicGllY2V3aXNlRnVuY3Rpb25zIiwic2xpY2VQaWVjZXdpc2VGdW5jdGlvbiIsInNsaWNlIiwidm9sdW1lUGllY2V3aXNlRnVuY3Rpb24iLCJ2b2x1bWUiLCJzZXROb2RlcyIsInNsaWNlTm9kZXMiLCJsZW5ndGgiLCJjb25zb2xlIiwibG9nIiwic2VydmljZSIsInNlbmQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/Rendering/VTKJS/Images/applyPiecewiseFunction.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("848952de42b3cf681650")
/******/ })();
/******/ 
/******/ }
);