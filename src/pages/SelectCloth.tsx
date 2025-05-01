import ImageList from "../components/ImageList.tsx";
import { useNavigate } from 'react-router-dom';
import { useImageStore } from '../store/imageStore.tsx';
import { useEffect } from "react";

function SelectCloth() {
    const navigate = useNavigate();
    const clothImageName = useImageStore((state) => state.clothImageName);

    useEffect(() => {
        if (clothImageName) {
            navigate('/selectmodel');
        }
    }, [clothImageName, navigate]);

    return (
        <div className="select_cloth">
            <h1>Cloth Image List</h1>
            <ImageList imageType="cloth"/>
        </div>
    );
}

export default SelectCloth;