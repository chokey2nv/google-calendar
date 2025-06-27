import { useNewEventStore } from "@/store";
import { useEventDetailModal } from "@/store/eventDetail";
import type { ICalendarEvent } from "@/utils";
import React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";
// import { ResizableBox } from 'react-resizable';
// import 'react-resizable/css/styles.css';

const EventItem = styled.div<{ color?: string }>`
    color: ${({ color, theme }) => color || theme.text};
    border-radius: 4px;
    font-size: 0.75rem;
    cursor: grab;
    align-items: flex-start;
    justify-content: flex-start;
    display: flex;
    padding: 0 4px;
`;
export interface DraggableEventProps { 
  event: ICalendarEvent,
  onResize: (id: string, newStart: Date, newEnd: Date) => void;
  onEditEvent: (eventId: string, event: Partial<ICalendarEvent>) => void;
  onDeleteEvent: (eventId: string) => Promise<boolean>;
}
export type IParentPushInProps = Pick<DraggableEventProps, "onResize" | "onDeleteEvent" | "onEditEvent">
export const DraggableEvent: React.FC<DraggableEventProps> = ({ event, onResize, onEditEvent, onDeleteEvent }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { onOpenModal } = useEventDetailModal();
  const { onOpenModal: openEditModal } = useNewEventStore();

  const [, drag] = useDrag(() => ({
    type: 'EVENT',
    item: { id: event.id },
  }));


  const handleResize = (_e:  React.SyntheticEvent, data: { size: { height: number } }) => {
    _e.preventDefault();
    _e.stopPropagation();
    const minutes = Math.round(data.size.height / 20) * 30; // snap to 30 min
    const newEnd = new Date(new Date(event.date).getTime() + minutes * 60 * 1000);
    onResize(event.id, new Date(event.date), newEnd);
  };

  const start = new Date(event.date);
  const end = new Date(event.endDate);
  const durationInMin = (end.getTime() - start.getTime()) / 60000;

  React.useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [ref, drag]);

  return (
    <div ref={ref} onClick={() => onOpenModal({
      calendarEvent: event,
      onEdit() {
        openEditModal({
          calendarEvent: event,
          isEdit: true,
          async onSubmit(calendarEvent) {
            onEditEvent(event.id, calendarEvent)
          },
        })
      },
      async onDelete() {
        return onDeleteEvent(event.id);
      },
    })}>
        <EventItem color={event.color}>{event.title}</EventItem>
      </div>
  )

  /* return (
    <div ref={ref}>
      <ResizableBox
        height={(durationInMin / 30) * 20} // 30min block = 20px
        width={200}
        axis="y"
        minConstraints={[200, 20]}
        maxConstraints={[200, 400]}
        onResizeStop={handleResize}
        resizeHandles={['s']}
      >

        <EventItem color={event.color}>{event.title}</EventItem>
      </ResizableBox>
    </div>
  ); */
};