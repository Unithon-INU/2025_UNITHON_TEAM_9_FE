import { create } from 'zustand';

type CaptureState = {
    recentImage: string | null;
    recentImages: string[];
    showCamera: boolean;
    capturedImage: string | null;
    selectCapturedImage: string | null;
    setRecentImages: (images: string[]) => void;
    setShowCamera: (show: boolean) => void;
    resetRecentImages: () => void;
};

export const useRecentCaptureStore = create<CaptureState>(set => ({
    recentImage: null,
    recentImages: [],
    showCamera: false,
    capturedImage: null,
    selectCapturedImage: null,
    setRecentImages: images => set({ recentImages: images }),
    setShowCamera: show => set({ showCamera: show }),
    resetRecentImages: () => set({ recentImages: [] }),
}));
