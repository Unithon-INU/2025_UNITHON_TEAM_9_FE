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

            <h1 className="title">
                AI를 이용해서 원하는 옷을 편하게 입어보세요!
            </h1>
            <p className="subtitle">
                가상 피팅 경험을 제공하여, 옷을 직접 입어보지 않고도
                <br />
                피팅 결과를 확인할 수 있습니다
            </p>

            <button className="start-button" onClick={handleClick}>
                가상 피팅 경험해보기
            </button>

            <div className="image-preview"></div>
        </div>
    );
}

export default Home;
