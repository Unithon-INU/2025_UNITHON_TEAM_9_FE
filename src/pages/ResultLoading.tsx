// src/pages/ResultLoading.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageStore } from '../store/imageStore';
import { requestPrediction } from '../api/api';
import { fetchImageBlob } from '../utils/blob';

function ResultLoading() {
    const navigate = useNavigate();
    const { clothImageName, modelImageName } = useImageStore();

    useEffect(() => {
        const runPrediction = async () => {
            if (!clothImageName || !modelImageName) {
                console.error('Missing image names');
                return;
            }

            try {
                const modelBlob = await fetchImageBlob(`/images/models/${modelImageName}`);
                const clothBlob = await fetchImageBlob(`/images/clothes/${clothImageName}`);

                await requestPrediction(modelBlob, clothBlob);

                // 완료되면 result 페이지로 이동
                navigate('/result');
            } catch (err) {
                console.error('Prediction error:', err);
                // 에러 페이지나 재시도 처리 가능
            }
        };

        runPrediction();
    }, [clothImageName, modelImageName, navigate]);

    return <div><h2>결과 생성 중입니다...</h2></div>;
}

export default ResultLoading;