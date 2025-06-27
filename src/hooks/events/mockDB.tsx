import type { ICalendarEvent } from "@/utils";
import { create } from "zustand";
const initialData: ICalendarEvent[] = [
        { id: '1', date: '2025-06-25', title: 'Doctor Visit' },
        { id: '2', date: '2025-06-25', title: 'Doctor Visit' },
        { id: '3', date: '2025-06-25', title: 'Doctor Visit' },
        { id: '4', date: '2025-06-25', title: 'Doctor Visit' },
        { id: '5', date: '2025-06-25', title: 'Doctor Visit' },
        { id: '6', date: '2025-06-26', title: 'Project Sync' },
        { id: '7', date: '2025-06-27', title: 'Project Sync' },
    ]
export interface IMockDbStore {
    events: ICalendarEvent[];
    getEvent: (eventId: string) => Promise<ICalendarEvent|undefined>;
    getEvents: () => Promise<ICalendarEvent[]>;
    setEvents: (events: ICalendarEvent[]) => Promise<ICalendarEvent[]>;
    addEvent: (event: Partial<ICalendarEvent>) => Promise<ICalendarEvent|undefined>;
    deleteEvent: (eventId: string) => Promise<string>;
    updateEvent: (eventId: string, updatedEvent: Partial<ICalendarEvent>) => Promise<ICalendarEvent|undefined>;
    resetEvents: () => Promise<ICalendarEvent[]>;
}
export const useMockDbStore = create<IMockDbStore>((set, get) => ({
    events: initialData,
    setEvents: async (events) => {
        set({ events })
        return get().events
    },
    getEvent: async (eventId) => {
        return get().events.find((event) => event.id === eventId)
    },
    getEvents: async () => {
        return get().events
    },
    addEvent: async (event) => {
        const count = get().events.length + 1
        event.id = count.toString()
        set((state) => ({ events: [...state.events, event as ICalendarEvent] }))
        return get().getEvent(event.id);
    },
    deleteEvent: async (eventId) => {
        set((state) => ({
            events: state.events.filter((event) => event.id !== eventId),
        }))
        return eventId
    },
    updateEvent: async (eventId, updatedEvent) => {
        set((state) => ({
            events: state.events.map((event) =>
                event.id === eventId ? {...event, ...updatedEvent} : event
            ),
        }))
        return get().getEvent(eventId)
    },
    resetEvents: async () => {
        set({ events: initialData })
        return get().events
    }
}))