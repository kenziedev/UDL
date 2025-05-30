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

eval("/* harmony import */ var _styles_panel_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(719);\n/* harmony import */ var _styles_ai_analysis_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(908);\n/* harmony import */ var _styles_contrast_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(439);\n// 🧪 CSS만 먼저 테스트\n\n\n\nconsole.log('🚀 UDL 스크립트 로드됨 (CSS 포함)');\n\n// 🚀 간단한 실행 함수\nfunction initUDLTool() {\n  console.log('🔥 UDL 실행! (CSS 포함)');\n\n  // 기존 패널 제거\n  var existing = document.getElementById('udl-test-panel');\n  if (existing) existing.remove();\n\n  // 간단한 패널 생성\n  var panel = document.createElement('div');\n  panel.id = 'udl-test-panel';\n  panel.style.cssText = \"\\n        position: fixed; top: 20px; right: 20px; width: 300px; height: 150px;\\n        background: #667eea; color: white; padding: 20px; border-radius: 10px;\\n        z-index: 999999; font-family: Arial, sans-serif;\\n    \";\n  panel.innerHTML = \"\\n        <h3>\\u2705 CSS \\uD3EC\\uD568 \\uD14C\\uC2A4\\uD2B8 \\uC131\\uACF5!</h3>\\n        <p>CSS \\uD30C\\uC77C\\uB4E4\\uC774 \\uC815\\uC0C1 \\uB85C\\uB4DC\\uB418\\uC5C8\\uC2B5\\uB2C8\\uB2E4.</p>\\n        <button onclick=\\\"this.parentElement.remove()\\\" style=\\\"\\n            background: white; color: #667eea; border: none;\\n            padding: 5px 10px; border-radius: 5px; cursor: pointer;\\n        \\\">\\uB2EB\\uAE30</button>\\n    \";\n  document.body.appendChild(panel);\n  alert('🎉 CSS 포함 버전이 실행되었습니다!');\n}\n\n// 전역 등록\nwindow.initUDLTool = initUDLTool;\nwindow.UDL = {\n  init: initUDLTool\n};\n\n// 즉시 실행\ninitUDLTool();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTA2LmpzIiwibWFwcGluZ3MiOiI7OztBQUFBO0FBQzRCO0FBQ007QUFDSDtBQUUvQkEsT0FBTyxDQUFDQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7O0FBRXZDO0FBQ0EsU0FBU0MsV0FBV0EsQ0FBQSxFQUFHO0VBQ25CRixPQUFPLENBQUNDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQzs7RUFFbEM7RUFDQSxJQUFNRSxRQUFRLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLGdCQUFnQixDQUFDO0VBQzFELElBQUlGLFFBQVEsRUFBRUEsUUFBUSxDQUFDRyxNQUFNLENBQUMsQ0FBQzs7RUFFL0I7RUFDQSxJQUFNQyxLQUFLLEdBQUdILFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMzQ0QsS0FBSyxDQUFDRSxFQUFFLEdBQUcsZ0JBQWdCO0VBQzNCRixLQUFLLENBQUNHLEtBQUssQ0FBQ0MsT0FBTyxvT0FJbEI7RUFDREosS0FBSyxDQUFDSyxTQUFTLG1hQU9kO0VBRURSLFFBQVEsQ0FBQ1MsSUFBSSxDQUFDQyxXQUFXLENBQUNQLEtBQUssQ0FBQztFQUNoQ1EsS0FBSyxDQUFDLHdCQUF3QixDQUFDO0FBQ25DOztBQUVBO0FBQ0FDLE1BQU0sQ0FBQ2QsV0FBVyxHQUFHQSxXQUFXO0FBQ2hDYyxNQUFNLENBQUNDLEdBQUcsR0FBRztFQUFFQyxJQUFJLEVBQUVoQjtBQUFZLENBQUM7O0FBRWxDO0FBQ0FBLFdBQVcsQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdWRsLy4vc3JjL21haW4uanM/NTZkNyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyDwn6eqIENTU+unjCDrqLzsoIAg7YWM7Iqk7Yq4XHJcbmltcG9ydCAnLi9zdHlsZXMvcGFuZWwuY3NzJztcclxuaW1wb3J0ICcuL3N0eWxlcy9haS1hbmFseXNpcy5jc3MnO1xyXG5pbXBvcnQgJy4vc3R5bGVzL2NvbnRyYXN0LmNzcyc7XHJcblxyXG5jb25zb2xlLmxvZygn8J+agCBVREwg7Iqk7YGs66a97Yq4IOuhnOuTnOuQqCAoQ1NTIO2PrO2VqCknKTtcclxuXHJcbi8vIPCfmoAg6rCE64uo7ZWcIOyLpO2WiSDtlajsiJhcclxuZnVuY3Rpb24gaW5pdFVETFRvb2woKSB7XHJcbiAgICBjb25zb2xlLmxvZygn8J+UpSBVREwg7Iuk7ZaJISAoQ1NTIO2PrO2VqCknKTtcclxuICAgIFxyXG4gICAgLy8g6riw7KG0IO2MqOuEkCDsoJzqsbBcclxuICAgIGNvbnN0IGV4aXN0aW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VkbC10ZXN0LXBhbmVsJyk7XHJcbiAgICBpZiAoZXhpc3RpbmcpIGV4aXN0aW5nLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vIOqwhOuLqO2VnCDtjKjrhJAg7IOd7ISxXHJcbiAgICBjb25zdCBwYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcGFuZWwuaWQgPSAndWRsLXRlc3QtcGFuZWwnO1xyXG4gICAgcGFuZWwuc3R5bGUuY3NzVGV4dCA9IGBcclxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7IHRvcDogMjBweDsgcmlnaHQ6IDIwcHg7IHdpZHRoOiAzMDBweDsgaGVpZ2h0OiAxNTBweDtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjNjY3ZWVhOyBjb2xvcjogd2hpdGU7IHBhZGRpbmc6IDIwcHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICAgICAgei1pbmRleDogOTk5OTk5OyBmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7XHJcbiAgICBgO1xyXG4gICAgcGFuZWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxoMz7inIUgQ1NTIO2PrO2VqCDthYzsiqTtirgg7ISx6rO1ITwvaDM+XHJcbiAgICAgICAgPHA+Q1NTIO2MjOydvOuTpOydtCDsoJXsg4Eg66Gc65Oc65CY7JeI7Iq164uI64ukLjwvcD5cclxuICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJ0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlKClcIiBzdHlsZT1cIlxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsgY29sb3I6ICM2NjdlZWE7IGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7IGJvcmRlci1yYWRpdXM6IDVweDsgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIFwiPuuLq+q4sDwvYnV0dG9uPlxyXG4gICAgYDtcclxuICAgIFxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYW5lbCk7XHJcbiAgICBhbGVydCgn8J+OiSBDU1Mg7Y+s7ZWoIOuyhOyghOydtCDsi6TtlonrkJjsl4jsirXri4jri6QhJyk7XHJcbn1cclxuXHJcbi8vIOyghOyXrSDrk7HroZ1cclxud2luZG93LmluaXRVRExUb29sID0gaW5pdFVETFRvb2w7XHJcbndpbmRvdy5VREwgPSB7IGluaXQ6IGluaXRVRExUb29sIH07XHJcblxyXG4vLyDsponsi5wg7Iuk7ZaJXHJcbmluaXRVRExUb29sKCk7XHJcbiJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiaW5pdFVETFRvb2wiLCJleGlzdGluZyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW1vdmUiLCJwYW5lbCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsInN0eWxlIiwiY3NzVGV4dCIsImlubmVySFRNTCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImFsZXJ0Iiwid2luZG93IiwiVURMIiwiaW5pdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///506\n");

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