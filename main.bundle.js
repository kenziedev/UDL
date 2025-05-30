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

eval("/* harmony import */ var _styles_panel_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(719);\n// 🧪 panel.css만 테스트\n // ⭐ panel.css만 추가\n// import './styles/ai-analysis.css'; // ⭐ 제외\n// import './styles/contrast.css';   // ⭐ 제외\n\nconsole.log('🚀 UDL 스크립트 로드됨 (panel.css만)');\n\n// 🚀 간단한 실행 함수\nfunction initUDLTool() {\n  console.log('🔥 UDL 실행! (panel.css만)');\n\n  // 기존 패널 제거\n  var existing = document.getElementById('udl-test-panel');\n  if (existing) existing.remove();\n\n  // 간단한 패널 생성\n  var panel = document.createElement('div');\n  panel.id = 'udl-test-panel';\n  panel.style.cssText = \"\\n        position: fixed; top: 20px; right: 20px; width: 300px; height: 150px;\\n        background: #667eea; color: white; padding: 20px; border-radius: 10px;\\n        z-index: 999999; font-family: Arial, sans-serif;\\n    \";\n  panel.innerHTML = \"\\n        <h3>\\u2705 panel.css \\uD14C\\uC2A4\\uD2B8!</h3>\\n        <p>panel.css\\uB9CC \\uB85C\\uB4DC\\uB41C \\uC0C1\\uD0DC\\uC785\\uB2C8\\uB2E4.</p>\\n        <button onclick=\\\"this.parentElement.remove()\\\" style=\\\"\\n            background: white; color: #667eea; border: none;\\n            padding: 5px 10px; border-radius: 5px; cursor: pointer;\\n        \\\">\\uB2EB\\uAE30</button>\\n    \";\n  document.body.appendChild(panel);\n  alert('🎉 panel.css 포함 버전이 실행되었습니다!');\n}\n\n// 전역 등록\nwindow.initUDLTool = initUDLTool;\nwindow.UDL = {\n  init: initUDLTool\n};\n\n// 즉시 실행\ninitUDLTool();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTA2LmpzIiwibWFwcGluZ3MiOiI7QUFBQTtBQUM0QixDQUFXO0FBQ3ZDO0FBQ0E7O0FBRUFBLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDhCQUE4QixDQUFDOztBQUUzQztBQUNBLFNBQVNDLFdBQVdBLENBQUEsRUFBRztFQUNuQkYsT0FBTyxDQUFDQyxHQUFHLENBQUMseUJBQXlCLENBQUM7O0VBRXRDO0VBQ0EsSUFBTUUsUUFBUSxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztFQUMxRCxJQUFJRixRQUFRLEVBQUVBLFFBQVEsQ0FBQ0csTUFBTSxDQUFDLENBQUM7O0VBRS9CO0VBQ0EsSUFBTUMsS0FBSyxHQUFHSCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDM0NELEtBQUssQ0FBQ0UsRUFBRSxHQUFHLGdCQUFnQjtFQUMzQkYsS0FBSyxDQUFDRyxLQUFLLENBQUNDLE9BQU8sb09BSWxCO0VBQ0RKLEtBQUssQ0FBQ0ssU0FBUyw0WEFPZDtFQUVEUixRQUFRLENBQUNTLElBQUksQ0FBQ0MsV0FBVyxDQUFDUCxLQUFLLENBQUM7RUFDaENRLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQztBQUN6Qzs7QUFFQTtBQUNBQyxNQUFNLENBQUNkLFdBQVcsR0FBR0EsV0FBVztBQUNoQ2MsTUFBTSxDQUFDQyxHQUFHLEdBQUc7RUFBRUMsSUFBSSxFQUFFaEI7QUFBWSxDQUFDOztBQUVsQztBQUNBQSxXQUFXLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3VkbC8uL3NyYy9tYWluLmpzPzU2ZDciXSwic291cmNlc0NvbnRlbnQiOlsiLy8g8J+nqiBwYW5lbC5jc3Prp4wg7YWM7Iqk7Yq4XHJcbmltcG9ydCAnLi9zdHlsZXMvcGFuZWwuY3NzJzsgICAgICAgICAgIC8vIOKtkCBwYW5lbC5jc3Prp4wg7LaU6rCAXHJcbi8vIGltcG9ydCAnLi9zdHlsZXMvYWktYW5hbHlzaXMuY3NzJzsgLy8g4q2QIOygnOyZuFxyXG4vLyBpbXBvcnQgJy4vc3R5bGVzL2NvbnRyYXN0LmNzcyc7ICAgLy8g4q2QIOygnOyZuFxyXG5cclxuY29uc29sZS5sb2coJ/CfmoAgVURMIOyKpO2BrOumve2KuCDroZzrk5zrkKggKHBhbmVsLmNzc+unjCknKTtcclxuXHJcbi8vIPCfmoAg6rCE64uo7ZWcIOyLpO2WiSDtlajsiJhcclxuZnVuY3Rpb24gaW5pdFVETFRvb2woKSB7XHJcbiAgICBjb25zb2xlLmxvZygn8J+UpSBVREwg7Iuk7ZaJISAocGFuZWwuY3Nz66eMKScpO1xyXG4gICAgXHJcbiAgICAvLyDquLDsobQg7Yyo64SQIOygnOqxsFxyXG4gICAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndWRsLXRlc3QtcGFuZWwnKTtcclxuICAgIGlmIChleGlzdGluZykgZXhpc3RpbmcucmVtb3ZlKCk7XHJcblxyXG4gICAgLy8g6rCE64uo7ZWcIO2MqOuEkCDsg53shLFcclxuICAgIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBwYW5lbC5pZCA9ICd1ZGwtdGVzdC1wYW5lbCc7XHJcbiAgICBwYW5lbC5zdHlsZS5jc3NUZXh0ID0gYFxyXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDsgdG9wOiAyMHB4OyByaWdodDogMjBweDsgd2lkdGg6IDMwMHB4OyBoZWlnaHQ6IDE1MHB4O1xyXG4gICAgICAgIGJhY2tncm91bmQ6ICM2NjdlZWE7IGNvbG9yOiB3aGl0ZTsgcGFkZGluZzogMjBweDsgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgICAgICB6LWluZGV4OiA5OTk5OTk7IGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICAgIGA7XHJcbiAgICBwYW5lbC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGgzPuKchSBwYW5lbC5jc3Mg7YWM7Iqk7Yq4ITwvaDM+XHJcbiAgICAgICAgPHA+cGFuZWwuY3Nz66eMIOuhnOuTnOuQnCDsg4Htg5zsnoXri4jri6QuPC9wPlxyXG4gICAgICAgIDxidXR0b24gb25jbGljaz1cInRoaXMucGFyZW50RWxlbWVudC5yZW1vdmUoKVwiIHN0eWxlPVwiXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHdoaXRlOyBjb2xvcjogIzY2N2VlYTsgYm9yZGVyOiBub25lO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiA1cHggMTBweDsgYm9yZGVyLXJhZGl1czogNXB4OyBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgXCI+64ur6riwPC9idXR0b24+XHJcbiAgICBgO1xyXG4gICAgXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHBhbmVsKTtcclxuICAgIGFsZXJ0KCfwn46JIHBhbmVsLmNzcyDtj6ztlagg67KE7KCE7J20IOyLpO2WieuQmOyXiOyKteuLiOuLpCEnKTtcclxufVxyXG5cclxuLy8g7KCE7JetIOuTseuhnVxyXG53aW5kb3cuaW5pdFVETFRvb2wgPSBpbml0VURMVG9vbDtcclxud2luZG93LlVETCA9IHsgaW5pdDogaW5pdFVETFRvb2wgfTtcclxuXHJcbi8vIOymieyLnCDsi6TtlolcclxuaW5pdFVETFRvb2woKTtcclxuIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJpbml0VURMVG9vbCIsImV4aXN0aW5nIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbW92ZSIsInBhbmVsIiwiY3JlYXRlRWxlbWVudCIsImlkIiwic3R5bGUiLCJjc3NUZXh0IiwiaW5uZXJIVE1MIiwiYm9keSIsImFwcGVuZENoaWxkIiwiYWxlcnQiLCJ3aW5kb3ciLCJVREwiLCJpbml0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///506\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [719], () => (__webpack_require__(506)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;