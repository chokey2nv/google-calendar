
import CalendarPage from '@/app/Calendar'
import { colors, NotificationProvider } from '@/utils';
import { ThemeProvider } from 'styled-components';
import { AppLayout } from '@/components/base';
import "./App.css";
import 'react-calendar/dist/Calendar.css';
import { ConfigProvider } from 'antd';
import { NewEventForm } from './components/forms';
import { useAppSettingStore } from './store';
import { EventDetailModal } from './components';

function App() {
  const { theme : themeType } = useAppSettingStore()
  const theme = colors[themeType || "dark"]
  return (
    <ConfigProvider theme={{ token: { 
      colorPrimary: theme.text,
      "colorText": theme.text,
      "colorBgElevated": theme.background,
      "colorBorder": "#333537",
    } }}>
      <ThemeProvider {...{ theme }}>
        <NotificationProvider>
          <AppLayout>
            <CalendarPage/>
          </AppLayout>
        </NotificationProvider>
        <NewEventForm/>
        <EventDetailModal/>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default App
