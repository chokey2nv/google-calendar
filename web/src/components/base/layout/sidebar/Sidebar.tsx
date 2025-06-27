import type { FC } from "react";
import styled, { useTheme } from "styled-components";
import { Button } from "../../buttons";
import { FiPlus } from "react-icons/fi";
import { BiCaretDown } from "react-icons/bi";
import Calendar from 'react-calendar';
import { useCalendarStore, useNewEventStore } from "@/store";
import type { ICalendarEvent } from "@/utils";
import { EventList, type EventListProps } from "@/components/EventList";

const Root = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`
const StyledBtn = styled(Button)`
    background-color: ${props => props.theme.btnHover};
    font-size: 12px;
    width: 136px;
    height: 56px;
    border-radius: 16px;
    border: none;
    box-shadow: 3px 3px 3px ${({ theme }) => theme.borderLine};
`
const StyledCalendar = styled(Calendar)`
    background: transparent;
    border: none;
    font-size: 10px;
    &:hover {
        background: transparent;
    }
    .react-calendar button {
    }
    .react-calendar__navigation button, .react-calendar__month-view__weekdays__weekday, .react-calendar__tile {
        ${({ theme }) => theme.name === "light" && `
            color: ${theme.text};
        `};
    }
    .react-calendar__tile--active {
        border-radius: 100px;
    }
    .react-calendar__navigation button:enabled:focus {
        background-color: ${props => props.theme.btnHover} !important;
    }
    .react-calendar__navigation button:enabled:hover {
        background-color: ${props => props.theme.btnHover} !important;
    }
    .react-calendar__tile:enabled:hover {
        background-color: ${props => props.theme.btnHover} !important;
    }
    .react-calendar__tile--now {
        border-radius: 100px;
        background-color: ${props => props.theme.secondary} !important;
        color: ${props => props.theme.text} !important;
    }
`

// avoid doing integrations inside views
export interface SidebarProps extends Pick<EventListProps, "onDelete" | "onEdit"> {
    onCreateEvent: (event: Partial<ICalendarEvent>) => Promise<boolean>;
}
export const Sidebar:FC<SidebarProps> = ({ onCreateEvent, onDelete, onEdit }) => {
    const theme = useTheme()
    const { onOpenModal } = useNewEventStore()
    const { setCurrentDate } = useCalendarStore()
    
    return <Root>
        <StyledBtn onClick={() => onOpenModal({
            onSubmit: async (calendarEvent) => {
                onCreateEvent(calendarEvent);
            },
        })}>
            <FiPlus size={24} color={theme.text}/>
            Create
            <BiCaretDown/>
        </StyledBtn>
        <StyledCalendar onChange={dateString => setCurrentDate(new Date(dateString as unknown as string))}/>
        <EventList {...{
            onDelete, onEdit
        }}/>
    </Root>
}