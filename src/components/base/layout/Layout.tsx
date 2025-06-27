import { useState, type FC, type ReactNode } from "react";
import { Header } from "./header";
import styled from "styled-components";
import { Sidebar, type SidebarProps } from "./sidebar";
import { AnimatePresence, motion } from "framer-motion";

const Root = styled.div`
    background-color: ${props => props.theme.background};
    height: 100vh;
    width: 100vw;
`
const Content = styled.div`
    display: flex;
    height: calc(100% - 52px);
    width: 100%;
`
const MotionSidebar = styled(motion.div)`
  width: 240px;
  min-width: 240px;
  height: 100%;
  background-color: ${props => props.theme.background};
  z-index: 10;
  position: relative;
`;

const ViewLayout = styled(motion.div)`
  height: 100%;
  flex-grow: 1;
  border-radius: 50px 0 0 0;
  background-color: ${props => props.theme.primary};
  overflow-y: auto;
  transition: width 0.3s ease;
`;
export interface AppLayoutProps extends Pick<SidebarProps, "onCreateEvent"> {
    children: ReactNode;
}
export const AppLayout:FC<AppLayoutProps> = ({ children, onCreateEvent }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(true)
    return <Root>
        <Header {...{ 
            onToggleMenu() {
                setIsMenuOpen(prev => !prev)
            },
        }}/>
        <Content>
            <AnimatePresence initial={false}>
            {isMenuOpen && (
                <MotionSidebar
                    key="sidebar"
                    initial={{ x: -240, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -240, opacity: 0 }}
                    transition={{ type: "tween", duration: 0.3 }}
                >
                    <Sidebar {...{ onCreateEvent }}/>
                </MotionSidebar>
            )}
            </AnimatePresence>
            <ViewLayout
                animate={{ width: isMenuOpen ? "calc(100% - 240px)" : "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {children}
            </ViewLayout>
        </Content>
    </Root>
}
