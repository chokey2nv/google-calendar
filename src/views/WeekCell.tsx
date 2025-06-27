import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { DraggableEvent } from './DraggableEvent';
import type { ICalendarEvent } from '@/utils';

type Props = {
  dayIndex: number;
  hour: number;
  date: Date;
  events: ICalendarEvent[];
  onDropEvent?: (id: string, newDate: Date) => void;
};

const CellWrapper = styled.div`
  border: 1px solid #333537;
  padding: 0.25rem;
  position: relative;
  min-height: 60px;
`;

export const WeekCell: React.FC<Props> = ({ dayIndex, hour, date, events, onDropEvent }) => {
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
