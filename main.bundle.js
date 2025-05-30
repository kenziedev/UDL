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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n// 🧪 단계적 테스트 - 모든 CSS 제외하고 테스트\n// import './styles/panel.css';      // ⭐ 모든 CSS 제외\n// import './styles/ai-analysis.css'; // ⭐ 모든 CSS 제외\n// import './styles/contrast.css';   // ⭐ 모든 CSS 제외\n\nconsole.log('🚀 main.js 파일이 로드되었습니다!');\nalert('🚀 main.js 파일이 로드되었습니다!');\n\n// 🚀 북마클릿용 즉시 실행 함수\nfunction initUDLTool() {\n  console.log('🔥 UDL 도구 실행 시작!!! window:', !!window, 'document:', !!document);\n  alert('🔥 UDL 도구가 실행되었습니다!');\n\n  // 간단한 테스트 패널 생성\n  var testPanel = document.createElement('div');\n  testPanel.id = 'udl-test-panel';\n  testPanel.style.cssText = \"\\n        position: fixed;\\n        top: 20px;\\n        right: 20px;\\n        width: 300px;\\n        height: 200px;\\n        background: #667eea;\\n        color: white;\\n        padding: 20px;\\n        border-radius: 10px;\\n        z-index: 999999;\\n        font-family: Arial, sans-serif;\\n        box-shadow: 0 4px 20px rgba(0,0,0,0.3);\\n    \";\n  testPanel.innerHTML = \"\\n        <h3>\\uD83E\\uDDEA UDL \\uD14C\\uC2A4\\uD2B8 (CSS \\uC644\\uC804 \\uC81C\\uC678)</h3>\\n        <p>\\u2705 \\uC2A4\\uD06C\\uB9BD\\uD2B8\\uAC00 \\uC815\\uC0C1 \\uC2E4\\uD589\\uB418\\uC5C8\\uC2B5\\uB2C8\\uB2E4!</p>\\n        <p>\\uD83D\\uDCC4 \\uBAA8\\uB4E0 CSS import\\uB97C \\uC81C\\uC678\\uD55C \\uBC84\\uC804\\uC785\\uB2C8\\uB2E4.</p>\\n        <button onclick=\\\"this.parentElement.remove()\\\" style=\\\"\\n            background: white;\\n            color: #667eea;\\n            border: none;\\n            padding: 5px 10px;\\n            border-radius: 5px;\\n            cursor: pointer;\\n            margin-top: 10px;\\n        \\\">\\uB2EB\\uAE30</button>\\n    \";\n\n  // 기존 패널이 있으면 제거\n  var existing = document.getElementById('udl-test-panel');\n  if (existing) {\n    existing.remove();\n  }\n  document.body.appendChild(testPanel);\n  console.log('✅ 테스트 패널이 생성되었습니다!');\n}\n\n// 🌍 전역 함수로 등록 (북마클릿 호환성)\nconsole.log('🌍 전역 객체 등록 시작...');\nif (typeof window !== 'undefined') {\n  window.initUDLTool = initUDLTool;\n  window.UDL = {\n    init: initUDLTool,\n    test: function test() {\n      return alert('UDL 테스트 함수 호출!');\n    }\n  };\n  console.log('✅ 전역 객체 등록 완료', window.UDL);\n}\n\n// 🚀 자동 실행\nconsole.log('🚀 자동 실행 시작... window:', typeof window === \"undefined\" ? \"undefined\" : _typeof(window));\nif (typeof window !== 'undefined') {\n  console.log('🎯 자동 실행 중...');\n  setTimeout(function () {\n    console.log('⏰ 딜레이 후 실행');\n    try {\n      initUDLTool();\n      console.log('🎉 자동 실행 성공!');\n    } catch (e) {\n      console.error('💥 자동 실행 실패:', e);\n      alert('💥 자동 실행 실패: ' + e.message);\n    }\n  }, 100);\n} else {\n  console.error('❌ window 객체가 없습니다!');\n}\n\n// ES 모듈 export (웹팩 빌드용)\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initUDLTool);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTA2LmpzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUFBLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLHlCQUF5QixDQUFDO0FBQ3RDQyxLQUFLLENBQUMseUJBQXlCLENBQUM7O0FBRWhDO0FBQ0EsU0FBU0MsV0FBV0EsQ0FBQSxFQUFHO0VBQ25CSCxPQUFPLENBQUNDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLENBQUNHLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDQyxRQUFRLENBQUM7RUFDNUVILEtBQUssQ0FBQyxxQkFBcUIsQ0FBQzs7RUFFNUI7RUFDQSxJQUFNSSxTQUFTLEdBQUdELFFBQVEsQ0FBQ0UsYUFBYSxDQUFDLEtBQUssQ0FBQztFQUMvQ0QsU0FBUyxDQUFDRSxFQUFFLEdBQUcsZ0JBQWdCO0VBQy9CRixTQUFTLENBQUNHLEtBQUssQ0FBQ0MsT0FBTyw2VkFhdEI7RUFDREosU0FBUyxDQUFDSyxTQUFTLHduQkFhbEI7O0VBRUQ7RUFDQSxJQUFNQyxRQUFRLEdBQUdQLFFBQVEsQ0FBQ1EsY0FBYyxDQUFDLGdCQUFnQixDQUFDO0VBQzFELElBQUlELFFBQVEsRUFBRTtJQUNWQSxRQUFRLENBQUNFLE1BQU0sQ0FBQyxDQUFDO0VBQ3JCO0VBRUFULFFBQVEsQ0FBQ1UsSUFBSSxDQUFDQyxXQUFXLENBQUNWLFNBQVMsQ0FBQztFQUNwQ04sT0FBTyxDQUFDQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7QUFDckM7O0FBRUE7QUFDQUQsT0FBTyxDQUFDQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7QUFDaEMsSUFBSSxPQUFPRyxNQUFNLEtBQUssV0FBVyxFQUFFO0VBQy9CQSxNQUFNLENBQUNELFdBQVcsR0FBR0EsV0FBVztFQUNoQ0MsTUFBTSxDQUFDYSxHQUFHLEdBQUc7SUFDVEMsSUFBSSxFQUFFZixXQUFXO0lBQ2pCZ0IsSUFBSSxFQUFFLFNBQU5BLElBQUlBLENBQUE7TUFBQSxPQUFRakIsS0FBSyxDQUFDLGdCQUFnQixDQUFDO0lBQUE7RUFDdkMsQ0FBQztFQUNERixPQUFPLENBQUNDLEdBQUcsQ0FBQyxlQUFlLEVBQUVHLE1BQU0sQ0FBQ2EsR0FBRyxDQUFDO0FBQzVDOztBQUVBO0FBQ0FqQixPQUFPLENBQUNDLEdBQUcsQ0FBQyx3QkFBd0IsU0FBU0csTUFBTSxpQ0FBQWdCLE9BQUEsQ0FBTmhCLE1BQU0sRUFBQztBQUNwRCxJQUFJLE9BQU9BLE1BQU0sS0FBSyxXQUFXLEVBQUU7RUFDL0JKLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLGVBQWUsQ0FBQztFQUM1Qm9CLFVBQVUsQ0FBQyxZQUFNO0lBQ2JyQixPQUFPLENBQUNDLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFDekIsSUFBSTtNQUNBRSxXQUFXLENBQUMsQ0FBQztNQUNiSCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQyxDQUFDLE9BQU9xQixDQUFDLEVBQUU7TUFDUnRCLE9BQU8sQ0FBQ3VCLEtBQUssQ0FBQyxjQUFjLEVBQUVELENBQUMsQ0FBQztNQUNoQ3BCLEtBQUssQ0FBQyxlQUFlLEdBQUdvQixDQUFDLENBQUNFLE9BQU8sQ0FBQztJQUN0QztFQUNKLENBQUMsRUFBRSxHQUFHLENBQUM7QUFDWCxDQUFDLE1BQU07RUFDSHhCLE9BQU8sQ0FBQ3VCLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztBQUN2Qzs7QUFFQTtBQUNBLGlFQUFlcEIsV0FBVyIsInNvdXJjZXMiOlsid2VicGFjazovL1VETC8uL3NyYy9tYWluLmpzPzU2ZDciXSwic291cmNlc0NvbnRlbnQiOlsiLy8g8J+nqiDri6jqs4TsoIEg7YWM7Iqk7Yq4IC0g66qo65OgIENTUyDsoJzsmbjtlZjqs6Ag7YWM7Iqk7Yq4XHJcbi8vIGltcG9ydCAnLi9zdHlsZXMvcGFuZWwuY3NzJzsgICAgICAvLyDirZAg66qo65OgIENTUyDsoJzsmbhcclxuLy8gaW1wb3J0ICcuL3N0eWxlcy9haS1hbmFseXNpcy5jc3MnOyAvLyDirZAg66qo65OgIENTUyDsoJzsmbhcclxuLy8gaW1wb3J0ICcuL3N0eWxlcy9jb250cmFzdC5jc3MnOyAgIC8vIOKtkCDrqqjrk6AgQ1NTIOygnOyZuFxyXG5cclxuY29uc29sZS5sb2coJ/CfmoAgbWFpbi5qcyDtjIzsnbzsnbQg66Gc65Oc65CY7JeI7Iq164uI64ukIScpO1xyXG5hbGVydCgn8J+agCBtYWluLmpzIO2MjOydvOydtCDroZzrk5zrkJjsl4jsirXri4jri6QhJyk7XHJcblxyXG4vLyDwn5qAIOu2geuniO2BtOumv+yaqSDsponsi5wg7Iuk7ZaJIO2VqOyImFxyXG5mdW5jdGlvbiBpbml0VURMVG9vbCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCfwn5SlIFVETCDrj4Tqtawg7Iuk7ZaJIOyLnOyekSEhISB3aW5kb3c6JywgISF3aW5kb3csICdkb2N1bWVudDonLCAhIWRvY3VtZW50KTtcclxuICAgIGFsZXJ0KCfwn5SlIFVETCDrj4TqtazqsIAg7Iuk7ZaJ65CY7JeI7Iq164uI64ukIScpO1xyXG5cclxuICAgIC8vIOqwhOuLqO2VnCDthYzsiqTtirgg7Yyo64SQIOyDneyEsVxyXG4gICAgY29uc3QgdGVzdFBhbmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0ZXN0UGFuZWwuaWQgPSAndWRsLXRlc3QtcGFuZWwnO1xyXG4gICAgdGVzdFBhbmVsLnN0eWxlLmNzc1RleHQgPSBgXHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgICAgIHRvcDogMjBweDtcclxuICAgICAgICByaWdodDogMjBweDtcclxuICAgICAgICB3aWR0aDogMzAwcHg7XHJcbiAgICAgICAgaGVpZ2h0OiAyMDBweDtcclxuICAgICAgICBiYWNrZ3JvdW5kOiAjNjY3ZWVhO1xyXG4gICAgICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgICBwYWRkaW5nOiAyMHB4O1xyXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICAgICAgei1pbmRleDogOTk5OTk5O1xyXG4gICAgICAgIGZvbnQtZmFtaWx5OiBBcmlhbCwgc2Fucy1zZXJpZjtcclxuICAgICAgICBib3gtc2hhZG93OiAwIDRweCAyMHB4IHJnYmEoMCwwLDAsMC4zKTtcclxuICAgIGA7XHJcbiAgICB0ZXN0UGFuZWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxoMz7wn6eqIFVETCDthYzsiqTtirggKENTUyDsmYTsoIQg7KCc7Jm4KTwvaDM+XHJcbiAgICAgICAgPHA+4pyFIOyKpO2BrOumve2KuOqwgCDsoJXsg4Eg7Iuk7ZaJ65CY7JeI7Iq164uI64ukITwvcD5cclxuICAgICAgICA8cD7wn5OEIOuqqOuToCBDU1MgaW1wb3J066W8IOygnOyZuO2VnCDrsoTsoITsnoXri4jri6QuPC9wPlxyXG4gICAgICAgIDxidXR0b24gb25jbGljaz1cInRoaXMucGFyZW50RWxlbWVudC5yZW1vdmUoKVwiIHN0eWxlPVwiXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHdoaXRlO1xyXG4gICAgICAgICAgICBjb2xvcjogIzY2N2VlYTtcclxuICAgICAgICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICAgICAgICBwYWRkaW5nOiA1cHggMTBweDtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICAgICAgXCI+64ur6riwPC9idXR0b24+XHJcbiAgICBgO1xyXG5cclxuICAgIC8vIOq4sOyhtCDtjKjrhJDsnbQg7J6I7Jy866m0IOygnOqxsFxyXG4gICAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndWRsLXRlc3QtcGFuZWwnKTtcclxuICAgIGlmIChleGlzdGluZykge1xyXG4gICAgICAgIGV4aXN0aW5nLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGVzdFBhbmVsKTtcclxuICAgIGNvbnNvbGUubG9nKCfinIUg7YWM7Iqk7Yq4IO2MqOuEkOydtCDsg53shLHrkJjsl4jsirXri4jri6QhJyk7XHJcbn1cclxuXHJcbi8vIPCfjI0g7KCE7JetIO2VqOyImOuhnCDrk7HroZ0gKOu2geuniO2BtOumvyDtmLjtmZjshLEpXHJcbmNvbnNvbGUubG9nKCfwn4yNIOyghOyXrSDqsJ3ssrQg65Ox66GdIOyLnOyekS4uLicpO1xyXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIHdpbmRvdy5pbml0VURMVG9vbCA9IGluaXRVRExUb29sO1xyXG4gICAgd2luZG93LlVETCA9IHtcclxuICAgICAgICBpbml0OiBpbml0VURMVG9vbCxcclxuICAgICAgICB0ZXN0OiAoKSA9PiBhbGVydCgnVURMIO2FjOyKpO2KuCDtlajsiJgg7Zi47LacIScpXHJcbiAgICB9O1xyXG4gICAgY29uc29sZS5sb2coJ+KchSDsoITsl60g6rCd7LK0IOuTseuhnSDsmYTro4wnLCB3aW5kb3cuVURMKTtcclxufVxyXG5cclxuLy8g8J+agCDsnpDrj5kg7Iuk7ZaJXHJcbmNvbnNvbGUubG9nKCfwn5qAIOyekOuPmSDsi6Ttlokg7Iuc7J6RLi4uIHdpbmRvdzonLCB0eXBlb2Ygd2luZG93KTtcclxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBjb25zb2xlLmxvZygn8J+OryDsnpDrj5kg7Iuk7ZaJIOykkS4uLicpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+KPsCDrlJzroIjsnbQg7ZuEIOyLpO2WiScpO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGluaXRVRExUb29sKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfwn46JIOyekOuPmSDsi6Ttlokg7ISx6rO1IScpO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign8J+SpSDsnpDrj5kg7Iuk7ZaJIOyLpO2MqDonLCBlKTtcclxuICAgICAgICAgICAgYWxlcnQoJ/CfkqUg7J6Q64+ZIOyLpO2WiSDsi6TtjKg6ICcgKyBlLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDEwMCk7XHJcbn0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCfinYwgd2luZG93IOqwneyytOqwgCDsl4bsirXri4jri6QhJyk7XHJcbn1cclxuXHJcbi8vIEVTIOuqqOuTiCBleHBvcnQgKOybue2MqSDruYzrk5zsmqkpXHJcbmV4cG9ydCBkZWZhdWx0IGluaXRVRExUb29sO1xyXG4iXSwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsImFsZXJ0IiwiaW5pdFVETFRvb2wiLCJ3aW5kb3ciLCJkb2N1bWVudCIsInRlc3RQYW5lbCIsImNyZWF0ZUVsZW1lbnQiLCJpZCIsInN0eWxlIiwiY3NzVGV4dCIsImlubmVySFRNTCIsImV4aXN0aW5nIiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW1vdmUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJVREwiLCJpbml0IiwidGVzdCIsIl90eXBlb2YiLCJzZXRUaW1lb3V0IiwiZSIsImVycm9yIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///506\n");

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