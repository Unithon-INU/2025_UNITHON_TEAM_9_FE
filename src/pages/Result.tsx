// src/pages/Result.tsx (수정)
import React from 'react';
import { usePredictionStore } from '../store/predictionStore';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Navbar 추가
import './Result.css'; // CSS 파일 임포트

const Result: React.FC = () => {
    const navigate = useNavigate();
    const { resultImage, resultUrl } = usePredictionStore();

    if (!resultImage || !resultUrl) {
        // 로딩 중이거나 데이터가 없을 때의 UI (필요에 따라 더 구체화 가능)
        return (
            <div className="result-container">
                <Navbar />
                <p className="loading-or-error-text">
                    결과 데이터를 불러오는 중이거나 데이터가 없습니다.
                </p>
                <button className="back-button" onClick={() => navigate('/')}>
                    홈으로 돌아가기
                </button>
            </div>
        );
    }

    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="result-page-wrapper">
            <Navbar />
            <div className="result-container">
                <h2 className="result-title">✨가상 피팅 결과✨</h2>
                {/* 결과 이미지 카드 */}
                <div className="result-image-card">
                    <img
                        src={resultImage}
                        alt="Prediction Result"
                        className="result-image"
                    />
                </div>

                {/* QR 코드 및 공유 섹션 */}
                <div className="share-section">
                    <h2 className="share-title">결과 공유 QR 코드</h2>
                    <div className="qr-code-wrapper">
                        <QRCodeCanvas
                            value={resultUrl}
                            size={180}
                            bgColor="#ffffff"
                            fgColor="#000000"
                        />
                    </div>
                    <p className="share-url">{resultUrl}</p>
                </div>

                <button className="back-button" onClick={handleGoBack}>
                    처음으로 돌아가기
                </button>
            </div>
        </div>
    );
};

export default Result;
