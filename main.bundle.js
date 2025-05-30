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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n// 🧪 최소 테스트 버전 - 모든 import 제거하고 기본 실행만 테스트\n\nconsole.log('🚀 main.js 파일이 로드되었습니다!');\nalert('🚀 main.js 파일이 로드되었습니다!');\n\n// 🚀 북마클릿용 즉시 실행 함수\nfunction initUDLTool() {\n  console.log('🔥 UDL 도구 실행 시작!!! window:', !!window, 'document:', !!document);\n  alert('🔥 UDL 도구가 실행되었습니다!');\n\n  // 간단한 테스트 패널 생성\n  var testPanel = document.createElement('div');\n  testPanel.id = 'udl-test-panel';\n  testPanel.style.cssText = \"\\n        position: fixed;\\n        top: 20px;\\n        right: 20px;\\n        width: 300px;\\n        height: 200px;\\n        background: #667eea;\\n        color: white;\\n        padding: 20px;\\n        border-radius: 10px;\\n        z-index: 999999;\\n        font-family: Arial, sans-serif;\\n        box-shadow: 0 4px 20px rgba(0,0,0,0.3);\\n    \";\n  testPanel.innerHTML = \"\\n        <h3>\\uD83E\\uDDEA UDL \\uD14C\\uC2A4\\uD2B8 \\uD328\\uB110</h3>\\n        <p>\\u2705 \\uC2A4\\uD06C\\uB9BD\\uD2B8\\uAC00 \\uC815\\uC0C1 \\uC2E4\\uD589\\uB418\\uC5C8\\uC2B5\\uB2C8\\uB2E4!</p>\\n        <button onclick=\\\"this.parentElement.remove()\\\" style=\\\"\\n            background: white;\\n            color: #667eea;\\n            border: none;\\n            padding: 5px 10px;\\n            border-radius: 5px;\\n            cursor: pointer;\\n            margin-top: 10px;\\n        \\\">\\uB2EB\\uAE30</button>\\n    \";\n\n  // 기존 패널이 있으면 제거\n  var existing = document.getElementById('udl-test-panel');\n  if (existing) {\n    existing.remove();\n  }\n  document.body.appendChild(testPanel);\n  console.log('✅ 테스트 패널이 생성되었습니다!');\n}\n\n// 🌍 전역 함수로 등록 (북마클릿 호환성)\nconsole.log('🌍 전역 객체 등록 시작...');\nif (typeof window !== 'undefined') {\n  window.initUDLTool = initUDLTool;\n  window.UDL = {\n    init: initUDLTool,\n    test: function test() {\n      return alert('UDL 테스트 함수 호출!');\n    }\n  };\n  console.log('✅ 전역 객체 등록 완료', window.UDL);\n}\n\n// 🚀 자동 실행\nconsole.log('🚀 자동 실행 시작... window:', typeof window === \"undefined\" ? \"undefined\" : _typeof(window));\nif (typeof window !== 'undefined') {\n  console.log('🎯 자동 실행 중...');\n  setTimeout(function () {\n    console.log('⏰ 딜레이 후 실행');\n    try {\n      initUDLTool();\n      console.log('🎉 자동 실행 성공!');\n    } catch (e) {\n      console.error('💥 자동 실행 실패:', e);\n      alert('💥 자동 실행 실패: ' + e.message);\n    }\n  }, 100);\n} else {\n  console.error('❌ window 객체가 없습니다!');\n}\n\n// ES 모듈 export (웹팩 빌드용)\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initUDLTool);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTA2LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBRUFBLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0FBQ3RDQyxLQUFLLENBQUMseUJBQXlCLENBQUM7O0FBRWhDO0FBQ0EsU0FBU0MsV0FBV0EsQ0FBQSxFQUFHO0VBQ25CSCxPQUFPLENBQUNDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLENBQUNHLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDQyxRQUFRLENBQUM7RUFDNUVILEtBQUssQ0FBQyxxQkFBcUIsQ0FBQzs7RUFFNUI7RUFDQSxJQUFNSSxTQUFTLEdBQUdELFFBQVEsQ0FBQ0UsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMvQ0QsU0FBUyxDQUFDRSxFQUFFLEdBQUcsZ0JBQWdCO0VBQy9CRixTQUFTLENBQUNHLEtBQUssQ0FBQ0MsT0FBTyw2VkFhdEI7RUFDREosU0FBUyxDQUFDSyxTQUFTLHVmQVlsQjs7RUFFRDtFQUNBLElBQU1DLFFBQVEsR0FBR1AsUUFBUSxDQUFDUSxjQUFjLENBQUMsZ0JBQWdCLENBQUM7RUFDMUQsSUFBSUQsUUFBUSxFQUFFO0lBQ1ZBLFFBQVEsQ0FBQ0UsTUFBTSxDQUFDLENBQUM7RUFDckI7RUFFQVQsUUFBUSxDQUFDVSxJQUFJLENBQUNDLFdBQVcsQ0FBQ1YsU0FBUyxDQUFDO0VBQ3BDTixPQUFPLENBQUNDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztBQUNyQzs7QUFFQTtBQUNBRCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztBQUNoQyxJQUFJLE9BQU9HLE1BQU0sS0FBSyxXQUFXLEVBQUU7RUFDL0JBLE1BQU0sQ0FBQ0QsV0FBVyxHQUFHQSxXQUFXO0VBQ2hDQyxNQUFNLENBQUNhLEdBQUcsR0FBRztJQUNUQyxJQUFJLEVBQUVmLFdBQVc7SUFDakJnQixJQUFJLEVBQUUsU0FBTkEsSUFBSUEsQ0FBQTtNQUFBLE9BQVFqQixLQUFLLENBQUMsZ0JBQWdCLENBQUM7SUFBQTtFQUN2QyxDQUFDO0VBQ0RGLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGVBQWUsRUFBRUcsTUFBTSxDQUFDYSxHQUFHLENBQUM7QUFDNUM7O0FBRUE7QUFDQWpCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHdCQUF3QixTQUFTRyxNQUFNLGlDQUFBZ0IsT0FBQSxDQUFOaEIsTUFBTSxFQUFDO0FBQ3BELElBQUksT0FBT0EsTUFBTSxLQUFLLFdBQVcsRUFBRTtFQUMvQkosT0FBTyxDQUFDQyxHQUFHLENBQUMsZUFBZSxDQUFDO0VBQzVCb0IsVUFBVSxDQUFDLFlBQU07SUFDYnJCLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztJQUN6QixJQUFJO01BQ0FFLFdBQVcsQ0FBQyxDQUFDO01BQ2JILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDLENBQUMsT0FBT3FCLENBQUMsRUFBRTtNQUNSdEIsT0FBTyxDQUFDdUIsS0FBSyxDQUFDLGNBQWMsRUFBRUQsQ0FBQyxDQUFDO01BQ2hDcEIsS0FBSyxDQUFDLGVBQWUsR0FBR29CLENBQUMsQ0FBQ0UsT0FBTyxDQUFDO0lBQ3RDO0VBQ0osQ0FBQyxFQUFFLEdBQUcsQ0FBQztBQUNYLENBQUMsTUFBTTtFQUNIeEIsT0FBTyxDQUFDdUIsS0FBSyxDQUFDLG9CQUFvQixDQUFDO0FBQ3ZDOztBQUVBO0FBQ0EsaUVBQWVwQixXQUFXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vVURMLy4vc3JjL21haW4uanM/NTZkNyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyDwn6eqIOy1nOyGjCDthYzsiqTtirgg67KE7KCEIC0g66qo65OgIGltcG9ydCDsoJzqsbDtlZjqs6Ag6riw67O4IOyLpO2WieunjCDthYzsiqTtirhcclxuXHJcbmNvbnNvbGUubG9nKCfwn5qAIG1haW4uanMg7YyM7J287J20IOuhnOuTnOuQmOyXiOyKteuLiOuLpCEnKTtcclxuYWxlcnQoJ/CfmoAgbWFpbi5qcyDtjIzsnbzsnbQg66Gc65Oc65CY7JeI7Iq164uI64ukIScpO1xyXG5cclxuLy8g8J+agCDrtoHrp4jtgbTrpr/smqkg7KaJ7IucIOyLpO2WiSDtlajsiJhcclxuZnVuY3Rpb24gaW5pdFVETFRvb2woKSB7XHJcbiAgICBjb25zb2xlLmxvZygn8J+UpSBVREwg64+E6rWsIOyLpO2WiSDsi5zsnpEhISEgd2luZG93OicsICEhd2luZG93LCAnZG9jdW1lbnQ6JywgISFkb2N1bWVudCk7XHJcbiAgICBhbGVydCgn8J+UpSBVREwg64+E6rWs6rCAIOyLpO2WieuQmOyXiOyKteuLiOuLpCEnKTtcclxuXHJcbiAgICAvLyDqsITri6jtlZwg7YWM7Iqk7Yq4IO2MqOuEkCDsg53shLFcclxuICAgIGNvbnN0IHRlc3RQYW5lbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGVzdFBhbmVsLmlkID0gJ3VkbC10ZXN0LXBhbmVsJztcclxuICAgIHRlc3RQYW5lbC5zdHlsZS5jc3NUZXh0ID0gYFxyXG4gICAgICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgICAgICB0b3A6IDIwcHg7XHJcbiAgICAgICAgcmlnaHQ6IDIwcHg7XHJcbiAgICAgICAgd2lkdGg6IDMwMHB4O1xyXG4gICAgICAgIGhlaWdodDogMjAwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogIzY2N2VlYTtcclxuICAgICAgICBjb2xvcjogd2hpdGU7XHJcbiAgICAgICAgcGFkZGluZzogMjBweDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgICAgIHotaW5kZXg6IDk5OTk5OTtcclxuICAgICAgICBmb250LWZhbWlseTogQXJpYWwsIHNhbnMtc2VyaWY7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCA0cHggMjBweCByZ2JhKDAsMCwwLDAuMyk7XHJcbiAgICBgO1xyXG4gICAgdGVzdFBhbmVsLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8aDM+8J+nqiBVREwg7YWM7Iqk7Yq4IO2MqOuEkDwvaDM+XHJcbiAgICAgICAgPHA+4pyFIOyKpO2BrOumve2KuOqwgCDsoJXsg4Eg7Iuk7ZaJ65CY7JeI7Iq164uI64ukITwvcD5cclxuICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJ0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlKClcIiBzdHlsZT1cIlxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICAgICAgICAgICAgY29sb3I6ICM2NjdlZWE7XHJcbiAgICAgICAgICAgIGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7XHJcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG4gICAgICAgIFwiPuuLq+q4sDwvYnV0dG9uPlxyXG4gICAgYDtcclxuXHJcbiAgICAvLyDquLDsobQg7Yyo64SQ7J20IOyeiOycvOuptCDsoJzqsbBcclxuICAgIGNvbnN0IGV4aXN0aW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VkbC10ZXN0LXBhbmVsJyk7XHJcbiAgICBpZiAoZXhpc3RpbmcpIHtcclxuICAgICAgICBleGlzdGluZy5yZW1vdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRlc3RQYW5lbCk7XHJcbiAgICBjb25zb2xlLmxvZygn4pyFIO2FjOyKpO2KuCDtjKjrhJDsnbQg7IOd7ISx65CY7JeI7Iq164uI64ukIScpO1xyXG59XHJcblxyXG4vLyDwn4yNIOyghOyXrSDtlajsiJjroZwg65Ox66GdICjrtoHrp4jtgbTrpr8g7Zi47ZmY7ISxKVxyXG5jb25zb2xlLmxvZygn8J+MjSDsoITsl60g6rCd7LK0IOuTseuhnSDsi5zsnpEuLi4nKTtcclxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICB3aW5kb3cuaW5pdFVETFRvb2wgPSBpbml0VURMVG9vbDtcclxuICAgIHdpbmRvdy5VREwgPSB7XHJcbiAgICAgICAgaW5pdDogaW5pdFVETFRvb2wsXHJcbiAgICAgICAgdGVzdDogKCkgPT4gYWxlcnQoJ1VETCDthYzsiqTtirgg7ZWo7IiYIO2YuOy2nCEnKVxyXG4gICAgfTtcclxuICAgIGNvbnNvbGUubG9nKCfinIUg7KCE7JetIOqwneyytCDrk7HroZ0g7JmE66OMJywgd2luZG93LlVETCk7XHJcbn1cclxuXHJcbi8vIPCfmoAg7J6Q64+ZIOyLpO2WiVxyXG5jb25zb2xlLmxvZygn8J+agCDsnpDrj5kg7Iuk7ZaJIOyLnOyekS4uLiB3aW5kb3c6JywgdHlwZW9mIHdpbmRvdyk7XHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgY29uc29sZS5sb2coJ/Cfjq8g7J6Q64+ZIOyLpO2WiSDspJEuLi4nKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfij7Ag65Sc66CI7J20IO2bhCDsi6TtloknKTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpbml0VURMVG9vbCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygn8J+OiSDsnpDrj5kg7Iuk7ZaJIOyEseqztSEnKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ/CfkqUg7J6Q64+ZIOyLpO2WiSDsi6TtjKg6JywgZSk7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfwn5KlIOyekOuPmSDsi6Ttlokg7Iuk7YyoOiAnICsgZS5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9LCAxMDApO1xyXG59IGVsc2Uge1xyXG4gICAgY29uc29sZS5lcnJvcign4p2MIHdpbmRvdyDqsJ3ssrTqsIAg7JeG7Iq164uI64ukIScpO1xyXG59XHJcblxyXG4vLyBFUyDrqqjrk4ggZXhwb3J0ICjsm7ntjKkg67mM65Oc7JqpKVxyXG5leHBvcnQgZGVmYXVsdCBpbml0VURMVG9vbDtcclxuIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJhbGVydCIsImluaXRVRExUb29sIiwid2luZG93IiwiZG9jdW1lbnQiLCJ0ZXN0UGFuZWwiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJzdHlsZSIsImNzc1RleHQiLCJpbm5lckhUTUwiLCJleGlzdGluZyIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlIiwiYm9keSIsImFwcGVuZENoaWxkIiwiVURMIiwiaW5pdCIsInRlc3QiLCJfdHlwZW9mIiwic2V0VGltZW91dCIsImUiLCJlcnJvciIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///506\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[506](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});