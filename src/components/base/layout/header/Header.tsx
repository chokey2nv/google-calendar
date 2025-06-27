import styled, { useTheme } from "styled-components"
import { FiAlignJustify, FiChevronDown, FiSearch } from "react-icons/fi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsQuestionCircle } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { Dropdown } from "antd";
import { calendarViewMenuItem, type ISettingView } from "@/utils";
import { Button } from "../../buttons";
import type { FC } from "react";
import { useAppSettingStore } from "@/store";
import { CiDark, CiLight } from "react-icons/ci";

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
const IconButton = styled(Button)`
  border: none;
  background-color: transparent;
  padding: 5px;
`

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
  const { onSetView, view, theme: appDisplay, onSetTheme } = useAppSettingStore()
  return <Root>
    <LeftPane>
      <FiAlignJustify size={24} onClick={onToggleMenu}/>
      <Logo src="/assets/calendar.png"/>
      <Title>Calendar</Title>
    </LeftPane>
    <MiddlePane>
      <Button>Today</Button>
      <NavContainer>
        <IconButton>
          <FiChevronLeft size={24} color={theme.text}/>
        </IconButton>
        <IconButton>
          <FiChevronRight size={24} color={theme.text}/>
        </IconButton>
      </NavContainer>
      <DateTitle>July 2025</DateTitle>
    </MiddlePane>
    <RightPane>
      <IconButton>
        <FiSearch size={24} color={theme.text}/>
      </IconButton>
      <IconButton>
        <BsQuestionCircle size={24} color={theme.text}/>
      </IconButton>
      <IconButton>
        {appDisplay === "light" ? 
          <CiDark size={24} color={theme.text} onClick={() => onSetTheme("dark")}/> : 
          <CiLight size={24} color={theme.text} onClick={() => onSetTheme("light")}/>
        }
      </IconButton>
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
    </RightPane>
  </Root>
}