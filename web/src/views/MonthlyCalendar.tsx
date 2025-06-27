// src/components/CalendarUI.tsx
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CalendarCell, type CalendarCellProps } from './MonthCell';
import { daysOfWeek, StyledDateTitle, type ICalendarEvent } from '@/utils';
import { useIsMobile } from '@/hooks/isMobile';
import { useCalendarStore } from '@/store';

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
  color: ${props => props.theme.text};
`;

const getDaysInMonth = (month: number, year: number) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (month: number, year: number) =>
  new Date(year, month, 1).getDay();

type Props = {
  events?: ICalendarEvent[];
  onEventDrop?: (eventId: string, newDate: Date, index?: number) => void;
  eventCardProps: CalendarCellProps["eventCardProps"]
};

export const MonthlyCalendar: React.FC<Props> = ({ events, onEventDrop, eventCardProps }) => {
  const { currentDate, setCurrentDate } = useCalendarStore()
  const isMobile = useIsMobile();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = React.useMemo(() => getDaysInMonth(month, year), [currentDate]);
  const startDay = React.useMemo(() => getFirstDayOfMonth(month, year), [currentDate]);
  const today = new Date();

  const goToPrevMonth = useCallback(() => setCurrentDate(new Date(year, month - 1)), [currentDate]);
  const goToNextMonth = useCallback(() => setCurrentDate(new Date(year, month + 1)), [currentDate]);

  const getEventsForDate = useCallback((date: Date) => {
    const key = date.toLocaleDateString('sv-SE'); // "2025-06-25"
    return events?.filter((e) => {
      const eventDateStr = new Date(e.date).toLocaleDateString('sv-SE');
      return eventDateStr === key;
    });
  }, [JSON.stringify(events)]);

  const generateCells = useCallback(() => {
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
            events={getEventsForDate(cellDate) || []}
            isToday={isToday}
            onDropEvent={onEventDrop}
            eventCardProps={eventCardProps}
          />
        );
      }
    }

    return cells;
  }, [JSON.stringify(currentDate), JSON.stringify(events)]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Root>
        {isMobile && <Header>
          <NavButton onClick={goToPrevMonth}>
            <FiChevronLeft />
          </NavButton>
          <StyledDateTitle>
            {currentDate.toLocaleString('default', { month: 'long' })}{' '}
            {year}
          </StyledDateTitle>
          <NavButton onClick={goToNextMonth}>
            <FiChevronRight />
          </NavButton>
        </Header> }

        <Grid>
          {daysOfWeek.map((day) => (
            <DayName key={day}>{day}</DayName>
          ))}
          {generateCells()}
        </Grid>
      </Root>
    </DndProvider>
  );
};
