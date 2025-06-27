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
                        
                        return true;
                    },
                    onEditEvent(eventId, event) {
                        
                    },
                    onResize(id, newStart, newEnd) {
                        
                    },
                },
                async onGetEvents() {
                    const events = await eventHook.getEvents();
                    if(events){
                        setEvents(events)
                    }
                },
                async onEventDrop(eventId, newDate) {
                    console.log('Moved event', eventId, 'to', newDate.toDateString());     
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