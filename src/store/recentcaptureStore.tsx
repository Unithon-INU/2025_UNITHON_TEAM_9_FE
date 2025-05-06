import { create } from 'zustand';

type RecentCaptureStore = {
    recentImage: string | null;
    recentUrl: string | null;
    recentImages: string[];
    setRecentImage: (imageUrl: string) => void;
    setRecentUrl: (url: string) => void;
    setRecentImages: (images: string[]) => void;
};

export const useRecentCaptureStore = create<RecentCaptureStore>(set => ({
    recentImage: null,
    recentUrl: null,
    recentImages: [],
    setRecentImage: imageUrl => set({ recentImage: imageUrl }),
    setRecentUrl: url => set({ recentUrl: url }),
    setRecentImages: images => set({ recentImages: images }),
}));
