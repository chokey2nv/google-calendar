import {  type ICalendarEvent } from '@/utils';
import { create } from 'zustand';

type EventStore = {
  events: ICalendarEvent[];
  setEvents: (events: ICalendarEvent[]) => Promise<void>;
};

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  setEvents: async (events) => {
    set({ events });
  }
}));
