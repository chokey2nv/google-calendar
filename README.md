# 🗓️ Google Calendar

A fully-featured, modern, and testable calendar system built with **React**, **TypeScript**, and **styled-components**. This project supports **monthly**, **weekly**, and **daily** calendar views, complete with **drag-and-drop** and **responsive design**

---
## Demo 
https://drive.google.com/file/d/1wzxUO_Ij1kFbWb4lpshrNEjvkEV3VGYZ/view?usp=sharing 

## 🚀 App Url 
[https://google-calendar-423382344094.us-central1.run.app/](https://google-calendar-423382344094.us-central1.run.app/)

## 🚀 Installation & Setup
Github: https://github.com/chokey2nv/google-calendar

### 1. Clone the Repository

```bash
git clone https://github.com/chokey2nv/google-calendar.git
cd google-calendar/web
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Run the App

```bash
yarn dev
```

> This project uses **Vite** for ultra-fast builds and HMR.

---

<!-- ## 🧪 Running Tests

```bash
# or
yarn test
``` -->

> The test suite is powered by **Vitest** and **@testing-library/react**. Tests cover rendering, interaction, and expected behaviors.

---

## 🏗️ Architecture Overview

```
src/
├── components/
│   ├── base/layout/
│   │   └── Layout.tsx            # Main app layout with header/sidebar
│   ├── DayView.tsx               # 24-hour scrollable day view
│   ├── WeeklyCalendar.tsx       # Weekly grid with drag-and-drop
│   ├── MonthlyCalendar.tsx      # Monthly view with date cells
│   ├── DraggableEvent.tsx       # Basic draggable event
│   ├── DraggableResizableEvent.tsx # Draggable + resizable event (day view)
│   ├── DayCell.tsx              # Time-based cell for day view
│   ├── WeekCell.tsx             # Cell for weekly calendar
│   ├── MonthCell.tsx            # Date cell for monthly calendar
│   ├── Header.tsx               # App top bar with navigation
│   └── Sidebar.tsx              # Collapsible drawer for mobile
├── utils/
│   └── types.ts                 # Shared types like ICalendarEvent
├── __tests__/
│   └── *.test.tsx              # Unit test files for each component
```

---

## ✨ Features

### 📆 Multiple Calendar Views
- **Monthly View** with 7xN grid for full months.
- **Weekly View** for planning in columns (Sunday–Saturday).
- **Day View** split into 24 hours with draggable events.

### 🎯 Interactive Events
- **Drag and Drop** support with `react-dnd`
- **Resizable** support via `react-resizable`
- **Drop targets** update `start`/`end` date/time accordingly

### 🧩 Responsive Layout
- Sidebar turns into a **Drawer** on small screens (Ant Design)
- Layout transitions powered by `framer-motion`

### 🎨 Theming & Styling
- Global themes managed by `styled-components` and `ThemeProvider`
- Colors passed to components like events and backgrounds
- Ant Design components styled to fit the custom theme

<!-- ### ✅ Unit Testing
- Built with `Vitest`, `@testing-library/react`, and `@testing-library/jest-dom`
- Tests include:
  - Rendering of components
  - Presence of props and expected UI
  - Sample event behavior -->

---

## 📅 Example Event Format

```ts
interface ICalendarEvent {
  id: string;
  title: string;
  date: string | Date; // ISO string or Date object
  endDate: string | Date;
  color?: string;
}
```

---

## 📌 What’s Implemented So Far

- [x] Month view with drag-and-drop events
- [x] Week view with daily columns and drag and drop
- [x] Day view with resizable event duration and drag and drop
- [x] Ant Design integration
- [x] Custom theme system
- [x] Drawer sidebar for mobile
- [x] Navigation between weeks/months/days
- [x] Performance optimization with `React.memo` and `useCallback`
- [x] Event list on the sidebar to see added and removed events.
- [x] Events can be edited or deleted from the this list.
- [x] Create new event.
- [x] Update event.
- [x] View event.
- [x] Delete event.
- [x] Navigation to next and previous dates in all views (day, week and month)
- [x] Sidebar calendar to easily move to any date.
- [x] Dockerized the app and hosted on GCP => https://google-calendar-423382344094.us-central1.run.app/


---
