import { useNavigate } from 'react-router-dom';
import { useImageStore } from '../store/imageStore.tsx';
import Navbar from '../components/Navbar.tsx';
import './SelectCloth.css';
import ImageList from '../components/ImageList.tsx';

function SelectCloth() {
    const navigate = useNavigate();
    const selectedCloth = useImageStore(state => state.clothImageName);

    // 직접 선택했을 때 리디렉션 처리
    const handleSelectAndContinue = () => {
        if (selectedCloth) {
            navigate('/selectoption');
        }
    };

    return (
        <div className="select-cloth-container">
            <div className="content">
                <Navbar />
                <ImageList imageType="cloth" />
                {selectedCloth && (
                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <button
                            className="continue-button"
                            onClick={handleSelectAndContinue}
                        >
                            다음 단계로
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SelectCloth;
