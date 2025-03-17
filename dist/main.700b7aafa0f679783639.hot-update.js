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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction applyPiecewiseFunction(context, event) {\n  var _context$images$piece;\n  var name = event.data.name;\n  var component = event.data.component;\n  // const range = event.data.range\n  var nodes = event.data.nodes;\n  var actorContext = context.images.actorContext.get(name);\n  var image = actorContext.image;\n  var pwf = (_context$images$piece = context.images.piecewiseFunctions) === null || _context$images$piece === void 0 ? void 0 : _context$images$piece.get(component);\n  if (pwf && image) {\n    var slicePiecewiseFunction = pwf.slice;\n    var volumePiecewiseFunction = pwf.volume;\n    volumePiecewiseFunction.setNodes(nodes);\n    var sliceNodes = nodes.length > 2 ? nodes.slice(1, -1) : nodes; // if more than 2, remove \"window\" nodes with y = 0\n\n    // sliceNodes = [123, 124, 1254]\n    // sliceNodes =\n\n    slicePiecewiseFunction.setNodes(sliceNodes);\n    console.log(sliceNodes);\n    context.service.send('RENDER');\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (applyPiecewiseFunction);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUmVuZGVyaW5nL1ZUS0pTL0ltYWdlcy9hcHBseVBpZWNld2lzZUZ1bmN0aW9uLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxTQUFTQSxzQkFBc0JBLENBQUNDLE9BQU8sRUFBRUMsS0FBSyxFQUFFO0VBQUEsSUFBQUMscUJBQUE7RUFDOUMsSUFBTUMsSUFBSSxHQUFHRixLQUFLLENBQUNHLElBQUksQ0FBQ0QsSUFBSTtFQUM1QixJQUFNRSxTQUFTLEdBQUdKLEtBQUssQ0FBQ0csSUFBSSxDQUFDQyxTQUFTO0VBQ3RDO0VBQ0EsSUFBTUMsS0FBSyxHQUFHTCxLQUFLLENBQUNHLElBQUksQ0FBQ0UsS0FBSztFQUU5QixJQUFNQyxZQUFZLEdBQUdQLE9BQU8sQ0FBQ1EsTUFBTSxDQUFDRCxZQUFZLENBQUNFLEdBQUcsQ0FBQ04sSUFBSSxDQUFDO0VBQzFELElBQU1PLEtBQUssR0FBR0gsWUFBWSxDQUFDRyxLQUFLO0VBRWhDLElBQU1DLEdBQUcsSUFBQVQscUJBQUEsR0FBR0YsT0FBTyxDQUFDUSxNQUFNLENBQUNJLGtCQUFrQixjQUFBVixxQkFBQSx1QkFBakNBLHFCQUFBLENBQW1DTyxHQUFHLENBQUNKLFNBQVMsQ0FBQztFQUM3RCxJQUFJTSxHQUFHLElBQUlELEtBQUssRUFBRTtJQUNoQixJQUFNRyxzQkFBc0IsR0FBR0YsR0FBRyxDQUFDRyxLQUFLO0lBQ3hDLElBQU1DLHVCQUF1QixHQUFHSixHQUFHLENBQUNLLE1BQU07SUFFMUNELHVCQUF1QixDQUFDRSxRQUFRLENBQUNYLEtBQUssQ0FBQztJQUV2QyxJQUFJWSxVQUFVLEdBQUdaLEtBQUssQ0FBQ2EsTUFBTSxHQUFHLENBQUMsR0FBR2IsS0FBSyxDQUFDUSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUdSLEtBQUssRUFBRTs7SUFFaEU7SUFDQTs7SUFHQU8sc0JBQXNCLENBQUNJLFFBQVEsQ0FBQ0MsVUFBVSxDQUFDO0lBRTNDRSxPQUFPLENBQUNDLEdBQUcsQ0FBQ0gsVUFBVSxDQUFDO0lBRXZCbEIsT0FBTyxDQUFDc0IsT0FBTyxDQUFDQyxJQUFJLENBQUMsUUFBUSxDQUFDO0VBQ2hDO0FBQ0Y7QUFFQSxpRUFBZXhCLHNCQUFzQiIsInNvdXJjZXMiOlsid2VicGFjazovL2l0ay12dGstdmlld2VyLy4vc3JjL1JlbmRlcmluZy9WVEtKUy9JbWFnZXMvYXBwbHlQaWVjZXdpc2VGdW5jdGlvbi5qcz81MTVjIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGFwcGx5UGllY2V3aXNlRnVuY3Rpb24oY29udGV4dCwgZXZlbnQpIHtcbiAgY29uc3QgbmFtZSA9IGV2ZW50LmRhdGEubmFtZVxuICBjb25zdCBjb21wb25lbnQgPSBldmVudC5kYXRhLmNvbXBvbmVudFxuICAvLyBjb25zdCByYW5nZSA9IGV2ZW50LmRhdGEucmFuZ2VcbiAgY29uc3Qgbm9kZXMgPSBldmVudC5kYXRhLm5vZGVzXG5cbiAgY29uc3QgYWN0b3JDb250ZXh0ID0gY29udGV4dC5pbWFnZXMuYWN0b3JDb250ZXh0LmdldChuYW1lKVxuICBjb25zdCBpbWFnZSA9IGFjdG9yQ29udGV4dC5pbWFnZVxuXG4gIGNvbnN0IHB3ZiA9IGNvbnRleHQuaW1hZ2VzLnBpZWNld2lzZUZ1bmN0aW9ucz8uZ2V0KGNvbXBvbmVudClcbiAgaWYgKHB3ZiAmJiBpbWFnZSkge1xuICAgIGNvbnN0IHNsaWNlUGllY2V3aXNlRnVuY3Rpb24gPSBwd2Yuc2xpY2VcbiAgICBjb25zdCB2b2x1bWVQaWVjZXdpc2VGdW5jdGlvbiA9IHB3Zi52b2x1bWVcblxuICAgIHZvbHVtZVBpZWNld2lzZUZ1bmN0aW9uLnNldE5vZGVzKG5vZGVzKVxuXG4gICAgbGV0IHNsaWNlTm9kZXMgPSBub2Rlcy5sZW5ndGggPiAyID8gbm9kZXMuc2xpY2UoMSwgLTEpIDogbm9kZXMgIC8vIGlmIG1vcmUgdGhhbiAyLCByZW1vdmUgXCJ3aW5kb3dcIiBub2RlcyB3aXRoIHkgPSAwXG5cbiAgICAvLyBzbGljZU5vZGVzID0gWzEyMywgMTI0LCAxMjU0XVxuICAgIC8vIHNsaWNlTm9kZXMgPVxuXG5cbiAgICBzbGljZVBpZWNld2lzZUZ1bmN0aW9uLnNldE5vZGVzKHNsaWNlTm9kZXMpXG5cbiAgICBjb25zb2xlLmxvZyhzbGljZU5vZGVzKVxuXG4gICAgY29udGV4dC5zZXJ2aWNlLnNlbmQoJ1JFTkRFUicpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYXBwbHlQaWVjZXdpc2VGdW5jdGlvblxuIl0sIm5hbWVzIjpbImFwcGx5UGllY2V3aXNlRnVuY3Rpb24iLCJjb250ZXh0IiwiZXZlbnQiLCJfY29udGV4dCRpbWFnZXMkcGllY2UiLCJuYW1lIiwiZGF0YSIsImNvbXBvbmVudCIsIm5vZGVzIiwiYWN0b3JDb250ZXh0IiwiaW1hZ2VzIiwiZ2V0IiwiaW1hZ2UiLCJwd2YiLCJwaWVjZXdpc2VGdW5jdGlvbnMiLCJzbGljZVBpZWNld2lzZUZ1bmN0aW9uIiwic2xpY2UiLCJ2b2x1bWVQaWVjZXdpc2VGdW5jdGlvbiIsInZvbHVtZSIsInNldE5vZGVzIiwic2xpY2VOb2RlcyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJzZXJ2aWNlIiwic2VuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Rendering/VTKJS/Images/applyPiecewiseFunction.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("e252c20c75aa14b90f78")
/******/ })();
/******/ 
/******/ }
);