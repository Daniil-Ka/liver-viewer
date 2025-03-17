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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction applyPiecewiseFunction(context, event) {\n  var _context$images$piece;\n  var name = event.data.name;\n  var component = event.data.component;\n  // const range = event.data.range\n  var nodes = event.data.nodes;\n  var actorContext = context.images.actorContext.get(name);\n  var image = actorContext.image;\n  var pwf = (_context$images$piece = context.images.piecewiseFunctions) === null || _context$images$piece === void 0 ? void 0 : _context$images$piece.get(component);\n  if (pwf && image) {\n    var slicePiecewiseFunction = pwf.slice;\n    var volumePiecewiseFunction = pwf.volume;\n    console.log(nodes);\n    var newNodes = [{\n      \"x\": -713.843994140625,\n      \"y\": 0.0,\n      \"midpoint\": 0.5,\n      \"sharpness\": 0\n    }, {\n      \"x\": -653.980712890625,\n      \"y\": 0.2089998424053192,\n      \"midpoint\": 0.5,\n      \"sharpness\": 0\n    }, {\n      \"x\": -640.249267578125,\n      \"y\": 0.28999966382980347,\n      \"midpoint\": 0.5,\n      \"sharpness\": 0\n    }, {\n      \"x\": -590.3348388671875,\n      \"y\": 0.2089998424053192,\n      \"midpoint\": 0.5,\n      \"sharpness\": 0\n    }, {\n      \"x\": -544.6475830078125,\n      \"y\": 0.2089998424053192,\n      \"midpoint\": 0.5,\n      \"sharpness\": 0\n    }, {\n      \"x\": 66.7259521484375,\n      \"y\": 0.0,\n      \"midpoint\": 0.5,\n      \"sharpness\": 0\n    }, {\n      \"x\": 84.34326171875,\n      \"y\": 0.18899966776371002,\n      \"midpoint\": 0.5,\n      \"sharpness\": 0\n    }, {\n      \"x\": 366.8341064453125,\n      \"y\": 0.6449999213218689,\n      \"midpoint\": 0.5,\n      \"sharpness\": 0\n    }, {\n      \"x\": 1585.4342041015625,\n      \"y\": 0.7889997959136963,\n      \"midpoint\": 0.5,\n      \"sharpness\": 0\n    }];\n    volumePiecewiseFunction.setNodes(newNodes);\n    var sliceNodes = newNodes.length > 2 ? newNodes.slice(1, -1) : newNodes; // if more than 2, remove \"window\" nodes with y = 0\n\n    slicePiecewiseFunction.setNodes(sliceNodes);\n    context.service.send('RENDER');\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (applyPiecewiseFunction);\n\n//# sourceURL=webpack://itkVtkViewer/./src/Rendering/VTKJS/Images/applyPiecewiseFunction.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6bc5d776578b1029220f")
/******/ })();
/******/ 
/******/ }
);