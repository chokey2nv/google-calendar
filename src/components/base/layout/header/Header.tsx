import styled, { useTheme } from "styled-components"
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import { Button, IconButton, TodayBtn, ViewSelectorBtn } from "../../buttons";
import { useCallback, useMemo, type FC } from "react";
import { useAppSettingStore, useCalendarStore } from "@/store";
import { CiDark, CiLight } from "react-icons/ci";
import { useIsMobile } from "@/hooks/isMobile";

const Root = styled.div`
    padding: 8px;
    transition: background-color .4s;
    min-width: min-content;
    display: flex;
    color: ${props => props.theme.text};
    background: transparent;
    gap: 20px;
    justify-content: space-between;
   
`
const LeftPane = styled.div`
    align-items: center;
    display: flex;
    gap: 10px;
`;
const Title = styled.div`
    display: block;
    font-family: "Product Sans", Arial, sans-serif;
    font-size: 22px;
    line-height: 48px;
    overflow: hidden;
    padding-left: 8px;
    position: relative;
    text-overflow: ellipsis;
    top: -1.5px;
    vertical-align: middle;
`
const Logo = styled.img`
    width: 40px;
    height: 40px;
`
const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0px;
`;


const MiddlePane = styled(LeftPane)`
  // gap: 10px;
`
const DateTitle = styled.div`
    font: 400 22px / 28px "Google Sans", Roboto, Arial, sans-serif;
    letter-spacing: 0;
    white-space: nowrap;
`
const RightPane = styled(LeftPane)`

`

export interface HeaderProps {
  onToggleMenu: () => void;
}
export const Header:FC<HeaderProps> = ({ onToggleMenu }) => {
  const theme = useTheme();
  const isMobile = useIsMobile();
  const { view, theme: appDisplay, onSetTheme } = useAppSettingStore()
  const { currentDate, startOfWeek, setCurrentDate, setStartOfWeek } = useCalendarStore();
  const dateRangeText = useMemo(() => {
      const end = new Date(startOfWeek);
      end.setDate(startOfWeek.getDate() + 6);
      const startLabel = startOfWeek.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      const endLabel = end.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
      return `${startLabel} – ${endLabel}`;
  }, [startOfWeek]);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const prev = useCallback(() => {
    if(view === "month") {
      setCurrentDate(new Date(year, month - 1));
    }else if(view === "week") {
      setStartOfWeek(new Date(startOfWeek.setDate(startOfWeek.getDate() - 7)));
    }else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)))
    }
  }, [startOfWeek, currentDate, view]);
  const next = useCallback(() => {
    if(view === "month") {
      setCurrentDate(new Date(year, month + 1));
    }else if(view === "week") {
      setStartOfWeek(new Date(startOfWeek.setDate(startOfWeek.getDate() + 7)));
    }else {
      setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)))
    }
  }, [startOfWeek, currentDate, view]);
  let formatted = "";
  if(view === "month") {
      formatted = currentDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });
  }else if(view === "week") {
      formatted = dateRangeText;
  }else {
    formatted = currentDate.toDateString()
  }
  return <Root>
    <LeftPane>
      <FiAlignJustify size={24} onClick={onToggleMenu}/>
      <Logo src="/assets/calendar.png"/>
      <Title>Calendar</Title>
    </LeftPane>
    {!isMobile && <MiddlePane>
      <TodayBtn/>
      <NavContainer>
        <IconButton onClick={prev}>
          <FiChevronLeft size={24} color={theme.text}/>
        </IconButton>
        <IconButton onClick={next}>
          <FiChevronRight size={24} color={theme.text}/>
        </IconButton>
      </NavContainer>
      <DateTitle>{formatted}</DateTitle>
    </MiddlePane>}
    <RightPane>
      {!isMobile && <IconButton>
        <FiSearch size={24} color={theme.text}/>
      </IconButton>}
      <IconButton>
        <BsQuestionCircle size={24} color={theme.text}/>
      </IconButton>
      <IconButton>
        {appDisplay === "light" ? 
          <CiDark size={24} color={theme.text} onClick={() => onSetTheme("dark")}/> : 
          <CiLight size={24} color={theme.text} onClick={() => onSetTheme("light")}/>
        }
      </IconButton>
      {!isMobile && <ViewSelectorBtn/>}
    </RightPane>
  </Root>
}