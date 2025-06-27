// src/pages/ResultLoading.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageStore } from '../store/imageStore';
import { requestPrediction } from '../api/api';
import { fetchImageBlob } from '../utils/blob';
import './ResultLoading.css';
import Navbar from '../components/Navbar';

function ResultLoading() {
    const navigate = useNavigate();
    const { clothImageName, modelImageName } = useImageStore();
    const [status, setStatus] = useState('로딩 시작 대기');

    const logoUrl = './images/bubble.svg';

    useEffect(() => {
        const runPrediction = async () => {
            if (!clothImageName || !modelImageName) {
                console.error('Missing image names');
                return;
            }

            setStatus(
                '당신의 피팅 결과를 준비중이에요! \n 약 3분 정도 소요됩니다.'
            );

            try {
                setStatus(
                    '당신의 피팅 결과를 준비중이에요! \n 약 3분 정도 소요됩니다.'
                );
                const clothBlob = await fetchImageBlob(
                    `/chakbootlounge/images/clothes/${clothImageName}`
                );

                let modelBlob: Blob;

                if (modelImageName.startsWith('data:image')) {
                    // 1. 웹캠으로 찍은 사진
                    const base64Response = await fetch(modelImageName);
                    modelBlob = await base64Response.blob();

                    // AbortController로 타임아웃 5분 설정
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => {
                        controller.abort();
                    }, 300000);

                    try {
                        await requestPrediction(
                            modelBlob,
                            clothBlob,
                            controller.signal
                        );

                        clearTimeout(timeoutId);
                    } catch (error: unknown) {
                        if (
                            error instanceof Error &&
                            error.name === 'AbortError'
                        ) {
                            setStatus(
                                '서버가 혼잡합니다. 잠시 후 다시 시도해주세요.'
                            );
                        } else {
                            throw error;
                        }
                    }
                } else {
                    // 2. 기본 제공된 가상 아바타
                    modelBlob = await fetchImageBlob(
                        `/chakbootlounge/images/models/${modelImageName}`
                    );

                    // AbortController로 타임아웃 5분 설정
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => {
                        controller.abort();
                    }, 300000);

                    try {
                        await requestPrediction(
                            modelBlob,
                            clothBlob,
                            controller.signal
                        );

                        clearTimeout(timeoutId);
                    } catch (error: unknown) {
                        if (
                            error instanceof Error &&
                            error.name === 'AbortError'
                        ) {
                            setStatus(
                                '서버가 혼잡합니다. 잠시 후 다시 시도해주세요.'
                            );
                        } else {
                            throw error;
                        }
                    }
                }
                // 완료되면 result 페이지로 이동
                navigate('/result');
            } catch (err) {
                console.error('Prediction error:', err);
                // 에러 페이지나 재시도 처리 가능
                setStatus('오류가 발생했습니다. 다시 시도해주세요.');
            }
        };

        runPrediction();
    }, [clothImageName, modelImageName, navigate]);

    return (
        <div className="result-loading-container">
            <Navbar />
            <div className="logo-container">
                <img src={logoUrl} alt="logo" />
            </div>
            <h1 className="loading-text-main">{status}</h1>
        </div>
    );
}

export default ResultLoading;
