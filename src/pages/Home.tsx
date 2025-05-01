import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/selectcloth');
    };

    return (
        <div className="select_cloth">
            <h1>응애 착붙 프론트 없어 ㅋ</h1>
            <button onClick={handleClick}>옷 선택하러 가기</button>
        </div>
    );
}

export default Home;