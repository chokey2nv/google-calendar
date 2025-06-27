import type { ICalendarEvent } from "@/utils";
import { create } from "zustand";

interface EventDetailModal {
  isModalOpen?: boolean;
  calendarEvent?: ICalendarEvent;
  onEdit?: () => void;
  onDelete?: (eventId: string) => Promise<boolean>;
  onCancel?: () => void;
  onOk?: () => void;
  onOpenModal: (data: {
    calendarEvent: ICalendarEvent;
    onEdit: () => void;
    onDelete: () => Promise<boolean>;
    onCancel?: () => void;
    onOk?: () => void;
  }) => void;
}

export const useEventDetailModal = create<EventDetailModal>((set) => ({
  isModalOpen: true,
  onEdit() {
    set({
      isModalOpen: false,
    });
  },
  onCancel() {
    set({
      isModalOpen: false,
    });
  },
  onOk() {
    set({
      isModalOpen: false,
    });
  },
  async onDelete(eventId) {
    set({
      isModalOpen: false,
    });
    return false
  },
  onOpenModal: (data) => {
    set({
      isModalOpen: true,
      ...data,
    });
  },
}));
