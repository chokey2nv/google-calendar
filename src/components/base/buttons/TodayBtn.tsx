import { useAppSettingStore, useCalendarStore } from "@/store"
import { Button } from "./button"
import { getStartOfWeek } from "@/utils";

export const TodayBtn = () => {
    const { setCurrentDate, setStartOfWeek } = useCalendarStore();
    const { view } = useAppSettingStore();
    return (
        <Button onClick={() => {
            if(view === "week"){
                setStartOfWeek(getStartOfWeek(new Date()))
            }else {
                setCurrentDate(new Date())
            }
        }}>Today</Button>
    )
}