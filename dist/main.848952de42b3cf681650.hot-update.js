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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction applyPiecewiseFunction(context, event) {\n  var _context$images$piece;\n  var name = event.data.name;\n  var component = event.data.component;\n  // const range = event.data.range\n  var nodes = event.data.nodes;\n  var actorContext = context.images.actorContext.get(name);\n  var image = actorContext.image;\n  var pwf = (_context$images$piece = context.images.piecewiseFunctions) === null || _context$images$piece === void 0 ? void 0 : _context$images$piece.get(component);\n  if (pwf && image) {\n    var slicePiecewiseFunction = pwf.slice;\n    var volumePiecewiseFunction = pwf.volume;\n    volumePiecewiseFunction.setNodes(nodes);\n    var sliceNodes = nodes.length > 2 ? nodes.slice(1, -1) : nodes; // if more than 2, remove \"window\" nodes with y = 0\n    slicePiecewiseFunction.setNodes(sliceNodes);\n    console.log(sliceNodes);\n    context.service.send('RENDER');\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (applyPiecewiseFunction);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvUmVuZGVyaW5nL1ZUS0pTL0ltYWdlcy9hcHBseVBpZWNld2lzZUZ1bmN0aW9uLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSxTQUFTQSxzQkFBc0JBLENBQUNDLE9BQU8sRUFBRUMsS0FBSyxFQUFFO0VBQUEsSUFBQUMscUJBQUE7RUFDOUMsSUFBTUMsSUFBSSxHQUFHRixLQUFLLENBQUNHLElBQUksQ0FBQ0QsSUFBSTtFQUM1QixJQUFNRSxTQUFTLEdBQUdKLEtBQUssQ0FBQ0csSUFBSSxDQUFDQyxTQUFTO0VBQ3RDO0VBQ0EsSUFBTUMsS0FBSyxHQUFHTCxLQUFLLENBQUNHLElBQUksQ0FBQ0UsS0FBSztFQUU5QixJQUFNQyxZQUFZLEdBQUdQLE9BQU8sQ0FBQ1EsTUFBTSxDQUFDRCxZQUFZLENBQUNFLEdBQUcsQ0FBQ04sSUFBSSxDQUFDO0VBQzFELElBQU1PLEtBQUssR0FBR0gsWUFBWSxDQUFDRyxLQUFLO0VBRWhDLElBQU1DLEdBQUcsSUFBQVQscUJBQUEsR0FBR0YsT0FBTyxDQUFDUSxNQUFNLENBQUNJLGtCQUFrQixjQUFBVixxQkFBQSx1QkFBakNBLHFCQUFBLENBQW1DTyxHQUFHLENBQUNKLFNBQVMsQ0FBQztFQUM3RCxJQUFJTSxHQUFHLElBQUlELEtBQUssRUFBRTtJQUNoQixJQUFNRyxzQkFBc0IsR0FBR0YsR0FBRyxDQUFDRyxLQUFLO0lBQ3hDLElBQU1DLHVCQUF1QixHQUFHSixHQUFHLENBQUNLLE1BQU07SUFFMUNELHVCQUF1QixDQUFDRSxRQUFRLENBQUNYLEtBQUssQ0FBQztJQUV2QyxJQUFNWSxVQUFVLEdBQUdaLEtBQUssQ0FBQ2EsTUFBTSxHQUFHLENBQUMsR0FBR2IsS0FBSyxDQUFDUSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUdSLEtBQUssRUFBQztJQUNqRU8sc0JBQXNCLENBQUNJLFFBQVEsQ0FBQ0MsVUFBVSxDQUFDO0lBRTNDRSxPQUFPLENBQUNDLEdBQUcsQ0FBQ0gsVUFBVSxDQUFDO0lBRXZCbEIsT0FBTyxDQUFDc0IsT0FBTyxDQUFDQyxJQUFJLENBQUMsUUFBUSxDQUFDO0VBQ2hDO0FBQ0Y7QUFFQSxpRUFBZXhCLHNCQUFzQiIsInNvdXJjZXMiOlsid2VicGFjazovL2l0ay12dGstdmlld2VyLy4vc3JjL1JlbmRlcmluZy9WVEtKUy9JbWFnZXMvYXBwbHlQaWVjZXdpc2VGdW5jdGlvbi5qcz81MTVjIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGFwcGx5UGllY2V3aXNlRnVuY3Rpb24oY29udGV4dCwgZXZlbnQpIHtcclxuICBjb25zdCBuYW1lID0gZXZlbnQuZGF0YS5uYW1lXHJcbiAgY29uc3QgY29tcG9uZW50ID0gZXZlbnQuZGF0YS5jb21wb25lbnRcclxuICAvLyBjb25zdCByYW5nZSA9IGV2ZW50LmRhdGEucmFuZ2VcclxuICBjb25zdCBub2RlcyA9IGV2ZW50LmRhdGEubm9kZXNcclxuXHJcbiAgY29uc3QgYWN0b3JDb250ZXh0ID0gY29udGV4dC5pbWFnZXMuYWN0b3JDb250ZXh0LmdldChuYW1lKVxyXG4gIGNvbnN0IGltYWdlID0gYWN0b3JDb250ZXh0LmltYWdlXHJcblxyXG4gIGNvbnN0IHB3ZiA9IGNvbnRleHQuaW1hZ2VzLnBpZWNld2lzZUZ1bmN0aW9ucz8uZ2V0KGNvbXBvbmVudClcclxuICBpZiAocHdmICYmIGltYWdlKSB7XHJcbiAgICBjb25zdCBzbGljZVBpZWNld2lzZUZ1bmN0aW9uID0gcHdmLnNsaWNlXHJcbiAgICBjb25zdCB2b2x1bWVQaWVjZXdpc2VGdW5jdGlvbiA9IHB3Zi52b2x1bWVcclxuXHJcbiAgICB2b2x1bWVQaWVjZXdpc2VGdW5jdGlvbi5zZXROb2Rlcyhub2RlcylcclxuXHJcbiAgICBjb25zdCBzbGljZU5vZGVzID0gbm9kZXMubGVuZ3RoID4gMiA/IG5vZGVzLnNsaWNlKDEsIC0xKSA6IG5vZGVzIC8vIGlmIG1vcmUgdGhhbiAyLCByZW1vdmUgXCJ3aW5kb3dcIiBub2RlcyB3aXRoIHkgPSAwXHJcbiAgICBzbGljZVBpZWNld2lzZUZ1bmN0aW9uLnNldE5vZGVzKHNsaWNlTm9kZXMpXHJcblxyXG4gICAgY29uc29sZS5sb2coc2xpY2VOb2RlcylcclxuXHJcbiAgICBjb250ZXh0LnNlcnZpY2Uuc2VuZCgnUkVOREVSJylcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFwcGx5UGllY2V3aXNlRnVuY3Rpb25cclxuIl0sIm5hbWVzIjpbImFwcGx5UGllY2V3aXNlRnVuY3Rpb24iLCJjb250ZXh0IiwiZXZlbnQiLCJfY29udGV4dCRpbWFnZXMkcGllY2UiLCJuYW1lIiwiZGF0YSIsImNvbXBvbmVudCIsIm5vZGVzIiwiYWN0b3JDb250ZXh0IiwiaW1hZ2VzIiwiZ2V0IiwiaW1hZ2UiLCJwd2YiLCJwaWVjZXdpc2VGdW5jdGlvbnMiLCJzbGljZVBpZWNld2lzZUZ1bmN0aW9uIiwic2xpY2UiLCJ2b2x1bWVQaWVjZXdpc2VGdW5jdGlvbiIsInZvbHVtZSIsInNldE5vZGVzIiwic2xpY2VOb2RlcyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJzZXJ2aWNlIiwic2VuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/Rendering/VTKJS/Images/applyPiecewiseFunction.js\n");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("58c3756aa45895c0b005")
/******/ })();
/******/ 
/******/ }
);