import { useEventStore } from "@/store/events"
import styled, { useTheme } from "styled-components";
import type { FC } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import type { ICalendarEvent } from "@/utils";

const Root = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`
const Title = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 20px;
`
const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    position: relative;
    `
const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 12px;
    align-items: flex-start;
    color: ${({ theme }) => theme.text};
    `
const Head = styled.div`
    color: ${({ theme }) => theme.text};
    
`
const Subhead = styled.div`
    color: ${({ theme }) => theme.text};
    font-size: 11px;
    align-items: flex-start;
    text-align: left;
`
const AbsoluteDiv = styled.div`
    position: absolute;
    right: 0;
    gap: 5px;
    display: flex;
    margin-top: 10px;
    svg {
        cursor: pointer;
    }
`;
export interface EventListProps {
    onDelete: (eventId: string) => Promise<boolean>;
    onEdit: (event: ICalendarEvent) => void;
}
export const EventList:FC<EventListProps> = ({
    onDelete, onEdit
}) => {
    const { events } = useEventStore();
    const theme = useTheme();
    return (
        <Root>
            <Title>Events</Title>
            <List>
                {events?.map((item) => {
                    return (
                        <ListItem key={item.id}>
                            <Head>{item.title}</Head>
                            <Subhead>{new Date(item.date || new Date()).toDateString()}</Subhead>
                            <AbsoluteDiv>
                                <MdOutlineEdit onClick={() => onEdit(item)} size={12} color={theme.text}/>
                                <RiDeleteBin6Line onClick={() => onDelete(item.id)} size={12} color={"#d10"}/>                                        
                            </AbsoluteDiv>
                        </ListItem>
                    )
                })}
            </List>
        </Root>
    )
}