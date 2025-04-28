// src/core/colorBlindness.js
import '../styles/colorBlindness.css';

const originalColors = [
    { hex: '#E53935', name: '빨강' },
    { hex: '#43A047', name: '녹색' },
    { hex: '#1E88E5', name: '파랑' },
    { hex: '#FDD835', name: '노랑' },
    { hex: '#8E24AA', name: '보라' },
    { hex: '#00ACC1', name: '청록' },
    { hex: '#FF9800', name: '주황' },
    { hex: '#6D4C41', name: '갈색' }
];

const matrices = {
    normal: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    protanopia: [0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0],
    deuteranopia: [0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0],
    tritanopia: [0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0],
    achromatopsia: [0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0.299, 0.587, 0.114, 0, 0, 0, 0, 0, 1, 0]
};

export function checkColorBlindness() {
    const colorblindContent = document.getElementById('tab-content-colorblind');
    colorblindContent.innerHTML = '<div class="loading">색맹 검사 도구 로딩 중...</div>';

    setTimeout(() => {
        colorblindContent.innerHTML = getColorBlindnessHTML();
        initColorBlindTester();
    }, 500);
}

function initColorBlindTester() {
    const typeSelect = document.getElementById('colorblind-type');
    const strengthSlider = document.getElementById('colorblind-strength');
    const strengthValue = document.getElementById('strength-value');
    const samplesContainer = document.getElementById('colorblind-samples');
    const imageUpload = document.getElementById('image-upload');
    const originalPreview = document.getElementById('original-image-preview');
    const simulationCanvas = document.getElementById('simulation-canvas');

    updateColorSamples();

    typeSelect.addEventListener('change', updateColorSamples);
    strengthSlider.addEventListener('input', () => {
        strengthValue.textContent = strengthSlider.value + '%';
        updateColorSamples();
    });

    imageUpload.addEventListener('change', e => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = event => {
                const img = new Image();
                img.onload = () => {
                    originalPreview.innerHTML = '';
                    originalPreview.appendChild(img.cloneNode());
                    applyColorBlindFilter(img, true); // 업로드 때는 isFirstLoad = true
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });
}

function updateColorSamples() {
    const type = document.getElementById('colorblind-type').value;
    const strength = parseFloat(document.getElementById('colorblind-strength').value) / 100;
    const samplesContainer = document.getElementById('colorblind-samples');
    const originalPreview = document.getElementById('original-image-preview');

    samplesContainer.innerHTML = '';

    originalColors.forEach(color => {
        const sample = document.createElement('div');
        sample.className = 'color-sample';
        sample.textContent = `${color.hex} (${color.name})`;

        const transformedColor = applyColorMatrix(color.hex, type, strength);
        sample.style.backgroundColor = transformedColor;

        const rgb = hexToRgb(transformedColor);
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        sample.style.color = brightness > 125 ? 'black' : 'white';
        sample.style.textShadow = brightness > 125 ? '0 0 2px rgba(255,255,255,0.7)' : '0 0 2px rgba(0,0,0,0.7)';

        samplesContainer.appendChild(sample);
    });

    const img = originalPreview.querySelector('img');
    if (img) {
        applyColorBlindFilter(img);
    }
}

function applyColorMatrix(hexColor, type, strength) {
    const rgb = hexToRgb(hexColor);
    const matrix = matrices[type] || matrices.normal;

    const blendedMatrix = matrix.map((value, i) =>
        matrices.normal[i] * (1 - strength) + value * strength
    );

    const r = rgb.r * blendedMatrix[0] + rgb.g * blendedMatrix[1] + rgb.b * blendedMatrix[2];
    const g = rgb.r * blendedMatrix[5] + rgb.g * blendedMatrix[6] + rgb.b * blendedMatrix[7];
    const b = rgb.r * blendedMatrix[10] + rgb.g * blendedMatrix[11] + rgb.b * blendedMatrix[12];

    return rgbToHex(Math.round(r), Math.round(g), Math.round(b));
}

function applyColorBlindFilter(img, isFirstLoad = false) {
    const type = document.getElementById('colorblind-type').value;
    const strength = parseFloat(document.getElementById('colorblind-strength').value) / 100;
    const canvas = document.getElementById('simulation-canvas');
    const ctx = canvas.getContext('2d');

    if (isFirstLoad) {
        canvas.width = img.width;
        canvas.height = img.height;
    }

    ctx.drawImage(img, 0, 0);

    if (type !== 'normal') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        const blendedMatrix = matrices[type].map((v, i) =>
            matrices.normal[i] * (1 - strength) + v * strength
        );

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i + 1], b = data[i + 2];
            data[i] = r * blendedMatrix[0] + g * blendedMatrix[1] + b * blendedMatrix[2];
            data[i + 1] = r * blendedMatrix[5] + g * blendedMatrix[6] + b * blendedMatrix[7];
            data[i + 2] = r * blendedMatrix[10] + g * blendedMatrix[11] + b * blendedMatrix[12];
        }

        ctx.putImageData(imageData, 0, 0);
    }
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
    };
}

