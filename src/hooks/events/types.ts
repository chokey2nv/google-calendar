import type { ICalendarEvent } from "@/utils";

export interface ICreateEventRequest {
    event: Partial<ICalendarEvent>;
}
export interface ICreateEventResponse {
    event: ICalendarEvent
}
export interface IUpdateEventRequest {
    eventId: string;
    event: Partial<ICalendarEvent>;
}
export interface IUpdateEventResponse {
    event: ICalendarEvent;
}
export interface IDeleteEventRequest {
    eventId: string;
}
export interface IDeleteEventResponse {
    eventId: string;
}
export interface IResetEventDataResponse {
    success: boolean;
}
export interface IGetEventsResponse {
    events: ICalendarEvent[];
}