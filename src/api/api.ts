// chakbootClient.ts ---------------------------------------------------
import type { PredictionResult } from './response';
import { usePredictionStore } from '../store/predictionStore';

/**
 * ChakBoot 예측 요청
 * @param endpoint  ex) "https://home.goldenmine.kr/ai/predict"
 * @param img1      File 또는 Blob (첫 번째 이미지)
 * @param img2      File 또는 Blob (두 번째 이미지)
 * @returns         `{ imageBase64, url }`
 * @throws          Error – HTTP 오류나 JSON 파싱 실패 시
 */
const url = 'https://home.goldenmine.kr/chakboot';

export async function requestPrediction(
    img1: Blob,
    img2: Blob,
    signal?: AbortSignal
) {
    console.log('request prediction');
    // 1. multipart/form-data 생성
    const form = new FormData();
    form.append('img1', img1, 'img1.png');
    form.append('img2', img2, 'img2.png');

    // 2. fetch 요청
    const res = await fetch(url + '/ai/predict', {
        method: 'POST',
        body: form,
        signal, //
    });

    if (!res.ok)
        throw new Error(
            `Prediction request failed: ${res.status} ${res.statusText}`
        );

    // 3. JSON 파싱
    const data = (await res.json()) as PredictionResult;
    const imageUrl = `data:image/png;base64,${data.imageBase64}`;
    const finalUrl = `https://home.goldenmine.kr/chakboot/ai/url/${data.url}`;

    // zustand에 저장
    usePredictionStore.setState({
        resultImage: imageUrl,
        resultUrl: finalUrl,
    });
}

export async function requestPredictionRecent(img: Blob) {
    // 1. multipart/form-data 생성
    const form = new FormData();
    form.append('img', img, 'img.png');

    // 2. fetch 요청
    const res = await fetch(url + '/ai/predictrecent', {
        method: 'POST',
        body: form,
    });

    if (!res.ok)
        throw new Error(
            `Prediction request failed: ${res.status} ${res.statusText}`
        );

    // 3. JSON 파싱
    const data = (await res.json()) as PredictionResult;
    const imageUrl = `data:image/png;base64,${data.imageBase64}`;
    const finalUrl = `https://home.goldenmine.kr/chakboot/ai/url/${data.url}`;

    console.log(finalUrl);
    // zustand에 저장
    usePredictionStore.setState({
        resultImage: imageUrl,
        resultUrl: finalUrl,
    });

    // return data;
}
