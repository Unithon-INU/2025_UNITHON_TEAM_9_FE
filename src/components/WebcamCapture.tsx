import React, { useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { useRecentCaptureStore } from '../store/recentcaptureStore';
import './WebcamCapture.css';

// 제약 조건
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user',
};

const WebcamCapture: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const { setRecentImages } = useRecentCaptureStore(); // 최근 캡처된 이미지 저장
    const { setShowCamera } = useRecentCaptureStore(); // 카메라 접근 상태 저장
    const webcamRef = React.useRef<Webcam>(null);

    // 캡처된 이미지 저장(webcamRef 변하면 리렌더링)
    const handleCapture = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        console.log('captured!!!');
        // 새로 캡쳐한 이미지 저장 후, 종료
        if (imageSrc) {
            setRecentImages([imageSrc]);
            setShowCamera(false);
        }
    }, [webcamRef, setRecentImages, setShowCamera]); // setRecentImages 함수가 변경되면 리렌더링

    // 카메라 에러 처리
    const handleUserMediaError = useCallback((err: string | DOMException) => {
        console.error('UserMediaError:', err);
        setError('카메라 접근 권한이 필요해요!');
    }, []);

    // 카메라 접근 취소
    const handleCancel = useCallback(() => {
        setShowCamera(false);
    }, [setShowCamera]);

    return error ? (
        <div>
            {/* 접근 권한 없을 때*/}
            <p>{error}</p>
            <button onClick={handleCancel}>돌아가기</button>
        </div>
    ) : (
        <div>
            <Webcam
                audio={false}
                height={500}
                screenshotFormat="image/jpeg"
                width={720}
                ref={webcamRef}
                videoConstraints={videoConstraints}
                onUserMediaError={handleUserMediaError}
            />
            <button
                className="action-button-select-option"
                onClick={handleCapture}
            >
                Capture
            </button>
        </div>
    );
};

export default WebcamCapture;
