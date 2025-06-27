import { useAppSettingStore } from "@/store";
import { calendarViewMenuItem, type ISettingView } from "@/utils";
import { Dropdown } from "antd";
import type { FC } from "react";
import { FiChevronDown } from "react-icons/fi";
import { useTheme } from "styled-components";
import { Button } from "./button";



export const ViewSelectorBtn:FC = () => {
    const theme = useTheme();
    const { onSetView, view} = useAppSettingStore()
    return (
        <Dropdown {...{
            menu: {
            items: calendarViewMenuItem,
            style:{
                backgroundColor: theme.btnHover,
            },
            onClick: (e) => {
                onSetView(e.key as ISettingView)
            }
            },
            trigger:["click"]
        }}>
            <Button>{view} <FiChevronDown/></Button>
        </Dropdown>
    )
}