export interface ICalendarEvent {
    id: string;
    title: string;
    description?: string;
    date: string;
    endDate: string;
    color?: string;
}
export interface ApiResponse<T = undefined> {
  data?: T;
  err?: Error;
  success?: boolean;
}
export type ISettingView =  "month" | "week" | "day";