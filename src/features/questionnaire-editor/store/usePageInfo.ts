import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type PageInfoStore = {
  title: string;
  isPublished: boolean;
  resetPageInfo: (info: { title?: string; isPublished?: boolean }) => void;
};

export const usePageInfoStore = create<PageInfoStore>()(
  immer((set) => ({
    title: '',
    isPublished: false,
    resetPageInfo({ title, isPublished }) {
      set((state) => {
        if (title !== undefined) state.title = title;
        if (isPublished !== undefined) state.isPublished = isPublished;
      });
    },
  })),
);
