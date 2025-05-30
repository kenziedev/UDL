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

eval("/* harmony import */ var _styles_panel_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(719);\n/* harmony import */ var _styles_ai_analysis_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(908);\n/* harmony import */ var _styles_contrast_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(439);\n// 🧪 경량화된 모든 CSS 테스트\n // ✅ 경량화됨 (695줄 → 140줄)\n // ✅ 전역 리셋 제거됨\n // ✅ 경량화됨 (664줄 → 180줄)\n\nconsole.log('🚀 UDL 스크립트 로드됨 (모든 CSS 경량화)');\n\n// 🚀 간단한 실행 함수\nfunction initUDLTool() {\n  console.log('🔥 UDL 실행! (모든 CSS 경량화)');\n\n  // 기존 패널 제거\n  var existing = document.getElementById('udl-test-panel');\n  if (existing) existing.remove();\n\n  // 간단한 패널 생성\n  var panel = document.createElement('div');\n  panel.id = 'udl-test-panel';\n  panel.style.cssText = \"\\n        position: fixed; top: 20px; right: 20px; width: 350px; height: 180px;\\n        background: #28a745; color: white; padding: 20px; border-radius: 10px;\\n        z-index: 999999; font-family: Arial, sans-serif;\\n    \";\n  panel.innerHTML = \"\\n        <h3>\\uD83C\\uDF89 \\uC804\\uCCB4 CSS \\uACBD\\uB7C9\\uD654 \\uC131\\uACF5!</h3>\\n        <p><strong>\\u2705 panel.css:</strong> 695\\uC904 \\u2192 140\\uC904</p>\\n        <p><strong>\\u2705 ai-analysis.css:</strong> \\uC804\\uC5ED \\uB9AC\\uC14B \\uC81C\\uAC70</p>\\n        <p><strong>\\u2705 contrast.css:</strong> 664\\uC904 \\u2192 180\\uC904</p>\\n        <button onclick=\\\"this.parentElement.remove()\\\" style=\\\"\\n            background: white; color: #28a745; border: none;\\n            padding: 5px 10px; border-radius: 5px; cursor: pointer;\\n            margin-top: 10px;\\n        \\\">\\uB2EB\\uAE30</button>\\n    \";\n  document.body.appendChild(panel);\n  alert('🎉 모든 CSS 경량화 완료! UDL 도구가 실행되었습니다!');\n}\n\n// 전역 등록\nwindow.initUDLTool = initUDLTool;\nwindow.UDL = {\n  init: initUDLTool\n};\n\n// 즉시 실행\ninitUDLTool();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTA2LmpzIiwibWFwcGluZ3MiOiI7OztBQUFBO0FBQzRCLENBQVc7QUFDTCxDQUFLO0FBQ1IsQ0FBTzs7QUFFdENBLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDhCQUE4QixDQUFDOztBQUUzQztBQUNBLFNBQVNDLFdBQVdBLENBQUEsRUFBRztFQUNuQkYsT0FBTyxDQUFDQyxHQUFHLENBQUMseUJBQXlCLENBQUM7O0VBRXRDO0VBQ0EsSUFBTUUsUUFBUSxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztFQUMxRCxJQUFJRixRQUFRLEVBQUVBLFFBQVEsQ0FBQ0csTUFBTSxDQUFDLENBQUM7O0VBRS9CO0VBQ0EsSUFBTUMsS0FBSyxHQUFHSCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDM0NELEtBQUssQ0FBQ0UsRUFBRSxHQUFHLGdCQUFnQjtFQUMzQkYsS0FBSyxDQUFDRyxLQUFLLENBQUNDLE9BQU8sb09BSWxCO0VBQ0RKLEtBQUssQ0FBQ0ssU0FBUyxpbUJBVWQ7RUFFRFIsUUFBUSxDQUFDUyxJQUFJLENBQUNDLFdBQVcsQ0FBQ1AsS0FBSyxDQUFDO0VBQ2hDUSxLQUFLLENBQUMsb0NBQW9DLENBQUM7QUFDL0M7O0FBRUE7QUFDQUMsTUFBTSxDQUFDZCxXQUFXLEdBQUdBLFdBQVc7QUFDaENjLE1BQU0sQ0FBQ0MsR0FBRyxHQUFHO0VBQUVDLElBQUksRUFBRWhCO0FBQVksQ0FBQzs7QUFFbEM7QUFDQUEsV0FBVyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91ZGwvLi9zcmMvbWFpbi5qcz81NmQ3Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIPCfp6og6rK965+J7ZmU65CcIOuqqOuToCBDU1Mg7YWM7Iqk7Yq4XHJcbmltcG9ydCAnLi9zdHlsZXMvcGFuZWwuY3NzJzsgICAgICAgICAgIC8vIOKchSDqsr3rn4ntmZTrkKggKDY5NeykhCDihpIgMTQw7KSEKVxyXG5pbXBvcnQgJy4vc3R5bGVzL2FpLWFuYWx5c2lzLmNzcyc7ICAgICAvLyDinIUg7KCE7JetIOumrOyFiyDsoJzqsbDrkKhcclxuaW1wb3J0ICcuL3N0eWxlcy9jb250cmFzdC5jc3MnOyAgICAgICAvLyDinIUg6rK965+J7ZmU65CoICg2NjTspIQg4oaSIDE4MOykhClcclxuXHJcbmNvbnNvbGUubG9nKCfwn5qAIFVETCDsiqTtgazrpr3tirgg66Gc65Oc65CoICjrqqjrk6AgQ1NTIOqyveufie2ZlCknKTtcclxuXHJcbi8vIPCfmoAg6rCE64uo7ZWcIOyLpO2WiSDtlajsiJhcclxuZnVuY3Rpb24gaW5pdFVETFRvb2woKSB7XHJcbiAgICBjb25zb2xlLmxvZygn8J+UpSBVREwg7Iuk7ZaJISAo66qo65OgIENTUyDqsr3rn4ntmZQpJyk7XHJcbiAgICBcclxuICAgIC8vIOq4sOyhtCDtjKjrhJAg7KCc6rGwXHJcbiAgICBjb25zdCBleGlzdGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1ZGwtdGVzdC1wYW5lbCcpO1xyXG4gICAgaWYgKGV4aXN0aW5nKSBleGlzdGluZy5yZW1vdmUoKTtcclxuXHJcbiAgICAvLyDqsITri6jtlZwg7Yyo64SQIOyDneyEsVxyXG4gICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHBhbmVsLmlkID0gJ3VkbC10ZXN0LXBhbmVsJztcclxuICAgIHBhbmVsLnN0eWxlLmNzc1RleHQgPSBgXHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkOyB0b3A6IDIwcHg7IHJpZ2h0OiAyMHB4OyB3aWR0aDogMzUwcHg7IGhlaWdodDogMTgwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogIzI4YTc0NTsgY29sb3I6IHdoaXRlOyBwYWRkaW5nOiAyMHB4OyBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgICAgIHotaW5kZXg6IDk5OTk5OTsgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xyXG4gICAgYDtcclxuICAgIHBhbmVsLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8aDM+8J+OiSDsoITssrQgQ1NTIOqyveufie2ZlCDshLHqs7UhPC9oMz5cclxuICAgICAgICA8cD48c3Ryb25nPuKchSBwYW5lbC5jc3M6PC9zdHJvbmc+IDY5NeykhCDihpIgMTQw7KSEPC9wPlxyXG4gICAgICAgIDxwPjxzdHJvbmc+4pyFIGFpLWFuYWx5c2lzLmNzczo8L3N0cm9uZz4g7KCE7JetIOumrOyFiyDsoJzqsbA8L3A+XHJcbiAgICAgICAgPHA+PHN0cm9uZz7inIUgY29udHJhc3QuY3NzOjwvc3Ryb25nPiA2NjTspIQg4oaSIDE4MOykhDwvcD5cclxuICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJ0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlKClcIiBzdHlsZT1cIlxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsgY29sb3I6ICMyOGE3NDU7IGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7IGJvcmRlci1yYWRpdXM6IDVweDsgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgICAgIFwiPuuLq+q4sDwvYnV0dG9uPlxyXG4gICAgYDtcclxuICAgIFxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYW5lbCk7XHJcbiAgICBhbGVydCgn8J+OiSDrqqjrk6AgQ1NTIOqyveufie2ZlCDsmYTro4whIFVETCDrj4TqtazqsIAg7Iuk7ZaJ65CY7JeI7Iq164uI64ukIScpO1xyXG59XHJcblxyXG4vLyDsoITsl60g65Ox66GdXHJcbndpbmRvdy5pbml0VURMVG9vbCA9IGluaXRVRExUb29sO1xyXG53aW5kb3cuVURMID0geyBpbml0OiBpbml0VURMVG9vbCB9O1xyXG5cclxuLy8g7KaJ7IucIOyLpO2WiVxyXG5pbml0VURMVG9vbCgpO1xyXG4iXSwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsImluaXRVRExUb29sIiwiZXhpc3RpbmciLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlIiwicGFuZWwiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJzdHlsZSIsImNzc1RleHQiLCJpbm5lckhUTUwiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJhbGVydCIsIndpbmRvdyIsIlVETCIsImluaXQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///506\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [562], () => (__webpack_require__(506)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;