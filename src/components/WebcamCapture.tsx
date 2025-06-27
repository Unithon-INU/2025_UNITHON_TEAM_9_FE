import React, { useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { useRecentCaptureStore } from '../store/recentcaptureStore';
import './WebcamCapture.css';
import { useImageStore } from '../store/imageStore';

// 제약 조건
const videoConstraints = {
    width: 480,
    height: 800,
    facingMode: 'user',
};

const WebcamCapture: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const { setRecentImages } = useRecentCaptureStore(); // 최근 캡처된 이미지 저장
    const { setModelImage } = useImageStore();
    const { setShowCamera } = useRecentCaptureStore(); // 카메라 접근 상태 저장
    const webcamRef = React.useRef<Webcam>(null);

    // 방금 캡처한 이미지 저장
    const handleCapture = React.useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        console.log('찰칵');

        if (imageSrc) {
            // 새로 캡쳐한 이미지를 recentImages에 저장 (미리보기용)
            setRecentImages([imageSrc]);
            setShowCamera(false);
            // setModelImage에도 저장.
            setModelImage(imageSrc);
        }
    }, [webcamRef, setRecentImages, setShowCamera, setModelImage]); // setRecentImages 함수가 변경되면 리렌더링

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
