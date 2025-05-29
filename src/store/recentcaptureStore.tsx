import { create } from 'zustand';

interface CaptureState {
    recentImage: string | null;
    recentUrl: string | null;
    recentImages: string[];
    showCamera: boolean;
    capturedImage: string | null;
    setRecentImage: (imageUrl: string) => void;
    setRecentUrl: (url: string) => void;
    setRecentImages: (images: string[]) => void;
    setShowCamera: (show: boolean) => void;
}

export const useRecentCaptureStore = create<CaptureState>(set => ({
    recentImage: null,
    recentUrl: null,
    recentImages: [],
    showCamera: false,
    capturedImage: null,
    setRecentImage: imageUrl => set({ recentImage: imageUrl }),
    setRecentUrl: url => set({ recentUrl: url }),
    setRecentImages: images => set({ recentImages: images }),
    setShowCamera: show => set({ showCamera: show }),
}));
