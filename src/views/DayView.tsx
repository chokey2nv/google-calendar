import React from 'react';
import styled from 'styled-components';
import { DayCell } from './DayCell';
import type { ICalendarEvent } from '@/utils';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';



const Wrapper = styled.div`
  width: 100%;
`;

const Header = styled.div`
  padding: 1rem;
  font-weight: bold;
  font-size: 1.25rem;
  border-bottom: 1px solid #ddd;
`;

const HourRow = styled.div`
  display: flex;
  align-items: flex-start;
`;

const TimeLabel = styled.div`
  width: 60px;
  text-align: right;
  font-size: 0.75rem;
  padding: 0.5rem;
  border-right: 1px solid #eee;
  color: #888;
`;

const hours = Array.from({ length: 24 }, (_, i) => i); // 8AM–8PM

type Props = {
  date: Date;
  events: ICalendarEvent[];
  onEventDrop?: (id: string, newDate: Date) => void;
};
export const DayView: React.FC<Props> = ({ date, events, onEventDrop }) => {
  const getEventsForHour = (hour: number) => {
    return events.filter((event) => {
      const eventTime = new Date(event.date || `${event.date}T00:00`);
      return (
        eventTime.getFullYear() === date.getFullYear() &&
        eventTime.getMonth() === date.getMonth() &&
        eventTime.getDate() === date.getDate() &&
        eventTime.getHours() === hour
      );
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <Header>{date.toDateString()}</Header>
        {hours.map((hour) => (
          <HourRow key={hour}>
            <TimeLabel>{hour > 12 ? hour - 12 : hour}{hour >= 12 ? 'PM' : 'AM'}</TimeLabel>
            <DayCell
              hour={hour}
              date={date}
              events={getEventsForHour(hour)}
              onDropEvent={onEventDrop}
            />
          </HourRow>
        ))}
      </Wrapper>
    </DndProvider>
  );
};
