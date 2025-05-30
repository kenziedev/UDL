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
/***/ (() => {

eval("// 🧪 최종 테스트 - 가장 간단한 북마클릿 형태\n\nconsole.log('🚀 UDL 스크립트 로드됨');\n\n// 🚀 간단한 실행 함수\nfunction initUDLTool() {\n  console.log('🔥 UDL 실행!');\n\n  // 기존 패널 제거\n  var existing = document.getElementById('udl-test-panel');\n  if (existing) existing.remove();\n\n  // 간단한 패널 생성\n  var panel = document.createElement('div');\n  panel.id = 'udl-test-panel';\n  panel.style.cssText = \"\\n        position: fixed; top: 20px; right: 20px; width: 300px; height: 150px;\\n        background: #667eea; color: white; padding: 20px; border-radius: 10px;\\n        z-index: 999999; font-family: Arial, sans-serif;\\n    \";\n  panel.innerHTML = \"\\n        <h3>\\u2705 UDL \\uD14C\\uC2A4\\uD2B8 \\uC131\\uACF5!</h3>\\n        <p>\\uAE30\\uBCF8 \\uBD81\\uB9C8\\uD074\\uB9BF\\uC774 \\uC815\\uC0C1 \\uC791\\uB3D9\\uD569\\uB2C8\\uB2E4.</p>\\n        <button onclick=\\\"this.parentElement.remove()\\\" style=\\\"\\n            background: white; color: #667eea; border: none;\\n            padding: 5px 10px; border-radius: 5px; cursor: pointer;\\n        \\\">\\uB2EB\\uAE30</button>\\n    \";\n  document.body.appendChild(panel);\n  alert('🎉 UDL 도구가 실행되었습니다!');\n}\n\n// 전역 등록\nwindow.initUDLTool = initUDLTool;\nwindow.UDL = {\n  init: initUDLTool\n};\n\n// 즉시 실행\ninitUDLTool();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTA2LmpzIiwibmFtZXMiOlsiY29uc29sZSIsImxvZyIsImluaXRVRExUb29sIiwiZXhpc3RpbmciLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVtb3ZlIiwicGFuZWwiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJzdHlsZSIsImNzc1RleHQiLCJpbm5lckhUTUwiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJhbGVydCIsIndpbmRvdyIsIlVETCIsImluaXQiXSwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2VicGFjazovL3VkbC8uL3NyYy9tYWluLmpzPzU2ZDciXSwic291cmNlc0NvbnRlbnQiOlsiLy8g8J+nqiDstZzsooUg7YWM7Iqk7Yq4IC0g6rCA7J6lIOqwhOuLqO2VnCDrtoHrp4jtgbTrpr8g7ZiV7YOcXHJcblxyXG5jb25zb2xlLmxvZygn8J+agCBVREwg7Iqk7YGs66a97Yq4IOuhnOuTnOuQqCcpO1xyXG5cclxuLy8g8J+agCDqsITri6jtlZwg7Iuk7ZaJIO2VqOyImFxyXG5mdW5jdGlvbiBpbml0VURMVG9vbCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCfwn5SlIFVETCDsi6TtlokhJyk7XHJcbiAgICBcclxuICAgIC8vIOq4sOyhtCDtjKjrhJAg7KCc6rGwXHJcbiAgICBjb25zdCBleGlzdGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1ZGwtdGVzdC1wYW5lbCcpO1xyXG4gICAgaWYgKGV4aXN0aW5nKSBleGlzdGluZy5yZW1vdmUoKTtcclxuXHJcbiAgICAvLyDqsITri6jtlZwg7Yyo64SQIOyDneyEsVxyXG4gICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHBhbmVsLmlkID0gJ3VkbC10ZXN0LXBhbmVsJztcclxuICAgIHBhbmVsLnN0eWxlLmNzc1RleHQgPSBgXHJcbiAgICAgICAgcG9zaXRpb246IGZpeGVkOyB0b3A6IDIwcHg7IHJpZ2h0OiAyMHB4OyB3aWR0aDogMzAwcHg7IGhlaWdodDogMTUwcHg7XHJcbiAgICAgICAgYmFja2dyb3VuZDogIzY2N2VlYTsgY29sb3I6IHdoaXRlOyBwYWRkaW5nOiAyMHB4OyBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgICAgIHotaW5kZXg6IDk5OTk5OTsgZm9udC1mYW1pbHk6IEFyaWFsLCBzYW5zLXNlcmlmO1xyXG4gICAgYDtcclxuICAgIHBhbmVsLmlubmVySFRNTCA9IGBcclxuICAgICAgICA8aDM+4pyFIFVETCDthYzsiqTtirgg7ISx6rO1ITwvaDM+XHJcbiAgICAgICAgPHA+6riw67O4IOu2geuniO2BtOumv+ydtCDsoJXsg4Eg7J6R64+Z7ZWp64uI64ukLjwvcD5cclxuICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJ0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlKClcIiBzdHlsZT1cIlxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsgY29sb3I6ICM2NjdlZWE7IGJvcmRlcjogbm9uZTtcclxuICAgICAgICAgICAgcGFkZGluZzogNXB4IDEwcHg7IGJvcmRlci1yYWRpdXM6IDVweDsgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICAgIFwiPuuLq+q4sDwvYnV0dG9uPlxyXG4gICAgYDtcclxuICAgIFxyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwYW5lbCk7XHJcbiAgICBhbGVydCgn8J+OiSBVREwg64+E6rWs6rCAIOyLpO2WieuQmOyXiOyKteuLiOuLpCEnKTtcclxufVxyXG5cclxuLy8g7KCE7JetIOuTseuhnVxyXG53aW5kb3cuaW5pdFVETFRvb2wgPSBpbml0VURMVG9vbDtcclxud2luZG93LlVETCA9IHsgaW5pdDogaW5pdFVETFRvb2wgfTtcclxuXHJcbi8vIOymieyLnCDsi6TtlolcclxuaW5pdFVETFRvb2woKTtcclxuIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQUEsT0FBTyxDQUFDQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7O0FBRTlCO0FBQ0EsU0FBU0MsV0FBV0EsQ0FBQSxFQUFHO0VBQ25CRixPQUFPLENBQUNDLEdBQUcsQ0FBQyxZQUFZLENBQUM7O0VBRXpCO0VBQ0EsSUFBTUUsUUFBUSxHQUFHQyxRQUFRLENBQUNDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztFQUMxRCxJQUFJRixRQUFRLEVBQUVBLFFBQVEsQ0FBQ0csTUFBTSxDQUFDLENBQUM7O0VBRS9CO0VBQ0EsSUFBTUMsS0FBSyxHQUFHSCxRQUFRLENBQUNJLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDM0NELEtBQUssQ0FBQ0UsRUFBRSxHQUFHLGdCQUFnQjtFQUMzQkYsS0FBSyxDQUFDRyxLQUFLLENBQUNDLE9BQU8sb09BSWxCO0VBQ0RKLEtBQUssQ0FBQ0ssU0FBUyx5WkFPZDtFQUVEUixRQUFRLENBQUNTLElBQUksQ0FBQ0MsV0FBVyxDQUFDUCxLQUFLLENBQUM7RUFDaENRLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztBQUNoQzs7QUFFQTtBQUNBQyxNQUFNLENBQUNkLFdBQVcsR0FBR0EsV0FBVztBQUNoQ2MsTUFBTSxDQUFDQyxHQUFHLEdBQUc7RUFBRUMsSUFBSSxFQUFFaEI7QUFBWSxDQUFDOztBQUVsQztBQUNBQSxXQUFXLENBQUMsQ0FBQyIsImlnbm9yZUxpc3QiOltdfQ==\n//# sourceURL=webpack-internal:///506\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__[506]();
/******/ 	
/******/ })()
;