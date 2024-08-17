import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalendarView from './components/CalendarView';

describe('CalendarView Component', () => {
  test('renders the calendar', () => {
    render(<CalendarView />);
    expect(screen.getByTestId('react-calendar')).toBeInTheDocument();
  });

  test('opens event form', () => {
    render(<CalendarView />);
    fireEvent.click(screen.getByText(/15/));
    expect(screen.getByTestId('event-form')).toBeInTheDocument();
  });
});
