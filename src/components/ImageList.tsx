import { useImageStore } from '../store/imageStore.tsx';
import { useRecentCaptureStore } from '../store/recentcaptureStore';
import './ImageList.css';
import React, { useMemo } from 'react';

const clothList = ['cloth01.png', 'cloth02.png'];

const modelList = ['man01.png', 'woman01.png'];

type ImageListProps = {
    imageType: string;
};

const ImageList: React.FC<ImageListProps> = ({ imageType }) => {
    const setClothImage = useImageStore(state => state.setClothImage);
    const setModelImage = useImageStore(state => state.setModelImage);
    const recentImages = useRecentCaptureStore(state => state.recentImages); // 최근 찍은 사진 리스트
    const clothImageName = useImageStore(state => state.clothImageName); // 선택 이미지 상태
    const modelImageName = useImageStore(state => state.modelImageName); // 선택 모델 상태

    // 현재 선택된 요소 타입
    const selectedImage =
        imageType === 'cloth' ? clothImageName : modelImageName;

    // 기존 모델 리스트 + 최근에 찍은 사진 5개 결합
    const combinedModelList = useMemo(() => {
        if (imageType === 'model' && recentImages.length > 0) {
            // 이미지 5개 가져옴
            const recentCapturedImages = recentImages.slice(0, 5);
            // 모델 리스트 + 최근에 찍은 사진 5개 추가
            return [...modelList, ...recentCapturedImages];
        }

        return imageType === 'model' ? modelList : clothList;
    }, [imageType, recentImages]);

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
        return `/images/${imageFolder}/${name}`;
    };

    const handleClick = (name: string) => {
        if (imageType === 'cloth') {
            setClothImage(name);
        } else {
            setModelImage(name);
        }
        console.log('ImageList handleClick ' + name + ', ' + imageType);
    };

    return (
        <div className={`${imageType}-list`}>
            {imageType === 'model' && recentImages.length > 0
                ? // 최근 이미지 리스트 + 모델 목록 띄우기
                  combinedModelList.map(name => (
                      <div
                          key={name}
                          className={`${itemClass} ${
                              selectedImage === name ? 'selected' : ''
                          }`}
                          onClick={() => handleClick(name)}
                      >
                          <img src={getImageSrc(name)} alt={name} />
                          {selectedImage === name && (
                              <div className="selected-indicator">
                                  <div className="check-icon"></div>
                              </div>
                          )}
                      </div>
                  ))
                : // 기존 모델 목록 띄우기 (최근 이미지 없음)
                  (imageType === 'cloth' ? clothList : modelList).map(name => (
                      <div
                          key={name}
                          className={`${itemClass} ${
                              selectedImage === name ? 'selected' : ''
                          }`}
                          onClick={() => handleClick(name)}
                      >
                          <img src={getImageSrc(name)} alt={name} />
                          {selectedImage === name && (
                              <div className="selected-indicator">
                                  <div className="check-icon"></div>
                              </div>
                          )}
                      </div>
                  ))}
        </div>
    );
};

export default ImageList;
