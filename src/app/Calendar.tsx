import { CalendarUI } from "../views";


export default function CalendarPage(){
    return (
        <CalendarUI 
            events={[
                { id: '1', date: '2025-06-25', title: 'Doctor Visit', color: '#e3fcef' },
                { id: '1', date: '2025-06-25', title: 'Doctor Visit', color: '#e3fcef' },
                { id: '1', date: '2025-06-25', title: 'Doctor Visit', color: '#e3fcef' },
                { id: '1', date: '2025-06-25', title: 'Doctor Visit', color: '#e3fcef' },
                { id: '1', date: '2025-06-25', title: 'Doctor Visit', color: '#e3fcef' },
                { id: '2', date: '2025-06-26', title: 'Project Sync', color: '#dbeafe' },
            ]}
            {...{
                onEventDrop(eventId, newDate) {
                    console.log({newDate})
                    console.log('Moved event', eventId, 'to', newDate.toDateString());                    
                },
            }}
        />
    );
};