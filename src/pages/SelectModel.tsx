// src/pages/SelectModel.tsx (수정)
import { useNavigate } from 'react-router-dom';
import { useImageStore } from '../store/imageStore.tsx';
import './SelectModel.css';
import ImageList from '../components/ImageList.tsx';
import Navbar from '../components/Navbar.tsx';

function SelectModel() {
    const navigate = useNavigate();
    const selectedModel = useImageStore(state => state.modelImageName);

    const handleSelectAndContinue = () => {
        if (selectedModel) {
            navigate('/resultloading');
        }
    };

    return (
        <div className="select-model-container">
            <Navbar />
            <div className="content">
                <ImageList imageType="model" />

                {selectedModel && (
                    <div className="continue-button-wrapper">
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