function rgbToHex(r, g, b) {
    return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

export function getColorBlindnessHTML() {
    return `
    <div class="colorblind-tester">
      <div class="contrast-summary">
        <h3>색맹 시뮬레이션 도구</h3>
        <p>웹 페이지 색상을 색맹 사용자 입장에서 시뮬레이션합니다.</p>
        <p>시뮬레이션할 색맹 유형과 강도를 선택하세요:</p>
      </div>

      <div class="colorblind-controls">
        <div class="control-group">
          <label for="colorblind-type">색맹 유형</label>
          <select id="colorblind-type" class="select-control">
            <option value="normal">일반 시력</option>
            <option value="protanopia">적색맹 (Protanopia)</option>
            <option value="deuteranopia">녹색맹 (Deuteranopia)</option>
            <option value="tritanopia">청색맹 (Tritanopia)</option>
            <option value="achromatopsia">완전색맹 (Achromatopsia)</option>
          </select>
        </div>

        <div class="control-group">
          <label for="colorblind-strength">강도</label>
          <input type="range" id="colorblind-strength" min="0" max="100" value="100" class="range-control">
          <span id="strength-value">100%</span>
        </div>
      </div>

      <div class="colorblind-preview">
        <div class="preview-container">
          <h4>원본 색상 샘플</h4>
          <div class="color-samples original-samples">
            <div class="color-sample" style="background-color: #E53935;">#E53935 (빨강)</div>
            <div class="color-sample" style="background-color: #43A047;">#43A047 (녹색)</div>
            <div class="color-sample" style="background-color: #1E88E5;">#1E88E5 (파랑)</div>
            <div class="color-sample" style="background-color: #FDD835;">#FDD835 (노랑)</div>
            <div class="color-sample" style="background-color: #8E24AA;">#8E24AA (보라)</div>
            <div class="color-sample" style="background-color: #00ACC1;">#00ACC1 (청록)</div>
            <div class="color-sample" style="background-color: #FF9800;">#FF9800 (주황)</div>
            <div class="color-sample" style="background-color: #6D4C41;">#6D4C41 (갈색)</div>
          </div>
        </div>

        <div class="preview-container">
          <h4>시뮬레이션 결과</h4>
          <div class="color-samples" id="colorblind-samples"></div>
        </div>
      </div>

      <div class="colorblind-upload">
        <h4>이미지 색맹 시뮬레이션</h4>
        <p>이미지를 업로드하여 색맹 시뮬레이션 결과를 확인하세요:</p>
        <input type="file" id="image-upload" accept="image/*" class="file-input">

        <div class="image-preview">
          <div class="preview-original">
            <h5>원본 이미지</h5>
            <div id="original-image-preview"></div>
          </div>
          <div class="preview-simulation">
            <h5>시뮬레이션 결과</h5>
            <canvas id="simulation-canvas"></canvas>
          </div>
        </div>
      </div>

      <div class="colorblind-info">
        <h4>색맹에 대한 이해</h4>
        <ul>
          <li><strong>적색맹 (Protanopia)</strong>: 빨강 인식 어려움</li>
          <li><strong>녹색맹 (Deuteranopia)</strong>: 녹색 인식 어려움</li>
          <li><strong>청색맹 (Tritanopia)</strong>: 파랑 인식 어려움</li>
          <li><strong>완전색맹 (Achromatopsia)</strong>: 모든 색을 흑백으로 인식</li>
        </ul>
        <h4>접근성 디자인 팁</h4>
        <ul>
          <li>색상 외에도 텍스트, 아이콘, 패턴 등을 함께 사용하세요.</li>
          <li>빨강-녹색 조합 사용을 피하고 대비를 충분히 확보하세요.</li>
          <li>중요한 정보를 단일 색상으로 표현하지 마세요.</li>
        </ul>
      </div>
    </div>
  `;
}

