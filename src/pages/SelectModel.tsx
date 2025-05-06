import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useImageStore } from '../store/imageStore.tsx';
import { useRecentCaptureStore } from '../store/recentcaptureStore';
import { getRecentCapture } from '../api/recentcapture.ts';
import './SelectModel.css';
import ImageList from '../components/ImageList.tsx';
import Navbar from '../components/Navbar.tsx';

function SelectModel() {
    const navigate = useNavigate();
    // 선택한 모델
    const selectedModel = useImageStore(state => state.modelImageName);
    // 최근에 찍은 이미지 리스트
    // const recentImage = useRecentCaptureStore(state => state.recentImage);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<string | null>(null);

    useEffect(() => {
        if (selectedModel) {
            navigate('/resultloading');
        }
    }, [selectedModel, navigate]);

    // 최근 이미지 불러오기
    const handleLoadRecentImage = async () => {
        try {
            setIsLoading(true);
            setIsError(null);
            const res = await getRecentCapture();
            console.log('API 응답 데이터:', res);
        } catch (err) {
            console.error('error 발생', err);
            setIsError('error 발생');
        } finally {
            setIsLoading(false);
        }
    };

    // 직접 선택했을 때 리디렉션 처리
    const handleSelectAndContinue = () => {
        if (selectedModel) {
            navigate('/resultloading');
        }
    };

    return (
        <div className="select-model-container">
            <Navbar />
            <div className="content">
                <h1 className="title">모델을 선택해주세요</h1>
                <p className="subtitle">
                    가상 피팅에 사용할 모델을 선택하세요.
                </p>

                <ImageList imageType="model" />
                {/* 최근 이미지 불러오기 버튼 */}
                <div className="recent-images-button-container">
                    <button
                        className="load-recent-button"
                        onClick={handleLoadRecentImage}
                        disabled={isLoading}
                    >
                        {isLoading
                            ? '불러오는 중...'
                            : '최근 생성된 이미지 불러오기'}
                    </button>
                    {isError && <p className="error-message">{isError}</p>}
                </div>
                {selectedModel && (
                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <button
                            className="continue-button"
                            onClick={handleSelectAndContinue}
                        >
                            결과 확인하기
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SelectModel;
