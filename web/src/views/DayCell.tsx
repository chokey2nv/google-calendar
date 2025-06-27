import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDrop } from 'react-dnd';
import { DraggableEvent, type IParentPushInProps } from './DraggableEvent';
import type { ICalendarEvent } from '@/utils';

export interface DayCellProps {
  hour: number;
  date: Date;
  events: ICalendarEvent[];
  eventCardProps: IParentPushInProps
  onDropEvent?: (id: string, newDate: Date) => void;
};

const CellWrapper = styled.div`
  border-top: 1px solid ${({ theme }) => theme.borderLine};
  border-left: 1px solid ${({ theme }) => theme.borderLine};
  padding: 0.5rem;
  position: relative;
  width: 100%;
  display: flex;
  gap: 10px;
  height: 100%;
  min-height: 50px;
`;

export const DayCell: React.FC<DayCellProps> = ({ 
  hour, date, events, onDropEvent, eventCardProps,
 }) => {
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
