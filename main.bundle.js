/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["UDL"] = factory();
	else
		root["UDL"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 506:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _styles_panel_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(719);\n/* harmony import */ var _styles_ai_analysis_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(908);\n/* harmony import */ var _styles_contrast_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(439);\n/* harmony import */ var _core_initPanel_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(888);\n/* harmony import */ var _core_analyzeWCAG_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(813);\n/* harmony import */ var _core_analyzeForAI_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(986);\n/* harmony import */ var _core_chatBot_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(136);\n/* harmony import */ var _constants_KWCAG22_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(682);\n/* harmony import */ var _constants_UDL_PRINCIPLES_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(400);\n// 📄 스타일\n\n\n\n\n// 🧩 핵심 기능\n\n\n\n\n\n// 📚 상수 데이터\n\n\n\n// 🛠️ 유틸리티\n\n\n// 🚀 북마클릿용 즉시 실행 함수\nfunction initUDLTool() {\n  console.log('✅ UDL 웹 접근성 도구 초기화 시작');\n\n  // 이미 패널이 있으면 제거하고 종료\n  if (document.getElementById('udl-accessibility-panel')) {\n    document.getElementById('udl-accessibility-panel').remove();\n    return;\n  }\n  try {\n    // 패널 및 주요 기능 초기화\n    (0,_core_initPanel_js__WEBPACK_IMPORTED_MODULE_3__/* .initPanel */ .h)();\n    (0,_core_chatBot_js__WEBPACK_IMPORTED_MODULE_5__/* .initChat */ .D)();\n    console.log('✅ UDL 도구 초기화 완료');\n  } catch (error) {\n    console.error('❌ UDL 도구 초기화 실패:', error);\n    alert('UDL 도구를 초기화하는 중 오류가 발생했습니다: ' + error.message);\n  }\n}\n\n// 🌍 전역 함수로 등록 (북마클릿 호환성)\nif (typeof window !== 'undefined') {\n  window.initUDLTool = initUDLTool;\n  window.UDL = {\n    init: initUDLTool,\n    initPanel: _core_initPanel_js__WEBPACK_IMPORTED_MODULE_3__/* .initPanel */ .h,\n    analyzeWCAG: _core_analyzeWCAG_js__WEBPACK_IMPORTED_MODULE_4__/* .analyzeWCAG */ .d,\n    analyzeForAI: _core_analyzeForAI_js__WEBPACK_IMPORTED_MODULE_8__/* .analyzeForAI */ .iM,\n    initChat: _core_chatBot_js__WEBPACK_IMPORTED_MODULE_5__/* .initChat */ .D,\n    KWCAG22: _constants_KWCAG22_js__WEBPACK_IMPORTED_MODULE_6__/* .KWCAG22 */ .w,\n    UDL_PRINCIPLES: _constants_UDL_PRINCIPLES_js__WEBPACK_IMPORTED_MODULE_7__/* .UDL_PRINCIPLES */ .E\n  };\n}\n\n// 🚀 북마클릿 자동 실행 - 스크립트 로드 즉시 실행\nif (typeof window !== 'undefined') {\n  // 북마클릿에서는 즉시 실행\n  initUDLTool();\n}\n\n// ES 모듈 export (웹팩 빌드용)\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initUDLTool);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTA2LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUM0QjtBQUNNO0FBQ0g7O0FBRS9CO0FBQ2dEO0FBQ0k7QUFDRTtBQUNUOztBQUU3QztBQUNpRDtBQUNjOztBQUUvRDtBQUNrRTs7QUFFbEU7QUFDQSxTQUFTUSxXQUFXQSxDQUFBLEVBQUc7RUFDbkJDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHVCQUF1QixDQUFDOztFQUVwQztFQUNBLElBQUlDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLHlCQUF5QixDQUFDLEVBQUU7SUFDcERELFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLHlCQUF5QixDQUFDLENBQUNDLE1BQU0sQ0FBQyxDQUFDO0lBQzNEO0VBQ0o7RUFFQSxJQUFJO0lBQ0E7SUFDQWIsc0VBQVMsQ0FBQyxDQUFDO0lBQ1hHLG1FQUFRLENBQUMsQ0FBQztJQUVWTSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztFQUNsQyxDQUFDLENBQUMsT0FBT0ksS0FBSyxFQUFFO0lBQ1pMLE9BQU8sQ0FBQ0ssS0FBSyxDQUFDLGtCQUFrQixFQUFFQSxLQUFLLENBQUM7SUFDeENDLEtBQUssQ0FBQyw4QkFBOEIsR0FBR0QsS0FBSyxDQUFDRSxPQUFPLENBQUM7RUFDekQ7QUFDSjs7QUFFQTtBQUNBLElBQUksT0FBT0MsTUFBTSxLQUFLLFdBQVcsRUFBRTtFQUMvQkEsTUFBTSxDQUFDVCxXQUFXLEdBQUdBLFdBQVc7RUFDaENTLE1BQU0sQ0FBQ0MsR0FBRyxHQUFHO0lBQ1RDLElBQUksRUFBRVgsV0FBVztJQUNqQlIsU0FBUyxFQUFUQSxrRUFBUztJQUNUQyxXQUFXLEVBQVhBLHNFQUFXO0lBQ1hDLFlBQVksRUFBWkEseUVBQVk7SUFDWkMsUUFBUSxFQUFSQSwrREFBUTtJQUNSQyxPQUFPLEVBQVBBLG1FQUFPO0lBQ1BDLGNBQWMsRUFBZEEsaUZBQWNBO0VBQ2xCLENBQUM7QUFDTDs7QUFFQTtBQUNBLElBQUksT0FBT1ksTUFBTSxLQUFLLFdBQVcsRUFBRTtFQUMvQjtFQUNBVCxXQUFXLENBQUMsQ0FBQztBQUNqQjs7QUFFQTtBQUNBLGlFQUFlQSxXQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vVURMLy4vc3JjL21haW4uanM/NTZkNyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyDwn5OEIOyKpO2DgOydvFxyXG5pbXBvcnQgJy4vc3R5bGVzL3BhbmVsLmNzcyc7XHJcbmltcG9ydCAnLi9zdHlsZXMvYWktYW5hbHlzaXMuY3NzJztcclxuaW1wb3J0ICcuL3N0eWxlcy9jb250cmFzdC5jc3MnO1xyXG5cclxuLy8g8J+nqSDtlbXsi6wg6riw64qlXHJcbmltcG9ydCB7IGluaXRQYW5lbCB9IGZyb20gJy4vY29yZS9pbml0UGFuZWwuanMnO1xyXG5pbXBvcnQgeyBhbmFseXplV0NBRyB9IGZyb20gJy4vY29yZS9hbmFseXplV0NBRy5qcyc7XHJcbmltcG9ydCB7IGFuYWx5emVGb3JBSSB9IGZyb20gJy4vY29yZS9hbmFseXplRm9yQUkuanMnO1xyXG5pbXBvcnQgeyBpbml0Q2hhdCB9IGZyb20gJy4vY29yZS9jaGF0Qm90LmpzJztcclxuXHJcbi8vIPCfk5og7IOB7IiYIOuNsOydtO2EsFxyXG5pbXBvcnQgeyBLV0NBRzIyIH0gZnJvbSAnLi9jb25zdGFudHMvS1dDQUcyMi5qcyc7XHJcbmltcG9ydCB7IFVETF9QUklOQ0lQTEVTIH0gZnJvbSAnLi9jb25zdGFudHMvVURMX1BSSU5DSVBMRVMuanMnO1xyXG5cclxuLy8g8J+boO+4jyDsnKDti7jrpqzti7BcclxuaW1wb3J0IHsgaGV4VG9SZ2IsIGdldENvbnRyYXN0VGV4dENvbG9yIH0gZnJvbSAnLi91dGlscy9jb2xvci5qcyc7XHJcblxyXG4vLyDwn5qAIOu2geuniO2BtOumv+yaqSDsponsi5wg7Iuk7ZaJIO2VqOyImFxyXG5mdW5jdGlvbiBpbml0VURMVG9vbCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCfinIUgVURMIOybuSDsoJHqt7zshLEg64+E6rWsIOy0iOq4sO2ZlCDsi5zsnpEnKTtcclxuXHJcbiAgICAvLyDsnbTrr7gg7Yyo64SQ7J20IOyeiOycvOuptCDsoJzqsbDtlZjqs6Ag7KKF66OMXHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VkbC1hY2Nlc3NpYmlsaXR5LXBhbmVsJykpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndWRsLWFjY2Vzc2liaWxpdHktcGFuZWwnKS5yZW1vdmUoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyDtjKjrhJAg67CPIOyjvOyalCDquLDriqUg7LSI6riw7ZmUXHJcbiAgICAgICAgaW5pdFBhbmVsKCk7XHJcbiAgICAgICAgaW5pdENoYXQoKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zb2xlLmxvZygn4pyFIFVETCDrj4Tqtawg7LSI6riw7ZmUIOyZhOujjCcpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCfinYwgVURMIOuPhOq1rCDstIjquLDtmZQg7Iuk7YyoOicsIGVycm9yKTtcclxuICAgICAgICBhbGVydCgnVURMIOuPhOq1rOulvCDstIjquLDtmZTtlZjripQg7KSRIOyYpOulmOqwgCDrsJzsg53tlojsirXri4jri6Q6ICcgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgIH1cclxufVxyXG5cclxuLy8g8J+MjSDsoITsl60g7ZWo7IiY66GcIOuTseuhnSAo67aB66eI7YG066a/IO2YuO2ZmOyEsSlcclxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICB3aW5kb3cuaW5pdFVETFRvb2wgPSBpbml0VURMVG9vbDtcclxuICAgIHdpbmRvdy5VREwgPSB7XHJcbiAgICAgICAgaW5pdDogaW5pdFVETFRvb2wsXHJcbiAgICAgICAgaW5pdFBhbmVsLFxyXG4gICAgICAgIGFuYWx5emVXQ0FHLFxyXG4gICAgICAgIGFuYWx5emVGb3JBSSxcclxuICAgICAgICBpbml0Q2hhdCxcclxuICAgICAgICBLV0NBRzIyLFxyXG4gICAgICAgIFVETF9QUklOQ0lQTEVTXHJcbiAgICB9O1xyXG59XHJcblxyXG4vLyDwn5qAIOu2geuniO2BtOumvyDsnpDrj5kg7Iuk7ZaJIC0g7Iqk7YGs66a97Yq4IOuhnOuTnCDsponsi5wg7Iuk7ZaJXHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgLy8g67aB66eI7YG066a/7JeQ7ISc64qUIOymieyLnCDsi6TtlolcclxuICAgIGluaXRVRExUb29sKCk7XHJcbn1cclxuXHJcbi8vIEVTIOuqqOuTiCBleHBvcnQgKOybue2MqSDruYzrk5zsmqkpXHJcbmV4cG9ydCBkZWZhdWx0IGluaXRVRExUb29sO1xyXG4iXSwibmFtZXMiOlsiaW5pdFBhbmVsIiwiYW5hbHl6ZVdDQUciLCJhbmFseXplRm9yQUkiLCJpbml0Q2hhdCIsIktXQ0FHMjIiLCJVRExfUFJJTkNJUExFUyIsImhleFRvUmdiIiwiZ2V0Q29udHJhc3RUZXh0Q29sb3IiLCJpbml0VURMVG9vbCIsImNvbnNvbGUiLCJsb2ciLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlIiwiZXJyb3IiLCJhbGVydCIsIm1lc3NhZ2UiLCJ3aW5kb3ciLCJVREwiLCJpbml0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///506\n");

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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
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
/******/ 		var chunkLoadingGlobal = this["webpackChunkUDL"] = this["webpackChunkUDL"] || [];
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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [39], () => (__webpack_require__(506)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});