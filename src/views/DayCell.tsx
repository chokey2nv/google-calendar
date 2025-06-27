import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { DraggableEvent } from './DraggableEvent';
import type { ICalendarEvent } from '@/utils';

type Props = {
  hour: number;
  date: Date;
  events: ICalendarEvent[];
  onDropEvent?: (id: string, newDate: Date) => void;
};

const CellWrapper = styled.div`
  border-top: 1px solid #ddd;
  height: 60px;
  padding: 0.5rem;
  position: relative;
`;

export const DayCell: React.FC<Props> = ({ hour, date, events, onDropEvent }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop(() => ({
    accept: 'EVENT',
    drop: (item: { id: string }) => {
      const newDate = new Date(date);
      newDate.setHours(hour);
      onDropEvent?.(item.id, newDate);
    },
  }));

  useEffect(() => {
    if (ref.current) {
      drop(ref.current);
    }
  }, [ref, drop]);

  return (
    <CellWrapper ref={ref}>
      {events.map((event) => (
        <DraggableEvent key={event.id} event={event} />
      ))}
    </CellWrapper>
  );
};
