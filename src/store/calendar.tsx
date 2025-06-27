import { getStartOfWeek } from '@/utils';
import { create } from 'zustand';

type CalendarStore = {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  startOfWeek: Date;
  setStartOfWeek: (date: Date) => void;
};

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  currentDate: new Date(),
  startOfWeek: getStartOfWeek(new Date()),
  setCurrentDate: (date) => set({ currentDate: date }),
  setStartOfWeek: (date) => set({ startOfWeek: date }),
}));
