import { useEffect } from 'react';
import './SelectOption.css';
import Navbar from '../components/Navbar';
import { useImageStore } from '../store/imageStore';
import { useRecentCaptureStore } from '../store/recentcaptureStore';
import WebcamCapture from '../components/WebcamCapture';
import { useNavigate } from 'react-router-dom';

const cameraIconUrl = './images/camera-icon/camera.png';
const modelImageUrl = './images/models/man01.png';

const SelectOption: React.FC = () => {
    const navigate = useNavigate();
    const { showCamera, setShowCamera, recentImages, resetRecentImages } =
        useRecentCaptureStore();
    const { setModelImage } = useImageStore();

    // 카메라 촬영 버튼
    const handleCapture = () => {
        setShowCamera(true);
    };

    // 가상 아바타 선택 버튼
    const handleSelectModel = () => {
        navigate('/selectmodel');
    };

    // 방금 캡처한 이미지를 모델로 선택하여 합성 ㄱㄱ하기 -> modelImage에 최종 저장 후 resultloading으로 이동
    const handleSelectAndContinue = () => {
        if (recentImages.length > 0) {
            console.log(
                '방금 찍은 사진: ',
                recentImages[0].substring(0, 50) + '...'
            );
            setModelImage(recentImages[0]);
            navigate('/resultloading');
        }
    };

    useEffect(() => {
        // 옷 선택 후 이전에 캡처한 이미지가 있으면 초기화
        const { clothImageName } = useImageStore.getState();
        if (clothImageName) {
            resetRecentImages();
        }
    }, [resetRecentImages]);

    return (
        <div>
            {showCamera ? (
                <WebcamCapture />
            ) : recentImages.length > 0 ? (
                <div className="captured-image-container">
                    <Navbar />
                    <h2 className="main-title-select-option">캡처된 이미지</h2>
                    <div className="captured-image">
                        <img src={recentImages[0]} alt="캡처된 이미지" />
                    </div>
                    <div className="button-container">
                        <button
                            className="action-button-select-option"
                            onClick={() => setShowCamera(true)}
                        >
                            다시 촬영하기
                        </button>
                        <button
                            className="action-button-select-option primary"
                            onClick={handleSelectAndContinue}
                        >
                            이 사진으로 계속하기
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <Navbar />
                    <div className="page-container-select-option">
                        <h1 className="main-title-select-option">
                            희망하는 옵션을 선택해 주세요
                        </h1>
                        <div className="options-layout-select-option">
                            {/* 사진 찍기 */}
                            <div className="option-box-select-option">
                                <div className="image-upload-area-select-option">
                                    <img
                                        src={cameraIconUrl}
                                        alt="Camera Icon"
                                        className="icon-camera-select-option"
                                    />
                                </div>
                                <button
                                    className="action-button-select-option"
                                    onClick={handleCapture}
                                >
                                    직접 촬영하기
                                </button>
                            </div>

                            {/* 가상 아바타 선택하기 */}
                            <div className="option-box-select-option">
                                <div className="avatar-image-area-select-option">
                                    <img
                                        src={modelImageUrl}
                                        alt="Virtual Avatar"
                                        className="image-avatar-select-option"
                                    />
                                </div>
                                <button
                                    className="action-button-select-option"
                                    onClick={handleSelectModel}
                                >
                                    가상 아바타
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectOption;
