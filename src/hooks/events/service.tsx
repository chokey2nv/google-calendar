import type { ApiResponse } from "@/utils"
import type { ICreateEventRequest, ICreateEventResponse, IDeleteEventRequest, IDeleteEventResponse, IGetEventsResponse, IResetEventDataResponse, IUpdateEventRequest, IUpdateEventResponse } from "./types";
import { useMockDbStore } from "./mockDB";

export const useEventService = () => {
    const mockdb = useMockDbStore();
    return {
        async createEvent(input: ICreateEventRequest):Promise<ApiResponse<ICreateEventResponse>>{
            const event = await mockdb.addEvent(input.event)
            if(!event){
                return {
                    err: new Error("Failed to create event")
                }
            }
            return {
                success: true,
                data: { event }
            };
        },
        async updateEvent(input: IUpdateEventRequest):Promise<ApiResponse<IUpdateEventResponse>>{
            const event = await mockdb.updateEvent(input.eventId, input.event)
            if(!event){
                return {
                    err: new Error("Failed to update event")
                }
            }
            return {
                data: { event },
                success: true
            };
        },
        async getEvents():Promise<ApiResponse<IGetEventsResponse>>{
            const events = await mockdb.getEvents()
            if(!events){
                return {
                    err: new Error("Failed to update event")
                }
            }
            return {
                data: { events },
                success: true
            };
        },
        async deleteEvent(input: IDeleteEventRequest):Promise<ApiResponse<IDeleteEventResponse>>{
            const eventId = await mockdb.deleteEvent(input.eventId)
            if(!eventId){
                return {
                    err: new Error("Failed to delete event")
                }
            }
            return {
                success: true,
                data: { eventId }
            }
        },
        async resetEventData():Promise<ApiResponse<IResetEventDataResponse>>{
            const result = await mockdb.resetEvents()
            if(result && result.length > 0){
                return {
                    success: true,
                    data: { success: true }
                }
            }
            return {
                err: new Error("not implemented")
            }
        }
    }
}