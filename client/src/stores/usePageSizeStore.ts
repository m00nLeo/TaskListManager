import { create } from "zustand";

interface PageSizeStore {
  pagePerSheet: number;
  setPagePerSheet: (newSize: number) => void;
}

export const usePageSizeStore = create<PageSizeStore>((set) => ({
  pagePerSheet: 3,
  setPagePerSheet: (newSize) => {
    set({ pagePerSheet: newSize });
  },
}));
