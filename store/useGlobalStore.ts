import { create } from "zustand";

interface IGlobalStore {
  locale: string;
  setLocale: (locale: string) => void;
}

const useGlobalStore = create<IGlobalStore>((set) => ({
  locale: "en-us",
  setLocale: (locale) => set({ locale }),
}));

export default useGlobalStore;
