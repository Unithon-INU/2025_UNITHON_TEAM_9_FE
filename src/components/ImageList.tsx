import { useImageStore } from '../store/imageStore.tsx';
import React from 'react';

const clothList = [
    'cloth01.png',
    'cloth02.png',
];

const modelList = [
    'man01.png',
    'woman01.png',
];

type ImageListProps = {
    imageType: string
};


const ImageList: React.FC<ImageListProps>  = ({ imageType })  => {
    const setClothImage = useImageStore((state) => state.setClothImage);
    const setModelImage = useImageStore((state) => state.setModelImage);

    const imageList = imageType === 'cloth' ? clothList : modelList;
    const imageFolder = imageType === 'cloth' ? 'clothes' : 'models';

    const handleClick = (name: string) => {
        if (imageType === 'cloth') {
            setClothImage(name);
        } else {
            setModelImage(name);
        }
    };

    return (
        <div>
            {imageList.map((name) => (
                <img
                    key={name}
                    src={`/images/${imageFolder}/${name}`}
                    alt={name}
                    style={{ width: 200, margin: 10, cursor: 'pointer' }}
                    onClick={() => handleClick(name)}
                />
            ))}
        </div>
    );
};

export default ImageList;