import type { FC } from "react";
import { Button, IconButton, TodayBtn, ViewSelectorBtn } from "../../buttons";
import styled, { useTheme } from "styled-components";
import { FiSearch } from "react-icons/fi";
export const Root = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
`

export const MobileViewBar:FC = () => {
    const theme = useTheme();
    return (
        <Root>
            <TodayBtn/>
            <ViewSelectorBtn/>
            <IconButton>
                <FiSearch size={24} color={theme.text}/>
            </IconButton>
        </Root>
    )
}