import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { DraggableEvent, type IParentPushInProps } from './DraggableEvent';
import type { ICalendarEvent } from '@/utils';

export interface WeekCellProps {
  dayIndex: number;
  hour: number;
  date: Date;
  events: ICalendarEvent[];
  onDropEvent?: (id: string, newDate: Date) => void;
  eventCardProps: IParentPushInProps
};

const CellWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.borderLine};
  padding: 0.25rem;
  position: relative;
  min-height: 60px;
  height: 60px;
  overflow: hidden;
`;

export const WeekCell: React.FC<WeekCellProps> = ({ eventCardProps, hour, date, events, onDropEvent }) => {
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
        <DraggableEvent key={event.id} event={event} {...eventCardProps}/>
      ))}
    </CellWrapper>
  );
};
