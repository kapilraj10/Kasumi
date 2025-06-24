import { create} from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("kasumi-theme") || 'coffee',
    setTheme: (theme) => {
        localStorage.setItem("kasumi-theme",theme);
        set({theme});
    }
}))