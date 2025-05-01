
// src/pages/Result.tsx
import React from 'react';
import { usePredictionStore } from '../store/predictionStore';
import { QRCodeCanvas } from 'qrcode.react'; // 또는 QRCodeSVG

const Result: React.FC = () => {
    const { resultImage, resultUrl } = usePredictionStore();

    if (!resultImage || !resultUrl) {
        return <p>결과 데이터가 없습니다.</p>;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>가상 피팅 결과</h1>
            <img
                src={resultImage}
                alt="Prediction Result"
                style={{ maxWidth: 400, marginBottom: 20 }}
            />
            <h2>결과 공유 QR 코드</h2>
            <QRCodeCanvas value={resultUrl} size={200} />
            <p style={{ marginTop: 10 }}>{resultUrl}</p>
        </div>
    );
};

export default Result;