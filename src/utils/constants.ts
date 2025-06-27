import type { MenuProps } from "antd";

export const calendarViewMenuItem: MenuProps['items'] = [
    {
      label: 'Day',
      key: 'day',
    },
    {
      label: 'Week',
      key: 'week',
    },
    {
      label: 'Month',
      key: 'month',
    },
  ];

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const hours = Array.from({ length: 24 }, (_, i) => i);