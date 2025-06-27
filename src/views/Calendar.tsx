import styled from "styled-components";
import Calendar from "react-calendar";
import { useAppSettingStore } from "@/store";
import { MonthlyCalendar } from "./MonthlyCalendar";
import { WeeklyCalendar, type WeeklyCalendarProps } from "./WeeklyView";
import type { FC } from "react";
import { DayView } from "./DayView";
import { useIsMobile } from "@/hooks/isMobile";
import { MobileViewBar } from "@/components/base/layout/mobileBar";

export const Root = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    button {
        border-radius: 0 !important;
    }
`
const StyledCalendar = styled(Calendar)`
    background: transparent;
    height: 100%;
    width: 100%;
    &:hover {
        background: transparent;
    }
    .react-calendar__viewContainer {
        flex: 1;
    }
    .react-calendar__tile {
        height: calc(100vh / 7) !important;
        border: solid 1px #333537 !important;
    }
    .react-calendar__tile:enabled:hover {
        background-color: transparent !important;
    }
    .react-calendar__tile--active {
        background-color: transparent !important;
        color: ${props => props.theme.text} !important;
    }
    .react-calendar__tile--now {
        background-color: transparent !important;
        color: ${props => props.theme.text} !important;
    }
`
export interface CalendarUIProps extends  WeeklyCalendarProps {

}
export const CalendarUI:FC<CalendarUIProps> = ({
    onEventDrop, events,
}) => {
    const { view } = useAppSettingStore()
    const isMobile = useIsMobile();
    return <>
        {isMobile && <MobileViewBar/>}
        {view === "day" ? 
            <DayView  {...{ events, onEventDrop, date: new Date() }}/> : 
            (view === "week" ? <WeeklyCalendar {...{ events, onEventDrop}}/> : 
            <MonthlyCalendar {...{ events, onEventDrop }} />)}
    </>
};