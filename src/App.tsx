
import CalendarPage from '@/app/Calendar'
import { colors, NotificationProvider } from '@/utils';
import { ThemeProvider } from 'styled-components';
import { AppLayout } from '@/components/base';
import "./App.css";
import 'react-calendar/dist/Calendar.css';
import { ConfigProvider } from 'antd';
import { NewEventForm } from './components/forms';
import { useAppSettingStore } from './store';

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
          <AppLayout {...{ 
              async onCreateEvent(event) {
                console.log({event})
                return false
              }, }}
            >
            <CalendarPage/>
          </AppLayout>
        </NotificationProvider>
        <NewEventForm/>
      </ThemeProvider>
    </ConfigProvider>
  )
}

export default App
