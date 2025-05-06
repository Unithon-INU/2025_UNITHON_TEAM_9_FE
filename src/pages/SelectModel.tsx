import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useImageStore } from '../store/imageStore.tsx';
import './SelectModel.css';
import ImageList from '../components/ImageList.tsx';
import Navbar from '../components/Navbar.tsx';

function SelectModel() {
    const navigate = useNavigate();
    const selectedModel = useImageStore(state => state.modelImageName);

    useEffect(() => {
        if (selectedModel) {
            navigate('/resultloading');
        }
    }, [selectedModel, navigate]);

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

                <div className="model-grid">
                    <ImageList imageType="model" />
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
