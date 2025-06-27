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