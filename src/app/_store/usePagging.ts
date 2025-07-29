import { create } from 'zustand';
import { StoryFormPageType } from '../_pages/StoryFormPages';

interface PaggingStore {
    currentPage: StoryFormPageType | null;
    setCurrentPage: (page: StoryFormPageType) => void;
}

const usePagging = create<PaggingStore>((set) => ({
    currentPage: "landing",
    setCurrentPage: (page) => set({ currentPage: page }),
}));

export default usePagging;
