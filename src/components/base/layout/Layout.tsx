import { useState, type FC, type ReactNode } from "react";
import { Header } from "./header";
import styled from "styled-components";
import { Sidebar, type SidebarProps } from "./sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { Drawer } from "antd";
import { useIsMobile } from "@/hooks/isMobile";
import { useEventHook } from "@/hooks/events/event";
import { useEventStore } from "@/store/events";

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

const ViewLayout = styled(motion.div)<{ isMobile: boolean }>`
  height: 100%;
  flex-grow: 1;
  border-radius: ${({ isMobile }) => (isMobile ? "0" : "50px")};
  background-color: ${props => props.theme.primary};
  overflow-y: auto;
  transition: width 0.3s ease;
  padding: 5px;
`;
export interface AppLayoutProps {
    children: ReactNode;
}
export const AppLayout:FC<AppLayoutProps> = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(true)
    const  isMobile  = useIsMobile()
    const eventHook = useEventHook();
    const { setEvents } = useEventStore()

    const onCreateEvent: SidebarProps["onCreateEvent"] = async (event) => {
        const result = await eventHook.createEvent({event})
        if(result){
           const events = await eventHook.getEvents()
           if(events && events.length > 0){
               setEvents(events);
           }
        }
        console.log({ result })
        return Boolean(result)
    }
    return <Root>
        <Header {...{ 
            onToggleMenu() {
                setIsMenuOpen(prev => !prev)
            },
        }}/>
        <Content>
            <AnimatePresence initial={false}>
            {!isMobile && isMenuOpen && (
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
            {isMobile && (
                <Drawer
                    placement="left"
                    open={isMenuOpen}
                    onClose={() => setIsMenuOpen(false)}
                    closable={false}
                    width={240}
                    bodyStyle={{ padding: 0, background: 'inherit' }}
                >
                    <Sidebar onCreateEvent={onCreateEvent} />
                </Drawer>
                )}
            </AnimatePresence>
            <ViewLayout
                isMobile={isMobile}
                animate={{ width: isMenuOpen ? "calc(100% - 240px)" : "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                {children}
            </ViewLayout>
        </Content>
    </Root>
}
