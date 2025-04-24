// core/colorBlindness.js
import { applyColorMatrix, hexToRgb, rgbToHex } from '../utils/color.js';
import { COLOR_MATRICES } from '../constants/colorMatrices.js';

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

export function initColorBlindTester() {
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
        strengthValue.textContent = `${strengthSlider.value}%`;
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
                    applyCanvasFilter(img);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    function updateColorSamples() {
        const type = typeSelect.value;
        const strength = parseFloat(strengthSlider.value) / 100;
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

            samplesContainer.appendChild(sample);
        });

        const img = originalPreview.querySelector('img');
        if (img) {
            applyCanvasFilter(img);
        }
    }

    function applyCanvasFilter(img) {
        const type = typeSelect.value;
        const strength = parseFloat(strengthSlider.value) / 100;
        const canvas = simulationCanvas;
        const ctx = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const [newR, newG, newB] = applyColorMatrix({ r, g, b }, type, strength, true);
            data[i] = newR;
            data[i + 1] = newG;
            data[i + 2] = newB;
        }

        ctx.putImageData(imageData, 0, 0);
    }
}

export const checkColorBlindness = initColorBlindTester;
