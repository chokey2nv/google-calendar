import type { ICalendarEvent } from "@/utils";
import React from "react";
import { useDrag } from "react-dnd";
import styled from "styled-components";

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
export const DraggableEvent: React.FC<{ event: ICalendarEvent }> = ({ event }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drag] = useDrag(() => ({
    type: 'EVENT',
    item: { id: event.id },
  }));

  // Apply the drag to the DOM node manually
  React.useEffect(() => {
    if (ref.current) {
      drag(ref.current);
    }
  }, [ref, drag]);

  return (
    <div ref={ref}>
      <EventItem color={event.color}>{event.title}</EventItem>
    </div>
  );
};