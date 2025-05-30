/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 506:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

eval("/* harmony import */ var _styles_panel_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(719);\n/* harmony import */ var _styles_ai_analysis_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(908);\n// 🧪 panel.css + ai-analysis.css 테스트\n // ✅ 작동 확인됨\n // ⭐ 새로 추가\n// import './styles/contrast.css';     // ⭐ 아직 제외\n\nconsole.log('🚀 UDL 스크립트 로드됨 (panel.css + ai-analysis.css)');\n\n// 🚀 간단한 실행 함수\nfunction initUDLTool() {\n  console.log('🔥 UDL 실행! (panel.css + ai-analysis.css)');\n\n  // 기존 패널 제거\n  var existing = document.getElementById('udl-test-panel');\n  if (existing) existing.remove();\n\n  // 간단한 패널 생성\n  var panel = document.createElement('div');\n  panel.id = 'udl-test-panel';\n  panel.style.cssText = \"\\n        position: fixed; top: 20px; right: 20px; width: 300px; height: 150px;\\n        background: #667eea; color: white; padding: 20px; border-radius: 10px;\\n        z-index: 999999; font-family: Arial, sans-serif;\\n    \";\n  panel.innerHTML = \"\\n        <h3>\\u2705 ai-analysis.css \\uCD94\\uAC00 \\uD14C\\uC2A4\\uD2B8!</h3>\\n        <p>panel.css + ai-analysis.css \\uB85C\\uB4DC \\uC0C1\\uD0DC\\uC785\\uB2C8\\uB2E4.</p>\\n        <button onclick=\\\"this.parentElement.remove()\\\" style=\\\"\\n            background: white; color: #667eea; border: none;\\n            padding: 5px 10px; border-radius: 5px; cursor: pointer;\\n        \\\">\\uB2EB\\uAE30</button>\\n    \";\n  document.body.appendChild(panel);\n  alert('🎉 ai-analysis.css 추가 버전이 실행되었습니다!');\n}\n\n// 전역 등록\nwindow.initUDLTool = initUDLTool;\nwindow.UDL = {\n  init: initUDLTool\n};\n\n// 즉시 실행\ninitUDLTool();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTA2LmpzIiwibWFwcGluZ3MiOiI7O0FBQUE7QUFDNEIsQ0FBVztBQUNMLENBQUs7QUFDdkM7O0FBRUFBLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLCtDQUErQyxDQUFDOztBQUU1RDtBQUNBLFNBQVNDLFdBQVdBLENBQUEsRUFBRztFQUNuQkYsT0FBTyxDQUFDQyxHQUFHLENBQUMsMENBQTBDLENBQUM7O0VBRXZEO0VBQ0EsSUFBTUUsUUFBUSxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztFQUMxRCxJQUFJRixRQUFRLEVBQUVBLFFBQVEsQ0FBQ0csTUFBTSxDQUFDLENBQUM7O0VBRS9CO0VBQ0EsSUFBTUMsS0FBSyxHQUFHSCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDM0NELEtBQUssQ0FBQ0UsRUFBRSxHQUFHLGdCQUFnQjtFQUMzQkYsS0FBSyxDQUFDRyxLQUFLLENBQUNDLE9BQU8sb09BSWxCO0VBQ0RKLEtBQUssQ0FBQ0ssU0FBUyxxWkFPZDtFQUVEUixRQUFRLENBQUNTLElBQUksQ0FBQ0MsV0FBVyxDQUFDUCxLQUFLLENBQUM7RUFDaENRLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQztBQUMvQzs7QUFFQTtBQUNBQyxNQUFNLENBQUNkLFdBQVcsR0FBR0EsV0FBVztBQUNoQ2MsTUFBTSxDQUFDQyxHQUFHLEdBQUc7RUFBRUMsSUFBSSxFQUFFaEI7QUFBWSxDQUFDOztBQUVsQztBQUNBQSxXQUFXLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3VkbC8uL3NyYy9tYWluLmpzPzU2ZDciXSwic291cmNlc0NvbnRlbnQiOlsiLy8g8J+nqiBwYW5lbC5jc3MgKyBhaS1hbmFseXNpcy5jc3Mg7YWM7Iqk7Yq4XHJcbmltcG9ydCAnLi9zdHlsZXMvcGFuZWwuY3NzJzsgICAgICAgICAgIC8vIOKchSDsnpHrj5kg7ZmV7J2465CoXHJcbmltcG9ydCAnLi9zdHlsZXMvYWktYW5hbHlzaXMuY3NzJzsgICAgIC8vIOKtkCDsg4jroZwg7LaU6rCAXHJcbi8vIGltcG9ydCAnLi9zdHlsZXMvY29udHJhc3QuY3NzJzsgICAgIC8vIOKtkCDslYTsp4Eg7KCc7Jm4XHJcblxyXG5jb25zb2xlLmxvZygn8J+agCBVREwg7Iqk7YGs66a97Yq4IOuhnOuTnOuQqCAocGFuZWwuY3NzICsgYWktYW5hbHlzaXMuY3NzKScpO1xyXG5cclxuLy8g8J+agCDqsITri6jtlZwg7Iuk7ZaJIO2VqOyImFxyXG5mdW5jdGlvbiBpbml0VURMVG9vbCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCfwn5SlIFVETCDsi6TtlokhIChwYW5lbC5jc3MgKyBhaS1hbmFseXNpcy5jc3MpJyk7XHJcbiAgICBcclxuICAgIC8vIOq4sOyhtCDtjKjrhJAg7KCc6rGwXHJcbiAgICBjb25zdCBleGlzdGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1ZGwtdGVzdC1wYW5lbCcpO1xyXG4gICAgaWYgKGV4aXN0aW5nKSBleGlzdGluZy5yZW1vdmUoKTtcclxuXHJcbiAgICAvLyDqsITri6jtlZwg7Yyo64SQIOyDneyEsVxyXG4gICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHBhbmVsLmlkID0gJ3VkbC10ZXN0LXBhbmVsJztcclxuICAgIHBhbmVsLnN0eWxlLmNzc1RleHQgPSBgXHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkOyB0b3A6IDIwcHg7IHJpZ2h0OiAyMHB4OyB3aWR0aDogMzAwcHg7IGhlaWdodDogMTUwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogIzY2N2VlYTsgY29sb3I6IHdoaXRlOyBwYWRkaW5nOiAyMHB4OyBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgICAgIHotaW5kZXg6IDk5OTk5OTsgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xyXG4gICAgYDtcclxuICAgIHBhbmVsLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8aDM+4pyFIGFpLWFuYWx5c2lzLmNzcyDstpTqsIAg7YWM7Iqk7Yq4ITwvaDM+XHJcbiAgICAgICAgPHA+cGFuZWwuY3NzICsgYWktYW5hbHlzaXMuY3NzIOuhnOuTnCDsg4Htg5zsnoXri4jri6QuPC9wPlxyXG4gICAgICAgIDxidXR0b24gb25jbGljaz1cInRoaXMucGFyZW50RWxlbWVudC5yZW1vdmUoKVwiIHN0eWxlPVwiXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHdoaXRlOyBjb2xvcjogIzY2N2VlYTsgYm9yZGVyOiBub25lO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiA1cHggMTBweDsgYm9yZGVyLXJhZGl1czogNXB4OyBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgXCI+64ur6riwPC9idXR0b24+XHJcbiAgICBgO1xyXG4gICAgXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBhbmVsKTtcclxuICAgIGFsZXJ0KCfwn46JIGFpLWFuYWx5c2lzLmNzcyDstpTqsIAg67KE7KCE7J20IOyLpO2WieuQmOyXiOyKteuLiOuLpCEnKTtcclxufVxyXG5cclxuLy8g7KCE7JetIOuTseuhnVxyXG53aW5kb3cuaW5pdFVETFRvb2wgPSBpbml0VURMVG9vbDtcclxud2luZG93LlVETCA9IHsgaW5pdDogaW5pdFVETFRvb2wgfTtcclxuXHJcbi8vIOymieyLnCDsi6TtlolcclxuaW5pdFVETFRvb2woKTtcclxuIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJpbml0VURMVG9vbCIsImV4aXN0aW5nIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbW92ZSIsInBhbmVsIiwiY3JlYXRlRWxlbWVudCIsImlkIiwic3R5bGUiLCJjc3NUZXh0IiwiaW5uZXJIVE1MIiwiYm9keSIsImFwcGVuZENoaWxkIiwiYWxlcnQiLCJ3aW5kb3ciLCJVREwiLCJpbml0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///506\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			792: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkudl"] = self["webpackChunkudl"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [432], () => (__webpack_require__(506)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;