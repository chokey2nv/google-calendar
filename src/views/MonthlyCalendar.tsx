// src/components/CalendarUI.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CalendarCell } from './CalendarCell';
import type { ICalendarEvent } from '@/utils';

const Root = styled.div`
  width: auto;
  margin: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 1rem;
`;

const DayName = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 11px;
  text-transform: uppercase;
`;

const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (month: number, year: number) =>
  new Date(year, month, 1).getDay();

type Props = {
  events?: ICalendarEvent[];
  onEventDrop?: (eventId: string, newDate: Date, index?: number) => void;
};

export const MonthlyCalendar: React.FC<Props> = ({ events = [], onEventDrop }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = React.useMemo(() => getDaysInMonth(month, year), [currentDate]);
  const startDay = React.useMemo(() => getFirstDayOfMonth(month, year), [currentDate]);
  const today = new Date();

  const goToPrevMonth = () => setCurrentDate(new Date(year, month - 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1));

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDate = (date: Date) => {
    const key = date.toISOString().split('T')[0];
    return events.filter((e) => e.date === key);
  };

  const generateCells = () => {
    const cells = [];
    const total = startDay + daysInMonth;

    for (let i = 0; i < total; i++) {
      if (i < startDay) {
        cells.push(<div key={`empty-${i}`} />);
      } else {
        const day = i - startDay + 1;
        const cellDate = new Date(year, month, day);
        const key = cellDate.toISOString().split('T')[0];

        const isToday =
          today.getDate() === day &&
          today.getMonth() === month &&
          today.getFullYear() === year;

        cells.push(
          <CalendarCell
            key={key}
            day={day}
            date={cellDate}
            events={getEventsForDate(cellDate)}
            isToday={isToday}
            onDropEvent={onEventDrop}
          />
        );
      }
    }

    return cells;
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Root>
        {/* <Header>
          <NavButton onClick={goToPrevMonth}>
            <FiChevronLeft />
          </NavButton>
          <h2>
            {currentDate.toLocaleString('default', { month: 'long' })}{' '}
            {year}
          </h2>
          <NavButton onClick={goToNextMonth}>
            <FiChevronRight />
          </NavButton>
        </Header> */}

        <Grid>
          {dayNames.map((day) => (
            <DayName key={day}>{day}</DayName>
          ))}
          {generateCells()}
        </Grid>
      </Root>
    </DndProvider>
  );
};
