import React, { useCallback, useMemo } from 'react';
import styled, { useTheme } from 'styled-components';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { daysOfWeek, formatHour, hours, NavContainer, StyledDateTitle, toISODate, type ICalendarEvent } from '@/utils';
import { WeekCell } from './WeekCell';
import { useIsMobile } from '@/hooks/isMobile';
import { IconButton } from '@/components/base/buttons';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useCalendarStore } from '@/store';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 60px repeat(7, 1fr);
  font-weight: bold;
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
    const {startOfWeek, setStartOfWeek} = useCalendarStore();
    const isMobile = useIsMobile();
    const theme = useTheme();

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
        {isMobile && <NavContainer>
           <IconButton onClick={prevWeek}>
               <FiChevronLeft size={24} color={theme.text}/>
            </IconButton>
            <StyledDateTitle>{dateRangeText}</StyledDateTitle>
            <IconButton onClick={nextWeek}>
              <FiChevronRight size={24} color={theme.text}/>
            </IconButton>
        </NavContainer>}
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


