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

eval("/* harmony import */ var _styles_panel_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(719);\n/* harmony import */ var _styles_ai_analysis_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(908);\n/* harmony import */ var _styles_contrast_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(439);\n// 🧪 경량화된 CSS 재추가 테스트\n // ✅ 경량화됨 (140줄)\n // ✅ 전역 리셋 제거됨\n // ✅ 경량화됨 (212줄)\n\nconsole.log('🚀 UDL 스크립트 로드됨 (경량화된 CSS 재추가)');\n\n// 🚀 간단한 실행 함수\nfunction initUDLTool() {\n  console.log('🔥 UDL 실행! (경량화된 CSS 재추가)');\n\n  // 기존 패널 제거\n  var existing = document.getElementById('udl-test-panel');\n  if (existing) existing.remove();\n\n  // 간단한 패널 생성\n  var panel = document.createElement('div');\n  panel.id = 'udl-test-panel';\n  panel.style.cssText = \"\\n        position: fixed; top: 20px; right: 20px; width: 350px; height: 180px;\\n        background: #6f42c1; color: white; padding: 20px; border-radius: 10px;\\n        z-index: 999999; font-family: Arial, sans-serif; border: 2px solid white;\\n    \";\n  panel.innerHTML = \"\\n        <h3>\\uD83C\\uDFA8 CSS \\uC7AC\\uCD94\\uAC00 \\uD14C\\uC2A4\\uD2B8!</h3>\\n        <p><strong>\\u2705 \\uC21C\\uC218 JS:</strong> \\uC791\\uB3D9 \\uD655\\uC778\\uB428</p>\\n        <p><strong>\\uD83E\\uDDEA \\uD604\\uC7AC:</strong> \\uACBD\\uB7C9\\uD654\\uB41C CSS \\uCD94\\uAC00\\uB428</p>\\n        <p><strong>\\uC774\\uAC83\\uC774 \\uB728\\uBA74:</strong> CSS\\uB294 \\uBB38\\uC81C\\uC5C6\\uC74C, JS \\uBAA8\\uB4C8\\uC774 \\uBC94\\uC778!</p>\\n        <button onclick=\\\"this.parentElement.remove()\\\" style=\\\"\\n            background: white; color: #6f42c1; border: none;\\n            padding: 5px 10px; border-radius: 5px; cursor: pointer;\\n            margin-top: 10px;\\n        \\\">\\uB2EB\\uAE30</button>\\n    \";\n  document.body.appendChild(panel);\n  alert('🎨 경량화된 CSS 재추가 테스트!');\n}\n\n// 전역 등록\nwindow.initUDLTool = initUDLTool;\nwindow.UDL = {\n  init: initUDLTool\n};\n\n// 즉시 실행\ninitUDLTool();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTA2LmpzIiwibWFwcGluZ3MiOiI7OztBQUFBO0FBQzRCLENBQVc7QUFDTCxDQUFLO0FBQ1IsQ0FBTzs7QUFFdENBLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGdDQUFnQyxDQUFDOztBQUU3QztBQUNBLFNBQVNDLFdBQVdBLENBQUEsRUFBRztFQUNuQkYsT0FBTyxDQUFDQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7O0VBRXhDO0VBQ0EsSUFBTUUsUUFBUSxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztFQUMxRCxJQUFJRixRQUFRLEVBQUVBLFFBQVEsQ0FBQ0csTUFBTSxDQUFDLENBQUM7O0VBRS9CO0VBQ0EsSUFBTUMsS0FBSyxHQUFHSCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDM0NELEtBQUssQ0FBQ0UsRUFBRSxHQUFHLGdCQUFnQjtFQUMzQkYsS0FBSyxDQUFDRyxLQUFLLENBQUNDLE9BQU8sNlBBSWxCO0VBQ0RKLEtBQUssQ0FBQ0ssU0FBUywwcUJBVWQ7RUFFRFIsUUFBUSxDQUFDUyxJQUFJLENBQUNDLFdBQVcsQ0FBQ1AsS0FBSyxDQUFDO0VBQ2hDUSxLQUFLLENBQUMsc0JBQXNCLENBQUM7QUFDakM7O0FBRUE7QUFDQUMsTUFBTSxDQUFDZCxXQUFXLEdBQUdBLFdBQVc7QUFDaENjLE1BQU0sQ0FBQ0MsR0FBRyxHQUFHO0VBQUVDLElBQUksRUFBRWhCO0FBQVksQ0FBQzs7QUFFbEM7QUFDQUEsV0FBVyxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91ZGwvLi9zcmMvbWFpbi5qcz81NmQ3Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIPCfp6og6rK965+J7ZmU65CcIENTUyDsnqzstpTqsIAg7YWM7Iqk7Yq4XHJcbmltcG9ydCAnLi9zdHlsZXMvcGFuZWwuY3NzJzsgICAgICAgICAgIC8vIOKchSDqsr3rn4ntmZTrkKggKDE0MOykhClcclxuaW1wb3J0ICcuL3N0eWxlcy9haS1hbmFseXNpcy5jc3MnOyAgICAgLy8g4pyFIOyghOyXrSDrpqzshYsg7KCc6rGw65CoXHJcbmltcG9ydCAnLi9zdHlsZXMvY29udHJhc3QuY3NzJzsgICAgICAgLy8g4pyFIOqyveufie2ZlOuQqCAoMjEy7KSEKVxyXG5cclxuY29uc29sZS5sb2coJ/CfmoAgVURMIOyKpO2BrOumve2KuCDroZzrk5zrkKggKOqyveufie2ZlOuQnCBDU1Mg7J6s7LaU6rCAKScpO1xyXG5cclxuLy8g8J+agCDqsITri6jtlZwg7Iuk7ZaJIO2VqOyImFxyXG5mdW5jdGlvbiBpbml0VURMVG9vbCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCfwn5SlIFVETCDsi6TtlokhICjqsr3rn4ntmZTrkJwgQ1NTIOyerOy2lOqwgCknKTtcclxuICAgIFxyXG4gICAgLy8g6riw7KG0IO2MqOuEkCDsoJzqsbBcclxuICAgIGNvbnN0IGV4aXN0aW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VkbC10ZXN0LXBhbmVsJyk7XHJcbiAgICBpZiAoZXhpc3RpbmcpIGV4aXN0aW5nLnJlbW92ZSgpO1xyXG5cclxuICAgIC8vIOqwhOuLqO2VnCDtjKjrhJAg7IOd7ISxXHJcbiAgICBjb25zdCBwYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcGFuZWwuaWQgPSAndWRsLXRlc3QtcGFuZWwnO1xyXG4gICAgcGFuZWwuc3R5bGUuY3NzVGV4dCA9IGBcclxuICAgICAgICBwb3NpdGlvbjogZml4ZWQ7IHRvcDogMjBweDsgcmlnaHQ6IDIwcHg7IHdpZHRoOiAzNTBweDsgaGVpZ2h0OiAxODBweDtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjNmY0MmMxOyBjb2xvcjogd2hpdGU7IHBhZGRpbmc6IDIwcHg7IGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICAgICAgei1pbmRleDogOTk5OTk5OyBmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7IGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlO1xyXG4gICAgYDtcclxuICAgIHBhbmVsLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8aDM+8J+OqCBDU1Mg7J6s7LaU6rCAIO2FjOyKpO2KuCE8L2gzPlxyXG4gICAgICAgIDxwPjxzdHJvbmc+4pyFIOyInOyImCBKUzo8L3N0cm9uZz4g7J6R64+ZIO2ZleyduOuQqDwvcD5cclxuICAgICAgICA8cD48c3Ryb25nPvCfp6og7ZiE7J6sOjwvc3Ryb25nPiDqsr3rn4ntmZTrkJwgQ1NTIOy2lOqwgOuQqDwvcD5cclxuICAgICAgICA8cD48c3Ryb25nPuydtOqyg+ydtCDrnKjrqbQ6PC9zdHJvbmc+IENTU+uKlCDrrLjsoJzsl4bsnYwsIEpTIOuqqOuTiOydtCDrspTsnbghPC9wPlxyXG4gICAgICAgIDxidXR0b24gb25jbGljaz1cInRoaXMucGFyZW50RWxlbWVudC5yZW1vdmUoKVwiIHN0eWxlPVwiXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHdoaXRlOyBjb2xvcjogIzZmNDJjMTsgYm9yZGVyOiBub25lO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiA1cHggMTBweDsgYm9yZGVyLXJhZGl1czogNXB4OyBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICAgICAgXCI+64ur6riwPC9idXR0b24+XHJcbiAgICBgO1xyXG4gICAgXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBhbmVsKTtcclxuICAgIGFsZXJ0KCfwn46oIOqyveufie2ZlOuQnCBDU1Mg7J6s7LaU6rCAIO2FjOyKpO2KuCEnKTtcclxufVxyXG5cclxuLy8g7KCE7JetIOuTseuhnVxyXG53aW5kb3cuaW5pdFVETFRvb2wgPSBpbml0VURMVG9vbDtcclxud2luZG93LlVETCA9IHsgaW5pdDogaW5pdFVETFRvb2wgfTtcclxuXHJcbi8vIOymieyLnCDsi6TtlolcclxuaW5pdFVETFRvb2woKTtcclxuIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJpbml0VURMVG9vbCIsImV4aXN0aW5nIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbW92ZSIsInBhbmVsIiwiY3JlYXRlRWxlbWVudCIsImlkIiwic3R5bGUiLCJjc3NUZXh0IiwiaW5uZXJIVE1MIiwiYm9keSIsImFwcGVuZENoaWxkIiwiYWxlcnQiLCJ3aW5kb3ciLCJVREwiLCJpbml0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///506\n");

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