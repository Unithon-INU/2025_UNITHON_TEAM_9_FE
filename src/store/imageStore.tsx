// src/store/imageStore.ts
import { create } from 'zustand';

type ImageStore = {
    clothImageName: string | null;
    modelImageName: string | null;
    setClothImage: (name: string) => void;
    setModelImage: (name: string) => void;
};

export const useImageStore = create<ImageStore>((set) => ({
    clothImageName: null,
    modelImageName: null,
    setClothImage: (name) => set({ clothImageName: name }),
    setModelImage: (name) => set({ modelImageName: name }),
}));