// src/pages/ResultLoading.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImageStore } from '../store/imageStore';
import {requestPrediction, requestPredictionRecent} from '../api/api';
import {fetchImageBlob} from '../utils/blob';

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
                // console.log(`images: ${modelImageName} ${clothImageName}`)
                const clothBlob = await fetchImageBlob(`/chakbootlounge/images/clothes/${clothImageName}`);

                let modelBlob: Blob;
                if (modelImageName.startsWith('data:image')) {
                    await requestPredictionRecent(clothBlob);
                } else {
                    modelBlob = await fetchImageBlob(`/chakbootlounge/images/models/${modelImageName}`);
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
    }, [modelImageName, navigate]);

    const handleClick = () => {
        navigate('/');
    };

    return <div>
        {/*<img src={modelImageName ?? ""} alt={"x"}/>*/}
        <h1>결과 생성 중입니다... 잠시만 기다려주세요 (약 20초 소요)</h1>
        <button className="start-button" onClick={handleClick}>
            안되는 것 같으면 재시도하기
        </button>
    </div>;
}

export default ResultLoading;