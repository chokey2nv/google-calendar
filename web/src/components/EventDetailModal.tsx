import { Modal } from "antd"
import { type ICalendarEvent } from "@/utils"
import styled, { useTheme } from "styled-components"
import { MdClose } from "react-icons/md"
import { Button, IconButton } from "./base/buttons"
import type dayjs from "dayjs"
import { useEventDetailModal } from "@/store/eventDetail"
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";

const Title = styled.div`
    color: ${({ theme }) => theme.text};
    font-size: 1.375rem;
    font-weight: 400;
`
const Description = styled.div`
    color: ${({ theme }) => theme.placeholder};
    font-size: 14px;
`

const Header = styled.div`
    margin-left: auto;
    gap: 20px;
    display: flex;
    justify-content: flex-end;
    margin-right: 50px;
    margin-top: -12px;
`
const BtnContainer = styled.div`
    padding: 20px;
`
const CustomModal = styled(Modal)`

`
const Body = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
const DateContainer = styled.div`
    display: flex;
    gap: 10px;
`
const Head = styled.div`
    color: ${({ theme }) => theme.text};
    font-size: 14px;
`
const Value = styled.div`
    color: ${({ theme }) => theme.placeholder};
    font-size: 14px;
`
export interface IEventDetailModal extends Omit<ICalendarEvent, "date"|"endDate"> {
    hour: string;
    minute: string
    date: dayjs.Dayjs
    endDate: dayjs.Dayjs
    endHour: string
    endMinute: string
}
export const EventDetailModal = () => {
    const { isModalOpen, calendarEvent, onCancel, onDelete, onEdit } = useEventDetailModal()
    const theme = useTheme();
    return (
        <CustomModal onCancel={onCancel} open={isModalOpen} footer={null} closeIcon={<MdClose size={24} onClick={onCancel} color={theme.text} />}>
            <Header>
                <IconButton onClick={() => {
                    onEdit?.();
                    onCancel?.();
                }}>
                    <MdOutlineEdit size={24} color={theme.text}/>
                </IconButton>
                <IconButton onClick={() => {
                    if(calendarEvent?.id){
                        onDelete?.(calendarEvent.id)
                    }
                }}>
                    <RiDeleteBin6Line size={24} color={theme.text}/>
                </IconButton>
            </Header>
            <Body>
                <Title>{calendarEvent?.title}</Title>
                <Description>{calendarEvent?.description}</Description>
                <div style={{marginBottom: 20}}/>
                <DateContainer>
                    <Head>Start:</Head>
                    <Value>{new Date(calendarEvent?.date || new Date()).toUTCString()}</Value>
                </DateContainer>
                <DateContainer>
                    <Head>End:</Head>
                    <Value>{new Date(calendarEvent?.endDate || new Date()).toUTCString()}</Value>
                </DateContainer>
            </Body>
            <BtnContainer>
                <Button onClick={onCancel}>Close</Button>
            </BtnContainer>
        </CustomModal>
    )
}