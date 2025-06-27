import { useNotification, type ApiResponse, type ICalendarEvent } from "@/utils";
import { useEventService } from "./service";
import type { ICreateEventRequest, IDeleteEventRequest, IUpdateEventRequest } from "./types";

// I will use this place to implement business logics,
// and offload all the api actions to the services
export const useEventHook = () => {
    const notification = useNotification()
    const eventService = useEventService();

    // this handler picks up error and handles it automatically, so no error is skipped without proper notification.
    const handleRequest = async <T,O>(requestFn: (input: T) => Promise<ApiResponse<O>>, input: T): Promise<O|undefined> => {
        try {
            const { data, success, err } = await requestFn(input);
            if (!success) {
                console.log(`${requestFn.name} -> ${err?.message}`)
                notification.error({
                    message: err?.message || "An error occurred",
                });
                return undefined;
            }
            return data ?? undefined
        }catch(e){
            console.log(requestFn.name)
            notification.error({
                type: "error",
                message: (e as Error)?.message || "Fetch error",
            });
        }
    };

    // declare the functions here (expected to handle any business logic which is in sync with the back-end interaction)
    const createEvent = async (input: ICreateEventRequest):Promise<ApiResponse<ICalendarEvent>> => {
        try {
            const { data, err } = await eventService.createEvent(input)
            if(err){
                throw err;
            }
            return {
                success: true,
                data: data?.event
            }
        }catch(e){
            return {
                err: (e as Error)
            }
        }
    }
    const updateEvent = async (input: IUpdateEventRequest):Promise<ApiResponse<ICalendarEvent>> => {
        try {
            const { data, err } = await eventService.updateEvent(input)
            if(err){
                throw err;
            }
            return {
                success: true,
                data: data?.event
            }
        }catch(e){
            return {
                err: (e as Error)
            }
        }
    }
    const deleteEvent = async (input: IDeleteEventRequest):Promise<ApiResponse<string>> => {
        try {
            const { data, err } = await eventService.deleteEvent(input)
            if(err){
                throw err;
            }
            return {
                success: true,
                data: data?.eventId
            }
        }catch(e){
            return {
                err: (e as Error)
            }
        }
    }
    const resetEvents = async ():Promise<ApiResponse<boolean>> => {
        try {
            const { data, err } = await eventService.resetEventData()
            if(err){
                throw err;
            }
            return {
                success: true,
                data: data?.success
            }
        }catch(e){
            return {
                err: (e as Error)
            }
        }
    }

    return {
        createEvent: (input: ICreateEventRequest) => handleRequest(createEvent, input),
        updateEvent: (input: IUpdateEventRequest) => handleRequest(updateEvent, input),
        deleteEvent: (input: IDeleteEventRequest) => handleRequest(deleteEvent, input),
        resetEvents: () => handleRequest(resetEvents, null),
    }
}