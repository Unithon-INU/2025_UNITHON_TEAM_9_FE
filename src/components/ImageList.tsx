import { useImageStore } from '../store/imageStore.tsx';
import { useRecentCaptureStore } from '../store/recentcaptureStore';
import './ImageList.css';
import React, { useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const clothList = [
    {
        id: 1,
        name: '모즈모즈 흰색',
        category: '상의',
        image: 'cloth01.png',
    },
    {
        id: 2,
        name: '모즈모즈 검은색',
        category: '상의',
        image: 'cloth02.png',
    },
    {
        id: 3,
        name: 'cloth03',
        category: '상의',
        image: 'cloth03.png',
    },
    {
        id: 4,
        name: 'cloth04',
        category: '상의',
        image: 'cloth04.png',
    },
    {
        id: 5,
        name: 'cloth05',
        category: '상의',
        image: 'cloth05.png',
    },
    {
        id: 6,
        name: 'cloth06',
        category: '상의',
        image: 'cloth06.png',
    },
    {
        id: 7,
        name: 'cloth07',
        category: '상의',
        image: 'cloth07.png',
    },
    {
        id: 8,
        name: 'cloth08',
        category: '상의',
        image: 'cloth08.png',
    },
    {
        id: 9,
        name: 'cloth09',
        category: '상의',
        image: 'cloth09.png',
    },
    {
        id: 10,
        name: 'cloth10',
        category: '상의',
        image: 'cloth10.png',
    },
    {
        id: 11,
        name: 'cloth11',
        category: '상의',
        image: 'cloth11.png',
    },
    {
        id: 12,
        name: 'cloth12',
        category: '상의',
        image: 'cloth12.png',
    },
    {
        id: 13,
        name: 'cloth13',
        category: '상의',
        image: 'cloth13.png',
    },
];

const modelList = [
    { id: 1, name: 'man01', category: '모델', image: 'man01.png' },
    { id: 2, name: 'woman01', category: '모델', image: 'woman01.png' },
];

type ImageListProps = {
    imageType: string;
};

const ImageList: React.FC<ImageListProps> = ({ imageType }) => {
    const setClothImage = useImageStore(state => state.setClothImage);
    const setModelImage = useImageStore(state => state.setModelImage);
    const recentImages = useRecentCaptureStore(state => state.recentImages); // 최근 찍은 사진 리스트
    const clothImageName = useImageStore(state => state.clothImageName); // 선택 이미지 상태
    const modelImageName = useImageStore(state => state.modelImageName); // 선택 모델 상태
    const [searchTerm, setSearchTerm] = useState(''); // 옷 검색어 상태

    // 검색 필터링 반영된 리스트
    const filteredItems = useMemo(() => {
        const items = imageType === 'cloth' ? clothList : modelList;
        return items.filter(
            item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [imageType, searchTerm]);

    // 현재 선택된 요소 타입
    const selectedImage =
        imageType === 'cloth' ? clothImageName : modelImageName;

    // 기존 모델 리스트 + 최근에 찍은 사진 5개 결합
    const combinedModelList = useMemo(() => {
        if (imageType === 'model') {
            const baseItems = searchTerm ? filteredItems : modelList;
            if (recentImages.length > 0) {
                // 이미지 5개 가져옴
                const recentCapturedImages = recentImages
                    .slice(0, 5)
                    .map((img, idx) => ({
                        id: 1000 + idx,
                        name: `recent${idx + 1}`,
                        category: `최근 촬영`,
                        image: img,
                    }));
                // 모델 리스트 + 최근에 찍은 사진 5개 추가
                return [...filteredItems, ...recentCapturedImages];
            }
            return baseItems;
        }
        return searchTerm ? filteredItems : clothList;
    }, [imageType, recentImages, filteredItems, searchTerm]);

    // const imageList = imageType === 'cloth' ? clothList : modelList;
    const imageFolder = imageType === 'cloth' ? 'clothes' : 'models';
    const itemClass = 'image-item'; // cloth or model

    // 이미지 파일 구분 처리
    const getImageSrc = (name: string) => {
        // data:image로 시작하는 base64 이미지인지 확인
        if (name.startsWith('data:image')) {
            return name; // base64 데이터는 그대로 사용
        }
        // 일반 파일명이면 경로 추가
        return `/chakbootlounge/images/${imageFolder}/${name}`;
    };

    const handleClick = (name: string) => {
        if (imageType === 'cloth') {
            setClothImage(name);
        } else {
            setModelImage(name);
        }
        // console.log('ImageList handleClick ' + name + ', ' + imageType);
    };

    return (
        <div>
            <div className="search-container">
                <div className="search-input-wrapper">
                    <FiSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder={`${
                            imageType === 'cloth' ? '의류' : '모델'
                        }명 또는 카테고리로 검색`}
                        className="search-input"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className={`${imageType}-list`}>
                {imageType === 'model' && recentImages.length > 0
                    ? // 최근 이미지 리스트 + 모델 목록 띄우기
                      combinedModelList.map(item => (
                          <div
                              key={item.id}
                              className={`item-box ${itemClass} ${
                                  selectedImage === item.image ? 'selected' : ''
                              }`}
                              onClick={() => handleClick(item.image)}
                          >
                              <div>{item.name}</div>
                              <img
                                  src={getImageSrc(item.image)}
                                  alt={item.name}
                              />
                              {selectedImage === item.name && (
                                  <div className="selected-indicator">
                                      <div className="check-icon"></div>
                                  </div>
                              )}
                          </div>
                      ))
                    : // 기존 모델 목록 띄우기 (최근 이미지 없음)
                      filteredItems.map(item => (
                          <div
                              key={item.id}
                              className={`item-box ${itemClass} ${
                                  selectedImage === item.image ? 'selected' : ''
                              }`}
                              onClick={() => handleClick(item.image)}
                          >
                              <div>{item.name}</div>
                              <img
                                  src={getImageSrc(item.image)}
                                  alt={item.image}
                              />
                              {selectedImage === item.image && (
                                  <div className="selected-indicator">
                                      <div className="check-icon"></div>
                                  </div>
                              )}
                          </div>
                      ))}
            </div>
        </div>
    );
};

export default ImageList;
