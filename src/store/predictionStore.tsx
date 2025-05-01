// src/store/predictionStore.ts
import { create } from 'zustand';

type PredictionStore = {
    resultImage: string | null;  // base64 또는 data URL
    resultUrl: string | null;    // 서버 경로 등 외부 접근용 URL
    setResultImage: (imageUrl: string) => void;
    setResultUrl: (url: string) => void;
};

export const usePredictionStore = create<PredictionStore>((set) => ({
    resultImage: null,
    resultUrl: null,
    setResultImage: (imageUrl) => set({ resultImage: imageUrl }),
    setResultUrl: (url) => set({ resultUrl: url }),
}));