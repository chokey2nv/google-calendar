import type { ICalendarEvent } from "@/utils";
import { create } from "zustand";

interface NewEventStore {
  isModalOpen?: boolean;
  isEdit?: boolean;
  calendarEvent?: ICalendarEvent;
  unSetCalendarEvent: () => void;
  onCancel: () => void;
  onSubmit?: (calendarEvent: Partial<ICalendarEvent>) => Promise<void>;
  onOpenModal: (data: {
    isEdit?: boolean;
    calendarEvent?: ICalendarEvent;
    onCancel?: () => void;
    onSubmit: (calendarEvent: Partial<ICalendarEvent>) => Promise<void>;
  }) => void;
}

export const useNewEventStore = create<NewEventStore>((set) => ({
  isModalOpen: false,
  unSetCalendarEvent() {
    set({
      isModalOpen: false,
      isEdit: undefined,
      calendarEvent: undefined,
    });
  },
  onCancel() {
    set({ isModalOpen: false, isEdit: undefined, calendarEvent: undefined})
  },
  onOpenModal(data) {
    set({
      isModalOpen: true,
      ...data,
    });
  },
}));
