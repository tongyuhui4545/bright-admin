import { create } from "zustand";

export const useStore = create<{
  collapsed: boolean;
  currentMenu: string;
  updateCollapsed: () => void;
  setCurrentMenu: (menu: string) => void;
}>((set) => ({
  collapsed: false,
  currentMenu: '',
  updateCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  setCurrentMenu: ((menu: string) => set({currentMenu: menu}))
}));
