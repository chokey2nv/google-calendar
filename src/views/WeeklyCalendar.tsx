import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableEvent } from './DraggableEvent';
import type { ICalendarEvent } from '@/utils';
import { WeekCell } from './WeekCell';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const hours = Array.from({ length: 24 }, (_, i) => i); // 8AM to 8PM

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 60px repeat(7, 1fr);
  font-weight: bold;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  padding: 0.5rem;
  cursor: pointer;
`;

const DayHeader = styled.div`
  padding: 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
`;
const Day = styled.div`
    font-size: 11px;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: .8px;
    color: ${({ theme }) => theme.text};
    line-height: 32px;
`
const DayNumber = styled.div`
    font-size: 26px;
    line-height: 46px;
    font-weight: 400;
    color: ${({ theme }) => theme.text};
`

const Row = styled.div`
  display: grid;
  grid-template-columns: 60px repeat(7, 1fr);
  min-height: 60px;
`;

const TimeLabel = styled.div`
    font-size: .6875rem;
    font-weight: 500;
    letter-spacing: .00625rem;
    line-height: 1rem;
    text-align: right;
    margin-right: 5px;
    color: ${({ theme }) => theme.text};
`;

export type WeeklyCalendarProps = {
  events: ICalendarEvent[];
  onEventDrop: (id: string, newDate: Date) => void;
};

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ events, onEventDrop }) => {
    const [startOfWeek, setStartOfWeek] = useState(getStartOfWeek(new Date()));

    const nextWeek = useCallback(() => {
        const next = new Date(startOfWeek);
        next.setDate(startOfWeek.getDate() + 7);
        setStartOfWeek(next);
    }, [startOfWeek]);

    const prevWeek = useCallback(() => {
        const prev = new Date(startOfWeek);
        prev.setDate(startOfWeek.getDate() - 7);
        setStartOfWeek(prev);
    }, [startOfWeek]);
    const [today] = useState(startOfWeek || getStartOfWeek(new Date()));

    const getEventsForSlot = (date: Date, hour: number) => {
    const dateKey = toISODate(date);
    return events.filter((e) => {
        const eventTime = new Date(e.date || `${e.date}T08:00`);
        return (
            e.date === dateKey &&
            eventTime.getHours() === hour
        );
        });
    };

    const dateRangeText = useMemo(() => {
        const end = new Date(startOfWeek);
        end.setDate(startOfWeek.getDate() + 6);
        const startLabel = startOfWeek.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
        const endLabel = end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
        return `${startLabel} – ${endLabel}`;
    }, [startOfWeek]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        {/* <NavButton onClick={prevWeek}>&larr;</NavButton>
          <h2>{dateRangeText}</h2>
          <NavButton onClick={nextWeek}>&rarr;</NavButton> */}
        <Header>
          <TimeLabel />
          {daysOfWeek.map((day, i) => {
            const d = new Date(startOfWeek);
            d.setDate(startOfWeek.getDate() + i);
            return <DayHeader key={i}>
                <Day>{day}</Day>
                <DayNumber>{d.getDate()}</DayNumber>
            </DayHeader>;
          })}
        </Header>

        {hours.map((hour) => (
          <Row key={hour}>
            <TimeLabel>{formatHour(hour)}</TimeLabel>
            {daysOfWeek.map((_, dayIdx) => {
                const cellDate = new Date(startOfWeek);
                cellDate.setDate(startOfWeek.getDate() + dayIdx);

                return (
                    <WeekCell
                        key={`${hour}-${dayIdx}`}
                        dayIndex={dayIdx}
                        hour={hour}
                        date={cellDate}
                        events={getEventsForSlot(cellDate, hour)}
                        {...{
                            onDropEvent(id, newDate) {
                                onEventDrop(id, newDate);
                            },
                        }}
                    />);
                })}
          </Row>
        ))}
      </Wrapper>
    </DndProvider>
  );
};

function getStartOfWeek(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() - day; // back to Sunday
  return new Date(date.setDate(diff));
}

function formatHour(hour: number) {
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour > 12 ? hour - 12 : hour;
  return `${hour12} ${suffix}`;
}

function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}
