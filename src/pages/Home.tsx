import { useNavigate } from 'react-router-dom';
import { useImageStore } from '../store/imageStore.tsx';
import Navbar from '../components/Navbar.tsx';
import { useEffect } from 'react';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const resetImages = useImageStore(state => state.resetImages);

    useEffect(() => {
        // 홈 페이지 마운트 시 이미지 선택 상태 초기화
        resetImages();
    }, [resetImages]);

    const handleClick = () => {
        navigate('/selectcloth');
    };

    return (
        <div className="home-container">
            <Navbar />

            <h1 className="title">가상 피팅 체험하기</h1>
            <p className="subtitle">
                원하는 옷과 모델을 선택하여 가상 피팅을 경험해보세요. 나에게
                어울리는 스타일을 찾아보세요!
            </p>

            <button className="start-button" onClick={handleClick}>
                시작하기
            </button>

            <div className="image-preview">
                <div className="preview-item">
                    <img src="/images/models/woman01.png" alt="옷 미리보기" />
                </div>
                <div className="preview-item">
                    <img src="/images/models/man01.png" alt="모델 미리보기" />
                </div>
            </div>
        </div>
    );
}

export default Home;
