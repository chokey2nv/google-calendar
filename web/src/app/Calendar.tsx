import { useEventHook } from "@/hooks/events/event";
import { CalendarUI } from "../views";
import { useEventStore } from "@/store/events";


export default function CalendarPage(){
    const eventHook = useEventHook();
    const { setEvents } = useEventStore();
    return (
        <CalendarUI 
            {...{
                eventCardProps: {
                    async onDeleteEvent(eventId) {
                        await eventHook.deleteEvent({eventId})
                        const events = await eventHook.getEvents() 
                        if(events){
                            setEvents(events)
                        } 
                        return true;
                    },
                    async onEditEvent(eventId, event) {
                        await eventHook.updateEvent({eventId, event})
                        const events = await eventHook.getEvents() 
                        if(events){
                            setEvents(events)
                        } 
                    },
                    onResize() {
                        
                    },
                },
                async onGetEvents() {
                    const events = await eventHook.getEvents();
                    if(events){
                        setEvents(events)
                    }
                },
                async onEventDrop(eventId, newDate) {    
                    await eventHook.updateEvent({eventId, event: {date: newDate.toISOString()}}) 
                    const events = await eventHook.getEvents() 
                    if(events){
                        setEvents(events)
                    }  
                },
            }}
        />
    );
};