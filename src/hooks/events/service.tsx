import type { ApiResponse, ICalendarEvent } from "@/utils"
import type { ICreateEventRequest, ICreateEventResponse, IDeleteEventRequest, IDeleteEventResponse, IResetEventDataResponse, IUpdateEventRequest, IUpdateEventResponse } from "./types";

export const useEventService = () => {
    return {
        async createEvent(input: ICreateEventRequest):Promise<ApiResponse<ICreateEventResponse>>{
            return {
                err: new Error("not implemented")
            };
        },
        async updateEvent(input: IUpdateEventRequest):Promise<ApiResponse<IUpdateEventResponse>>{
            return {
                err: new Error("not implemented")
            };
        },
        async deleteEvent(input: IDeleteEventRequest):Promise<ApiResponse<IDeleteEventResponse>>{
            return {
                err: new Error("not implemented")
            }
        },
        async resetEventData():Promise<ApiResponse<IResetEventDataResponse>>{
            return {
                err: new Error("not implemented")
            }
        }
    }
}