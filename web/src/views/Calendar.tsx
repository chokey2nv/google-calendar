import styled from "styled-components";
import { useAppSettingStore } from "@/store";
import { MonthlyCalendar } from "./MonthlyCalendar";
import { WeeklyCalendar, type WeeklyCalendarProps } from "./WeeklyView";
import { useEffect, type FC } from "react";
import { DayView, type DayViewProps } from "./DayView";
import { useIsMobile } from "@/hooks/isMobile";
import { MobileViewBar } from "@/components/base/layout/mobileBar";
import { useEventStore } from "@/store/events";

export const Root = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    button {
        border-radius: 0 !important;
    }
`
export interface CalendarUIProps extends  Pick<WeeklyCalendarProps, "onEventDrop" >, Pick<DayViewProps, "eventCardProps"> {
    onGetEvents: () => Promise<void>;
}
export const CalendarUI:FC<CalendarUIProps> = ({
    onEventDrop: parentOnEventDrop, onGetEvents, eventCardProps
}) => {
    const { view } = useAppSettingStore()
    const { events  } = useEventStore()
    const isMobile = useIsMobile();

    useEffect(() => {
        onGetEvents()
    }, [])
    const onEventDrop = async (eventId: string, newDate: Date) => {
        await parentOnEventDrop(eventId, newDate)
    }
    return <>
        {isMobile && <MobileViewBar/>}
        {view === "day" ? 
            <DayView  {...{ events, onEventDrop, date: new Date(), eventCardProps }}/> : 
            (view === "week" ? <WeeklyCalendar {...{ events, onEventDrop, eventCardProps}}/> : 
            <MonthlyCalendar {...{ events, onEventDrop, eventCardProps }} />)}
    </>
};