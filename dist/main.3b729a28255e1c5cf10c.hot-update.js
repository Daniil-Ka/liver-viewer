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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction applyPiecewiseFunction(context, event) {\n  var _context$images$piece;\n  var name = event.data.name;\n  var component = event.data.component;\n  // const range = event.data.range\n  var nodes = event.data.nodes;\n  var actorContext = context.images.actorContext.get(name);\n  var image = actorContext.image;\n  var pwf = (_context$images$piece = context.images.piecewiseFunctions) === null || _context$images$piece === void 0 ? void 0 : _context$images$piece.get(component);\n  if (pwf && image) {\n    var slicePiecewiseFunction = pwf.slice;\n    var volumePiecewiseFunction = pwf.volume;\n    volumePiecewiseFunction.setNodes(nodes);\n    var sliceNodes = nodes.length > 2 ? nodes.slice(1, -1) : nodes; // if more than 2, remove \"window\" nodes with y = 0\n\n    // sliceNodes = [123, 124, 1254]\n    sliceNodes = slicePiecewiseFunction.setNodes(sliceNodes);\n    console.log(sliceNodes);\n    context.service.send('RENDER');\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (applyPiecewiseFunction);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUmVuZGVyaW5nL1ZUS0pTL0ltYWdlcy9hcHBseVBpZWNld2lzZUZ1bmN0aW9uLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxTQUFTQSxzQkFBc0JBLENBQUNDLE9BQU8sRUFBRUMsS0FBSyxFQUFFO0VBQUEsSUFBQUMscUJBQUE7RUFDOUMsSUFBTUMsSUFBSSxHQUFHRixLQUFLLENBQUNHLElBQUksQ0FBQ0QsSUFBSTtFQUM1QixJQUFNRSxTQUFTLEdBQUdKLEtBQUssQ0FBQ0csSUFBSSxDQUFDQyxTQUFTO0VBQ3RDO0VBQ0EsSUFBTUMsS0FBSyxHQUFHTCxLQUFLLENBQUNHLElBQUksQ0FBQ0UsS0FBSztFQUU5QixJQUFNQyxZQUFZLEdBQUdQLE9BQU8sQ0FBQ1EsTUFBTSxDQUFDRCxZQUFZLENBQUNFLEdBQUcsQ0FBQ04sSUFBSSxDQUFDO0VBQzFELElBQU1PLEtBQUssR0FBR0gsWUFBWSxDQUFDRyxLQUFLO0VBRWhDLElBQU1DLEdBQUcsSUFBQVQscUJBQUEsR0FBR0YsT0FBTyxDQUFDUSxNQUFNLENBQUNJLGtCQUFrQixjQUFBVixxQkFBQSx1QkFBakNBLHFCQUFBLENBQW1DTyxHQUFHLENBQUNKLFNBQVMsQ0FBQztFQUM3RCxJQUFJTSxHQUFHLElBQUlELEtBQUssRUFBRTtJQUNoQixJQUFNRyxzQkFBc0IsR0FBR0YsR0FBRyxDQUFDRyxLQUFLO0lBQ3hDLElBQU1DLHVCQUF1QixHQUFHSixHQUFHLENBQUNLLE1BQU07SUFFMUNELHVCQUF1QixDQUFDRSxRQUFRLENBQUNYLEtBQUssQ0FBQztJQUV2QyxJQUFJWSxVQUFVLEdBQUdaLEtBQUssQ0FBQ2EsTUFBTSxHQUFHLENBQUMsR0FBR2IsS0FBSyxDQUFDUSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUdSLEtBQUssRUFBRTs7SUFFaEU7SUFDQVksVUFBVSxHQUdWTCxzQkFBc0IsQ0FBQ0ksUUFBUSxDQUFDQyxVQUFVLENBQUM7SUFFM0NFLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDSCxVQUFVLENBQUM7SUFFdkJsQixPQUFPLENBQUNzQixPQUFPLENBQUNDLElBQUksQ0FBQyxRQUFRLENBQUM7RUFDaEM7QUFDRjtBQUVBLGlFQUFleEIsc0JBQXNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vaXRrLXZ0ay12aWV3ZXIvLi9zcmMvUmVuZGVyaW5nL1ZUS0pTL0ltYWdlcy9hcHBseVBpZWNld2lzZUZ1bmN0aW9uLmpzPzUxNWMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gYXBwbHlQaWVjZXdpc2VGdW5jdGlvbihjb250ZXh0LCBldmVudCkge1xuICBjb25zdCBuYW1lID0gZXZlbnQuZGF0YS5uYW1lXG4gIGNvbnN0IGNvbXBvbmVudCA9IGV2ZW50LmRhdGEuY29tcG9uZW50XG4gIC8vIGNvbnN0IHJhbmdlID0gZXZlbnQuZGF0YS5yYW5nZVxuICBjb25zdCBub2RlcyA9IGV2ZW50LmRhdGEubm9kZXNcblxuICBjb25zdCBhY3RvckNvbnRleHQgPSBjb250ZXh0LmltYWdlcy5hY3RvckNvbnRleHQuZ2V0KG5hbWUpXG4gIGNvbnN0IGltYWdlID0gYWN0b3JDb250ZXh0LmltYWdlXG5cbiAgY29uc3QgcHdmID0gY29udGV4dC5pbWFnZXMucGllY2V3aXNlRnVuY3Rpb25zPy5nZXQoY29tcG9uZW50KVxuICBpZiAocHdmICYmIGltYWdlKSB7XG4gICAgY29uc3Qgc2xpY2VQaWVjZXdpc2VGdW5jdGlvbiA9IHB3Zi5zbGljZVxuICAgIGNvbnN0IHZvbHVtZVBpZWNld2lzZUZ1bmN0aW9uID0gcHdmLnZvbHVtZVxuXG4gICAgdm9sdW1lUGllY2V3aXNlRnVuY3Rpb24uc2V0Tm9kZXMobm9kZXMpXG5cbiAgICBsZXQgc2xpY2VOb2RlcyA9IG5vZGVzLmxlbmd0aCA+IDIgPyBub2Rlcy5zbGljZSgxLCAtMSkgOiBub2RlcyAgLy8gaWYgbW9yZSB0aGFuIDIsIHJlbW92ZSBcIndpbmRvd1wiIG5vZGVzIHdpdGggeSA9IDBcblxuICAgIC8vIHNsaWNlTm9kZXMgPSBbMTIzLCAxMjQsIDEyNTRdXG4gICAgc2xpY2VOb2RlcyA9IFxuXG5cbiAgICBzbGljZVBpZWNld2lzZUZ1bmN0aW9uLnNldE5vZGVzKHNsaWNlTm9kZXMpXG5cbiAgICBjb25zb2xlLmxvZyhzbGljZU5vZGVzKVxuXG4gICAgY29udGV4dC5zZXJ2aWNlLnNlbmQoJ1JFTkRFUicpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwbHlQaWVjZXdpc2VGdW5jdGlvblxuIl0sIm5hbWVzIjpbImFwcGx5UGllY2V3aXNlRnVuY3Rpb24iLCJjb250ZXh0IiwiZXZlbnQiLCJfY29udGV4dCRpbWFnZXMkcGllY2UiLCJuYW1lIiwiZGF0YSIsImNvbXBvbmVudCIsIm5vZGVzIiwiYWN0b3JDb250ZXh0IiwiaW1hZ2VzIiwiZ2V0IiwiaW1hZ2UiLCJwd2YiLCJwaWVjZXdpc2VGdW5jdGlvbnMiLCJzbGljZVBpZWNld2lzZUZ1bmN0aW9uIiwic2xpY2UiLCJ2b2x1bWVQaWVjZXdpc2VGdW5jdGlvbiIsInZvbHVtZSIsInNldE5vZGVzIiwic2xpY2VOb2RlcyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJzZXJ2aWNlIiwic2VuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Rendering/VTKJS/Images/applyPiecewiseFunction.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("700b7aafa0f679783639")
/******/ })();
/******/ 
/******/ }
);