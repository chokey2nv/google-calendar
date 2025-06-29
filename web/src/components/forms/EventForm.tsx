import { useNewEventStore } from "@/store"
import { type FormInstance, Modal } from "antd"
import { FORM_FIELD_TYPES, FormAdapter, type SelectField } from "./FormAdapter"
import { useEffect, useRef } from "react"
import { type ICalendarEvent } from "@/utils"
import styled, { useTheme } from "styled-components"
import { MdClose } from "react-icons/md"
import { Button } from "../base/buttons"
import dayjs from "dayjs"

function toFullDateTime(date: dayjs.Dayjs, hour?: string, minute?: string): Date {
  const hr = parseInt(hour || '0', 10);
  const min = parseInt(minute || '0', 10);
  return date.hour(hr).minute(min).second(0).toDate();
}

const Title = styled.div`
    color: ${({ theme }) => theme.text};
    font-size: 12px;
    font-weight: 700;
`
const BtnContainer = styled.div`
    padding: 20px;
`
const CustomModal = styled(Modal)`
    .ant-input::placeholder {
        color: ${({ theme }) => theme.placeholder};
    }
    .ant-select-selection-placeholder {
        color: ${({ theme }) => theme.placeholder};
    }
    .ant-picker-input > input::placeholder {
        color: ${({ theme }) => theme.placeholder};
    }
    .ant-input {
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
    }
    .ant-picker {
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
    }
    .ant-select-single.ant-select-lg .ant-select-selector  {
        background-color: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
    }
`

