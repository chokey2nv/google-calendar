import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {DayView} from '../src/views/DayView';
import { describe, expect, it} from "vitest"

describe('DayView', () => {
  it('renders all 24 hour rows', () => {
    const date = new Date('2025-07-01T00:00:00');
    render(<DayView  events={[]} onEventDrop={() => { } } eventCardProps={{
      async onDeleteEvent(eventId) {
          return true
      },
      async onEditEvent(eventId, event) {

      },
      onResize() {
      }
    }} />);

    expect(screen.getByText('Tue Jul 01 2025')).toBeInTheDocument();
    expect(screen.getAllByText(/AM|PM/)).toHaveLength(24);
  });
});