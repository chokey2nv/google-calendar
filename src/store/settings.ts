import type { ICalendarEvent, ISettingView, ITheme } from "@/utils";
import { create } from "zustand";

interface AppSettingStore {
  view: ISettingView;
  isDrawerOpen?: boolean;
  theme?: ITheme;
  onSetTheme: (theme: ITheme) => void;
  onToggleDrawer: () => void;
  onSetView: (view: ISettingView) => void;
  
}

export const useAppSettingStore = create<AppSettingStore>((set) => ({
  view: "month",
  isDrawerOpen: true,
  theme: localStorage.getItem("theme-type") as ITheme  || "dark",
  onSetTheme(theme) {
    set({ theme });
  },
  onToggleDrawer() {
    set({ isDrawerOpen: !this.isDrawerOpen });
  },
  onSetView(view) {
    set({ view });
  },
}));
