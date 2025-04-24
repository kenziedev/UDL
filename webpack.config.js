// webpack.config.js
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: 'development', // 또는 'production'으로 변경 가능
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,           // 이전 번들 제거
        module: true           // ES Module로 출력
    },
    experiments: {
        outputModule: true      // ES Module 사용 허용
    },
    module: {
        rules: [
            {
                test: /\.js$/,        // .js 파일 모두
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'] // Babel 프리셋
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'], // ✅ CSS 로더 추가
            }
        ]
    },
    devtool: 'source-map',     // 디버깅용 소스맵
    devServer: {
        static: './dist',        // 정적 파일 경로
        port: 8080,              // 개발 서버 포트
        open: true,              // 브라우저 자동 열기
        hot: true                // HMR(핫 리로딩) 사용
    }
};
