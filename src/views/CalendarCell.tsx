// src/components/CalendarCell.tsx
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useDrop } from 'react-dnd';
import type { ICalendarEvent } from '@/utils';
import { DraggableEvent } from './DraggableEvent';

const CellWrapper = styled.div`
    border: 1px solid #333537;
    min-height: 100px;
    max-height: 100px;
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
    justify-content: flex-start;
    align-items: center;
    overflow: hidden;
`;

const DayNumber = styled.div<{ isToday?: boolean }>`
    background: ${({ isToday, theme }) => (isToday ? theme.highlight : 'transparent')};
    color: ${({ isToday, theme }) => (isToday ? '#fff' : theme.text)};
    font-size: 12px;
    justify-content: center;
    padding: 3px;
    align-items: center;
    border-radius: 50%;
    font-weight: bold;
    width: fit-content;
`;

const EventContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    overflow: hidden;
`


type Props = {
  day: number;
  date: Date;
  events: ICalendarEvent[];
  isToday: boolean;
  onDropEvent?: (eventId: string, newDate: Date) => void;
};

export const CalendarCell: React.FC<Props> = ({
  day,
  date,
  events,
  isToday,
  onDropEvent,
}) => {
    const theme = useTheme();
    const ref = React.useRef<HTMLDivElement>(null);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'EVENT',
        drop: (item: { id: string }) => {
            onDropEvent?.(item.id, date);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    // Apply the drop to the DOM node manually
    React.useEffect(() => {
        if (ref.current) {
            drop(ref.current);
        }
    }, [ref, drop]);

  return (
    <div ref={ref}>
        <CellWrapper style={{ background: isOver ? theme.btnHover : undefined }}>
            <DayNumber isToday={isToday}>{day}</DayNumber>
            {events.length > 0 && <EventContainer>
                {events.map((event) => (
                    <DraggableEvent key={event.id} event={event} />
                ))}
            </EventContainer>}
        </CellWrapper>
    </div>
  );
};