export interface INewEventForm extends Omit<ICalendarEvent, "date"|"endDate"> {
    hour: string;
    minute: string
    date: dayjs.Dayjs
    endDate: dayjs.Dayjs
    endHour: string
    endMinute: string
}
export const NewEventForm = () => {
    const { isModalOpen, onCancel: initCancel, onSubmit, calendarEvent } = useNewEventStore()
    const formRef = useRef<FormInstance<INewEventForm>>(null)
    const theme = useTheme();
    const onCancel = () => {
        initCancel?.();
        formRef.current?.resetFields();
    }
    const onFinish = (form: INewEventForm) => {
        const { date, hour, minute, title, description, endDate, endHour, endMinute } = form;
        const event: Partial<ICalendarEvent> = {
            title,
            description,
            date: toFullDateTime(date, hour, minute).toISOString(),
            endDate: toFullDateTime(endDate || date, endHour, endMinute).toISOString()
        }
        onSubmit?.(event).finally(() => {
            onCancel?.()
            formRef.current?.resetFields();
        });
    };
    useEffect(() => {
        if(calendarEvent){
            const date = dayjs(calendarEvent.date || new Date());
            const endDate = dayjs(calendarEvent.endDate || new Date());
            const data = {
                ...calendarEvent,
                date,
                endDate: endDate,
                hour: date.hour().toString(),
                minute: date.minute().toString(),
                endHour: endDate.hour().toString(),
                endMinute: endDate.minute().toString(),
            }
            formRef.current?.setFieldsValue(data);
        }
        // return () => {
        //     onCancel();
        // }
    }, [JSON.stringify(calendarEvent)])
    return (
        <CustomModal onCancel={onCancel} open={isModalOpen} footer={null} closeIcon={<MdClose size={24} onClick={onCancel} color={theme.text} />}>
            <BtnContainer style={{paddingTop: 0}}>
                <Title>New Event</Title>
            </BtnContainer>
            <FormAdapter {...{
                formRef,
                formProps: {
                    layout: "vertical",
                },
                items:[
                    {
                        fieldType: FORM_FIELD_TYPES.TEXT,
                        itemProps: {
                            name: "title",
                            label: "Title", 
                            rules:[{
                                required: true,
                                message: "Event title is required"
                            }]                           
                        },
                        fieldProps: {
                            size: "large",
                            placeholder: "Event name"
                        }
                    },
                    {
                        fieldType: FORM_FIELD_TYPES.TEXT_AREA,
                        itemProps: {
                            name: "description",
                            label: "Description",      
                            rules:[{
                                required: true,
                                message: "Event description is required"
                            }]                      
                        },
                        fieldProps: {
                            size: "large",
                            placeholder: "Event description"
                        }
                    },
                    {
                        fieldType: FORM_FIELD_TYPES.FIELDS,
                        itemProps: {
                            name: "time",
                        },
                        fieldProps: [
                            {
                                fieldType: FORM_FIELD_TYPES.DATE,                        
                                itemProps: {
                                    name: "date",
                                    label: "Date",   
                                    rules:[{
                                        required: true,
                                        message: "Event date is required"
                                    }]                         
                                },
                                fieldProps: {                            
                                    size: "large",
                                    placeholder: "Event description"
                                },
                                colProps: {
                                    span: 12,
                                }
                            },
                            {
                                fieldType: FORM_FIELD_TYPES.SELECT,
                                itemProps: {
                                    name: "hour",
                                    label: "Hour",
                                    rules:[{
                                        required: true,
                                        message: "Event hour is required"
                                    }]
                                },                                
                                fieldProps: {
                                    options: Array.from({ length: 24 }, (_, i) => ({ value: i.toString(), label: String(i)})),
                                    field: {
                                        size: "large",
                                        placeholder: "Hour",
                                        style: {
                                            // minWidth: 100,
                                        }
                                    }
                                } as SelectField,
                                colProps: {
                                    span: 6,
                                }
                            },
                            {
                                fieldType: FORM_FIELD_TYPES.SELECT,
                                itemProps: {
                                    name: "minute",
                                    label: "Minute"
                                },                                
                                fieldProps: {
                                    options: Array.from({ length: 60 }, (_, i) => ({ value: i.toString(), label: String(i)})),
                                    field: {
                                        size: "large",
                                        placeholder: "Minute",
                                        style: {
                                            // minWidth: 100,
                                        }
                                    }
                                } as SelectField,
                                colProps: {
                                    span: 6,
                                }
                            }
                        ]
                    },
                    {
                        fieldType: FORM_FIELD_TYPES.FIELDS,
                        itemProps: {
                            name: "time",
                        },
                        fieldProps: [
                            {
                                fieldType: FORM_FIELD_TYPES.DATE,                        
                                itemProps: {
                                    name: "endDate",  
                                    label: "End date"
                                },
                                fieldProps: {
                                    placeholder: "End date",
                                    size: "large",
                                },
                                colProps: {
                                    span: 12,
                                }
                            },
                            {
                                fieldType: FORM_FIELD_TYPES.SELECT,
                                itemProps: {
                                    name: "endHour",
                                    label: "End hour",
                                },                                
                                fieldProps: {
                                    options: Array.from({ length: 24 }, (_, i) => ({ value: i.toString(), label: String(i)})),
                                    field: {
                                        size: "large",
                                        placeholder: "Hour",
                                        style: {
                                            // minWidth: 100,
                                        }
                                    }
                                } as SelectField,
                                colProps: {
                                    span: 6,
                                }
                            },
                            {
                                fieldType: FORM_FIELD_TYPES.SELECT,
                                itemProps: {
                                    name: "endMinute",
                                    label: "End minute"
                                },                                
                                fieldProps: {
                                    options: Array.from({ length: 60 }, (_, i) => ({ value: i.toString(), label: String(i)})),
                                    field: {
                                        size: "large",
                                        placeholder: "Minute",
                                        style: {
                                            // minWidth: 100,
                                        }
                                    }
                                } as SelectField,
                                colProps: {
                                    span: 6,
                                }
                            }
                        ]
                    },
                ]
            }}/>
            <BtnContainer>
                <Button onClick={async () => {
                    const form = await formRef.current?.validateFields()
                    if(!form){
                        return;
                    }
                    onFinish(form);
                }}>Save</Button>
            </BtnContainer>
        </CustomModal>
    )
}