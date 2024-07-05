import { create } from "zustand";

const useLoadStateStore = create((set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set({ isLoading }),
}));

export default useLoadStateStore;