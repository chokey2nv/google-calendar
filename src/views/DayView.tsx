import React, { useCallback } from 'react';
import styled from 'styled-components';
import { DayCell, type DayCellProps } from './DayCell';
import { NavContainer, StyledDateTitle, type ICalendarEvent } from '@/utils';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IconButton } from '@/components/base/buttons';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCalendarStore } from '@/store';
import { useIsMobile } from '@/hooks/isMobile';

const Wrapper = styled.div`
  width: 100%;
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
  color: #888;
`;

const hours = Array.from({ length: 24 }, (_, i) => i); // 8AM–8PM

export interface DayViewProps extends Pick<DayCellProps, "eventCardProps"> {
  events: ICalendarEvent[];
  onEventDrop?: (id: string, newDate: Date) => void;
};
export const DayView: React.FC<DayViewProps> = ({ events, onEventDrop, eventCardProps }) => {
  const { currentDate, setCurrentDate } = useCalendarStore();
  const isMobile = useIsMobile();

  const goToPreviousDay = useCallback(() => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1));
  }, [currentDate]);

  const goToNextDay = useCallback(() => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
  }, [currentDate]);
  const getEventsForHour = useCallback((hour: number) => {
      return events.filter((event) => {
          const eventTime = new Date(event.date || `${event.date}T00:00`);  
          return (
              eventTime.getFullYear() === currentDate.getFullYear() &&
              eventTime.getMonth() === currentDate.getMonth() &&
              eventTime.getDate() === currentDate.getDate() &&
              eventTime.getHours() === hour
          );
      });
  }, [JSON.stringify(currentDate), JSON.stringify(events)]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        {isMobile && <NavContainer>
          <IconButton onClick={goToPreviousDay}><FiChevronLeft /></IconButton>
          <StyledDateTitle>{currentDate.toDateString()}</StyledDateTitle>
          <IconButton onClick={goToNextDay}><FiChevronRight /></IconButton>
        </NavContainer>}
        {hours.map((hour) => (
          <HourRow key={hour}>
            <TimeLabel>{hour > 12 ? hour - 12 : hour}{hour >= 12 ? 'PM' : 'AM'}</TimeLabel>
            <DayCell
              hour={hour}
              date={currentDate}
              events={getEventsForHour(hour)}
              onDropEvent={onEventDrop}
              eventCardProps={eventCardProps}
            />
          </HourRow>
        ))}
      </Wrapper>
    </DndProvider>
  );
};
