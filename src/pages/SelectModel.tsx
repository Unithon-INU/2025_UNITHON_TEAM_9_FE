import ImageList from "../components/ImageList.tsx";
import {useNavigate} from "react-router-dom";
import {useImageStore} from "../store/imageStore.tsx";
import {useEffect} from "react";


function SelectModel() {
    const navigate = useNavigate();
    const modelImageName = useImageStore((state) => state.modelImageName);

    useEffect(() => {
        if (modelImageName) {
            navigate('/resultloading');
        }
    }, [modelImageName, navigate]);

    return (
        <div className="select_cloth">
            <h1>Cloth Image List</h1>
            <ImageList imageType="model"/>
        </div>
    );
}

export default SelectModel;