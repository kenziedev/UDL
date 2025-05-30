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

/***/ 741:
/***/ ((__unused_webpack___webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

eval("\n// EXTERNAL MODULE: ./src/styles/panel.css\nvar panel = __webpack_require__(719);\n// EXTERNAL MODULE: ./src/styles/ai-analysis.css\nvar ai_analysis = __webpack_require__(908);\n// EXTERNAL MODULE: ./src/styles/contrast.css\nvar contrast = __webpack_require__(439);\n// EXTERNAL MODULE: ./src/core/initPanel.js + 7 modules\nvar initPanel = __webpack_require__(888);\n// EXTERNAL MODULE: ./src/core/analyzeWCAG.js\nvar analyzeWCAG = __webpack_require__(813);\n// EXTERNAL MODULE: ./src/core/analyzeForAI.js\nvar analyzeForAI = __webpack_require__(986);\n// EXTERNAL MODULE: ./src/core/chatBot.js\nvar chatBot = __webpack_require__(136);\n// EXTERNAL MODULE: ./src/constants/KWCAG22.js\nvar KWCAG22 = __webpack_require__(682);\n// EXTERNAL MODULE: ./src/constants/UDL_PRINCIPLES.js\nvar UDL_PRINCIPLES = __webpack_require__(400);\n;// ./src/utils/color.js\n// utils/color.js\n\n/**\r\n * HEX 색상을 RGB 객체로 변환\r\n * @param {string} hex - #RRGGBB 형식\r\n * @returns {{r: number, g: number, b: number}}\r\n */\nfunction hexToRgb(hex) {\n  hex = hex.replace(/^#/, '');\n  var bigint = parseInt(hex, 16);\n  return {\n    r: bigint >> 16 & 255,\n    g: bigint >> 8 & 255,\n    b: bigint & 255\n  };\n}\n\n/**\r\n * RGB 값을 HEX 코드로 변환\r\n * @param {number} r\r\n * @param {number} g\r\n * @param {number} b\r\n * @returns {string} - #RRGGBB 형식\r\n */\nfunction rgbToHex(r, g, b) {\n  return '#' + [r, g, b].map(function (v) {\n    return Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0');\n  }).join('');\n}\n\n/**\r\n * 주어진 색상에 대비되는 텍스트 색상 결정 (흰색 또는 검은색)\r\n * @param {string} hexColor - #RRGGBB\r\n * @returns {string} - 'black' or 'white'\r\n */\nfunction getContrastTextColor(hexColor) {\n  var _hexToRgb = hexToRgb(hexColor),\n    r = _hexToRgb.r,\n    g = _hexToRgb.g,\n    b = _hexToRgb.b;\n  var brightness = (r * 299 + g * 587 + b * 114) / 1000;\n  return brightness > 125 ? 'black' : 'white';\n}\n\n/**\r\n * 색맹 시뮬레이션용 색상 매트릭스 적용\r\n * @param {string} hex - 원본 색상\r\n * @param {Array<number>} matrix - 4x5 형식의 색맹 변환 매트릭스\r\n * @returns {string} - 변환된 HEX 색상\r\n */\nfunction applyColorMatrix(hex, matrix) {\n  var _hexToRgb2 = hexToRgb(hex),\n    r = _hexToRgb2.r,\n    g = _hexToRgb2.g,\n    b = _hexToRgb2.b;\n  var newR = r * matrix[0] + g * matrix[1] + b * matrix[2];\n  var newG = r * matrix[5] + g * matrix[6] + b * matrix[7];\n  var newB = r * matrix[10] + g * matrix[11] + b * matrix[12];\n  return rgbToHex(Math.round(newR), Math.round(newG), Math.round(newB));\n}\n;// ./src/main.js\n// 📄 스타일 import\n\n\n\n\n// 🧩 핵심 기능 import\n\n\n\n\n\n// 📚 상수 데이터 import\n\n\n\n// 🛠️ 유틸리티 import\n\nconsole.log('🚀 UDL 웹 접근성 도구 로드됨');\n\n// 🚀 UDL 도구 초기화 함수\nfunction initUDLTool() {\n  console.log('✅ UDL 웹 접근성 도구 초기화 시작');\n\n  // 이미 패널이 있으면 제거하고 종료\n  if (document.getElementById('udl-accessibility-panel')) {\n    document.getElementById('udl-accessibility-panel').remove();\n    console.log('🔄 기존 패널 제거됨');\n    return;\n  }\n  try {\n    // 패널 및 주요 기능 초기화\n    (0,initPanel/* initPanel */.h)();\n    (0,chatBot/* initChat */.D)();\n    console.log('✅ UDL 도구 초기화 완료');\n\n    // 사용자에게 성공 알림\n    var notification = document.createElement('div');\n    notification.style.cssText = \"\\n            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);\\n            background: #28a745; color: white; padding: 10px 20px;\\n            border-radius: 5px; z-index: 1000000; font-family: Arial;\\n            box-shadow: 0 2px 10px rgba(0,0,0,0.3);\\n        \";\n    notification.textContent = '✅ UDL 웹 접근성 도구가 활성화되었습니다!';\n    document.body.appendChild(notification);\n\n    // 3초 후 알림 제거\n    setTimeout(function () {\n      if (notification.parentNode) {\n        notification.remove();\n      }\n    }, 3000);\n  } catch (error) {\n    console.error('❌ UDL 도구 초기화 실패:', error);\n    alert('UDL 도구를 초기화하는 중 오류가 발생했습니다: ' + error.message);\n  }\n}\n\n// 🌍 전역 함수로 등록 (북마클릿 호환성)\nwindow.initUDLTool = initUDLTool;\nwindow.UDL = {\n  init: initUDLTool,\n  analyzeWCAG: analyzeWCAG/* analyzeWCAG */.d,\n  analyzeForAI: analyzeForAI/* analyzeForAI */.iM,\n  constants: {\n    KWCAG22: KWCAG22/* KWCAG22 */.w,\n    UDL_PRINCIPLES: UDL_PRINCIPLES/* UDL_PRINCIPLES */.E\n  },\n  utils: {\n    hexToRgb: hexToRgb,\n    getContrastTextColor: getContrastTextColor\n  }\n};\n\n// 🚀 즉시 실행\ninitUDLTool();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsa0JBQWtCLEVBQUVBLEtBQUssQ0FBQztJQUN4Q0MsS0FBSyxDQUFDLDhCQUE4QixHQUFHRCxLQUFLLENBQUNFLE9BQU8sQ0FBQztFQUN6RDtBQUNKOztBQUVBO0FBQ0FDLE1BQU0sQ0FBQ2hCLFdBQVcsR0FBR0EsV0FBVztBQUNoQ2dCLE1BQU0sQ0FBQ0MsR0FBRyxHQUFHO0VBQ1RDLElBQUksRUFBRWxCLFdBQVc7RUFDakJQLFdBQVcsRUFBWEEsOEJBQVc7RUFDWEMsWUFBWSxFQUFaQSxpQ0FBWTtFQUNaeUIsU0FBUyxFQUFFO0lBQUV2QixPQUFPLEVBQVBBLHNCQUFPO0lBQUVDLGNBQWMsRUFBZEEsb0NBQWNBO0VBQUMsQ0FBQztFQUN0Q3VCLEtBQUssRUFBRTtJQUFFeEQsUUFBUSxFQUFSQSxRQUFRO0lBQUVpQixvQkFBb0IsRUFBcEJBLG9CQUFvQkE7RUFBQztBQUM1QyxDQUFDOztBQUVEO0FBQ0FtQixXQUFXLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3VkbC8uL3NyYy91dGlscy9jb2xvci5qcz81ZTlmIiwid2VicGFjazovL3VkbC8uL3NyYy9tYWluLmpzPzU2ZDciXSwic291cmNlc0NvbnRlbnQiOlsiLy8gdXRpbHMvY29sb3IuanNcclxuXHJcbi8qKlxyXG4gKiBIRVgg7IOJ7IOB7J2EIFJHQiDqsJ3ssrTroZwg67OA7ZmYXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBoZXggLSAjUlJHR0JCIO2YleyLnVxyXG4gKiBAcmV0dXJucyB7e3I6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXJ9fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhleFRvUmdiKGhleCkge1xyXG4gICAgaGV4ID0gaGV4LnJlcGxhY2UoL14jLywgJycpO1xyXG4gICAgY29uc3QgYmlnaW50ID0gcGFyc2VJbnQoaGV4LCAxNik7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHI6IChiaWdpbnQgPj4gMTYpICYgMjU1LFxyXG4gICAgICAgIGc6IChiaWdpbnQgPj4gOCkgJiAyNTUsXHJcbiAgICAgICAgYjogYmlnaW50ICYgMjU1XHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuICogUkdCIOqwkuydhCBIRVgg7L2U65Oc66GcIOuzgO2ZmFxyXG4gKiBAcGFyYW0ge251bWJlcn0gclxyXG4gKiBAcGFyYW0ge251bWJlcn0gZ1xyXG4gKiBAcGFyYW0ge251bWJlcn0gYlxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICNSUkdHQkIg7ZiV7IudXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9IZXgociwgZywgYikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICAnIycgK1xyXG4gICAgICAgIFtyLCBnLCBiXVxyXG4gICAgICAgICAgICAubWFwKHYgPT4gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCB2KSkudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsICcwJykpXHJcbiAgICAgICAgICAgIC5qb2luKCcnKVxyXG4gICAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOyjvOyWtOynhCDsg4nsg4Hsl5Ag64yA67mE65CY64qUIO2FjeyKpO2KuCDsg4nsg4Eg6rKw7KCVICjtnbDsg4kg65iQ64qUIOqygOydgOyDiSlcclxuICogQHBhcmFtIHtzdHJpbmd9IGhleENvbG9yIC0gI1JSR0dCQlxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSAtICdibGFjaycgb3IgJ3doaXRlJ1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRyYXN0VGV4dENvbG9yKGhleENvbG9yKSB7XHJcbiAgICBjb25zdCB7IHIsIGcsIGIgfSA9IGhleFRvUmdiKGhleENvbG9yKTtcclxuICAgIGNvbnN0IGJyaWdodG5lc3MgPSAociAqIDI5OSArIGcgKiA1ODcgKyBiICogMTE0KSAvIDEwMDA7XHJcbiAgICByZXR1cm4gYnJpZ2h0bmVzcyA+IDEyNSA/ICdibGFjaycgOiAnd2hpdGUnO1xyXG59XHJcblxyXG4vKipcclxuICog7IOJ66e5IOyLnOuurOugiOydtOyFmOyaqSDsg4nsg4Eg66ek7Yq466at7IqkIOyggeyaqVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gaGV4IC0g7JuQ67O4IOyDieyDgVxyXG4gKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IG1hdHJpeCAtIDR4NSDtmJXsi53snZgg7IOJ66e5IOuzgO2ZmCDrp6Ttirjrpq3siqRcclxuICogQHJldHVybnMge3N0cmluZ30gLSDrs4DtmZjrkJwgSEVYIOyDieyDgVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5Q29sb3JNYXRyaXgoaGV4LCBtYXRyaXgpIHtcclxuICAgIGNvbnN0IHsgciwgZywgYiB9ID0gaGV4VG9SZ2IoaGV4KTtcclxuXHJcbiAgICBjb25zdCBuZXdSID0gciAqIG1hdHJpeFswXSArIGcgKiBtYXRyaXhbMV0gKyBiICogbWF0cml4WzJdO1xyXG4gICAgY29uc3QgbmV3RyA9IHIgKiBtYXRyaXhbNV0gKyBnICogbWF0cml4WzZdICsgYiAqIG1hdHJpeFs3XTtcclxuICAgIGNvbnN0IG5ld0IgPSByICogbWF0cml4WzEwXSArIGcgKiBtYXRyaXhbMTFdICsgYiAqIG1hdHJpeFsxMl07XHJcblxyXG4gICAgcmV0dXJuIHJnYlRvSGV4KE1hdGgucm91bmQobmV3UiksIE1hdGgucm91bmQobmV3RyksIE1hdGgucm91bmQobmV3QikpO1xyXG59XHJcbiIsIi8vIPCfk4Qg7Iqk7YOA7J28IGltcG9ydFxyXG5pbXBvcnQgJy4vc3R5bGVzL3BhbmVsLmNzcyc7XHJcbmltcG9ydCAnLi9zdHlsZXMvYWktYW5hbHlzaXMuY3NzJztcclxuaW1wb3J0ICcuL3N0eWxlcy9jb250cmFzdC5jc3MnO1xyXG5cclxuLy8g8J+nqSDtlbXsi6wg6riw64qlIGltcG9ydFxyXG5pbXBvcnQgeyBpbml0UGFuZWwgfSBmcm9tICcuL2NvcmUvaW5pdFBhbmVsLmpzJztcclxuaW1wb3J0IHsgYW5hbHl6ZVdDQUcgfSBmcm9tICcuL2NvcmUvYW5hbHl6ZVdDQUcuanMnO1xyXG5pbXBvcnQgeyBhbmFseXplRm9yQUkgfSBmcm9tICcuL2NvcmUvYW5hbHl6ZUZvckFJLmpzJztcclxuaW1wb3J0IHsgaW5pdENoYXQgfSBmcm9tICcuL2NvcmUvY2hhdEJvdC5qcyc7XHJcblxyXG4vLyDwn5OaIOyDgeyImCDrjbDsnbTthLAgaW1wb3J0XHJcbmltcG9ydCB7IEtXQ0FHMjIgfSBmcm9tICcuL2NvbnN0YW50cy9LV0NBRzIyLmpzJztcclxuaW1wb3J0IHsgVURMX1BSSU5DSVBMRVMgfSBmcm9tICcuL2NvbnN0YW50cy9VRExfUFJJTkNJUExFUy5qcyc7XHJcblxyXG4vLyDwn5ug77iPIOycoO2LuOumrO2LsCBpbXBvcnRcclxuaW1wb3J0IHsgaGV4VG9SZ2IsIGdldENvbnRyYXN0VGV4dENvbG9yIH0gZnJvbSAnLi91dGlscy9jb2xvci5qcyc7XHJcblxyXG5jb25zb2xlLmxvZygn8J+agCBVREwg7Ju5IOygkeq3vOyEsSDrj4Tqtawg66Gc65Oc65CoJyk7XHJcblxyXG4vLyDwn5qAIFVETCDrj4Tqtawg7LSI6riw7ZmUIO2VqOyImFxyXG5mdW5jdGlvbiBpbml0VURMVG9vbCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCfinIUgVURMIOybuSDsoJHqt7zshLEg64+E6rWsIOy0iOq4sO2ZlCDsi5zsnpEnKTtcclxuXHJcbiAgICAvLyDsnbTrr7gg7Yyo64SQ7J20IOyeiOycvOuptCDsoJzqsbDtlZjqs6Ag7KKF66OMXHJcbiAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VkbC1hY2Nlc3NpYmlsaXR5LXBhbmVsJykpIHtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndWRsLWFjY2Vzc2liaWxpdHktcGFuZWwnKS5yZW1vdmUoKTtcclxuICAgICAgICBjb25zb2xlLmxvZygn8J+UhCDquLDsobQg7Yyo64SQIOygnOqxsOuQqCcpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIO2MqOuEkCDrsI8g7KO87JqUIOq4sOuKpSDstIjquLDtmZRcclxuICAgICAgICBpbml0UGFuZWwoKTtcclxuICAgICAgICBpbml0Q2hhdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCfinIUgVURMIOuPhOq1rCDstIjquLDtmZQg7JmE66OMJyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8g7IKs7Jqp7J6Q7JeQ6rKMIOyEseqztSDslYzrprxcclxuICAgICAgICBjb25zdCBub3RpZmljYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICBub3RpZmljYXRpb24uc3R5bGUuY3NzVGV4dCA9IGBcclxuICAgICAgICAgICAgcG9zaXRpb246IGZpeGVkOyB0b3A6IDIwcHg7IGxlZnQ6IDUwJTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMjhhNzQ1OyBjb2xvcjogd2hpdGU7IHBhZGRpbmc6IDEwcHggMjBweDtcclxuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogNXB4OyB6LWluZGV4OiAxMDAwMDAwOyBmb250LWZhbWlseTogQXJpYWw7XHJcbiAgICAgICAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDEwcHggcmdiYSgwLDAsMCwwLjMpO1xyXG4gICAgICAgIGA7XHJcbiAgICAgICAgbm90aWZpY2F0aW9uLnRleHRDb250ZW50ID0gJ+KchSBVREwg7Ju5IOygkeq3vOyEsSDrj4TqtazqsIAg7Zmc7ISx7ZmU65CY7JeI7Iq164uI64ukISc7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub3RpZmljYXRpb24pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIDPstIgg7ZuEIOyVjOumvCDsoJzqsbBcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKG5vdGlmaWNhdGlvbi5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgICBcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcign4p2MIFVETCDrj4Tqtawg7LSI6riw7ZmUIOyLpO2MqDonLCBlcnJvcik7XHJcbiAgICAgICAgYWxlcnQoJ1VETCDrj4Tqtazrpbwg7LSI6riw7ZmU7ZWY64qUIOykkSDsmKTrpZjqsIAg67Cc7IOd7ZaI7Iq164uI64ukOiAnICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIPCfjI0g7KCE7JetIO2VqOyImOuhnCDrk7HroZ0gKOu2geuniO2BtOumvyDtmLjtmZjshLEpXHJcbndpbmRvdy5pbml0VURMVG9vbCA9IGluaXRVRExUb29sO1xyXG53aW5kb3cuVURMID0ge1xyXG4gICAgaW5pdDogaW5pdFVETFRvb2wsXHJcbiAgICBhbmFseXplV0NBRyxcclxuICAgIGFuYWx5emVGb3JBSSxcclxuICAgIGNvbnN0YW50czogeyBLV0NBRzIyLCBVRExfUFJJTkNJUExFUyB9LFxyXG4gICAgdXRpbHM6IHsgaGV4VG9SZ2IsIGdldENvbnRyYXN0VGV4dENvbG9yIH1cclxufTtcclxuXHJcbi8vIPCfmoAg7KaJ7IucIOyLpO2WiVxyXG5pbml0VURMVG9vbCgpO1xyXG4iXSwibmFtZXMiOlsiaGV4VG9SZ2IiLCJoZXgiLCJyZXBsYWNlIiwiYmlnaW50IiwicGFyc2VJbnQiLCJyIiwiZyIsImIiLCJyZ2JUb0hleCIsIm1hcCIsInYiLCJNYXRoIiwibWF4IiwibWluIiwidG9TdHJpbmciLCJwYWRTdGFydCIsImpvaW4iLCJnZXRDb250cmFzdFRleHRDb2xvciIsImhleENvbG9yIiwiX2hleFRvUmdiIiwiYnJpZ2h0bmVzcyIsImFwcGx5Q29sb3JNYXRyaXgiLCJtYXRyaXgiLCJfaGV4VG9SZ2IyIiwibmV3UiIsIm5ld0ciLCJuZXdCIiwicm91bmQiLCJpbml0UGFuZWwiLCJhbmFseXplV0NBRyIsImFuYWx5emVGb3JBSSIsImluaXRDaGF0IiwiS1dDQUcyMiIsIlVETF9QUklOQ0lQTEVTIiwiY29uc29sZSIsImxvZyIsImluaXRVRExUb29sIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbW92ZSIsIm5vdGlmaWNhdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImNzc1RleHQiLCJ0ZXh0Q29udGVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsInNldFRpbWVvdXQiLCJwYXJlbnROb2RlIiwiZXJyb3IiLCJhbGVydCIsIm1lc3NhZ2UiLCJ3aW5kb3ciLCJVREwiLCJpbml0IiwiY29uc3RhbnRzIiwidXRpbHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///741\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [39], () => (__webpack_require__(741)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;