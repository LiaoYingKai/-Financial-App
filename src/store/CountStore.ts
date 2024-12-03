import { create } from 'zustand';

interface CountStore {
  num: number;
  setNumber: (num: number) => void;
}

const useCountStore = create<CountStore>((set) => ({
  num: 0,
  setNumber: (num) => set({ num }),
}));

export default useCountStore;
