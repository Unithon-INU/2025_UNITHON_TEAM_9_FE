// src/pages/ResultLoading.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageStore } from '../store/imageStore';
import { requestPrediction } from '../api/api';
import { fetchImageBlob } from '../utils/blob';
import './ResultLoading.css';

function ResultLoading() {
    const navigate = useNavigate();
    const { clothImageName, modelImageName } = useImageStore();

    useEffect(() => {
        const runPrediction = async () => {
            // Test code
            console.log('loading result...');
            console.log(
                '선택된 모델 이름: ',
                modelImageName
                    ? modelImageName.substring(0, 50) + '...'
                    : 'null'
            );
            console.log('선택된 옷 이름: ', clothImageName);

            if (!clothImageName || !modelImageName) {
                console.error('Missing image names');
                return;
            }

            try {
                const clothBlob = await fetchImageBlob(
                    `/chakbootlounge/images/clothes/${clothImageName}`
                );

                let modelBlob: Blob;

                if (modelImageName.startsWith('data:image')) {
                    // 1. 웹캠으로 찍은 사진
                    // data URL을 Fetch API로 요청해서 Blob 객체로 변환
                    const base64Response = await fetch(modelImageName);
                    modelBlob = await base64Response.blob();

                    await requestPrediction(modelBlob, clothBlob);
                } else {
                    // 2. 기본 제공된 가상 아바타
                    modelBlob = await fetchImageBlob(
                        `/chakbootlounge/images/models/${modelImageName}`
                    );

                    await requestPrediction(modelBlob, clothBlob);
                }
                // 완료되면 result 페이지로 이동
                navigate('/result');
            } catch (err) {
                console.error('Prediction error:', err);
                // 에러 페이지나 재시도 처리 가능
            }
        };

        runPrediction();
    }, [clothImageName, modelImageName, navigate]);

    const handleClick = () => {
        navigate('/');
    };

    return (
        <div className="result-loading-container">
            <h1 className="loading-title">
                결과 생성 중입니다... 잠시만 기다려주세요 (약 20초 소요)
            </h1>

            <button className="retry-button" onClick={handleClick}>
                재시도하기
            </button>
        </div>
    );
}

export default ResultLoading;
