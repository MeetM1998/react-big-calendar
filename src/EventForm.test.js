import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventForm from './components/EventForm';
import { EventContext } from './context/EventContext';

const mockAddEvent = jest.fn();
const mockEditEvent = jest.fn();
const mockDeleteEvent = jest.fn();
const mockToggleForm = jest.fn();

const renderComponent = (currentEvent = null) => {
  return render(
    <EventContext.Provider
      value={{ addEvent: mockAddEvent, editEvent: mockEditEvent, deleteEvent: mockDeleteEvent }}
    >
      <EventForm currentEvent={currentEvent} setCurrentEvent={jest.fn()} toggleForm={mockToggleForm} />
    </EventContext.Provider>
  );
};

describe('EventFormModal Component', () => {
  test('renders the form modal', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Event Title')).toBeInTheDocument();
    expect(screen.getByLabelText(/start/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/end/i)).toBeInTheDocument();
    expect(screen.getByText('Add Event')).toBeInTheDocument();
  });

  test('submits the form', () => {
    renderComponent();
    fireEvent.change(screen.getByPlaceholderText('Event Title'), { target: { value: 'New Event' } });
    fireEvent.change(screen.getByLabelText(/start/i), { target: { value: '2024-08-18T09:00' } });
    fireEvent.change(screen.getByLabelText(/end/i), { target: { value: '2024-08-18T10:00' } });
    fireEvent.change(screen.getByDisplayValue('Select Category'), { target: { value: 'Work' } });
    fireEvent.submit(screen.getByText('Add Event'));
    expect(mockAddEvent).toHaveBeenCalled();
    expect(mockToggleForm).toHaveBeenCalled();
  });

  test('closes the form modal', () => {
    renderComponent();
    fireEvent.click(screen.getByText('×'));
    expect(mockToggleForm).toHaveBeenCalled();
  });

  test('shows validation error', () => {
    renderComponent();
    fireEvent.submit(screen.getByText('Add Event'));
    expect(screen.getByPlaceholderText('Event Title')).toBeInvalid();
    expect(screen.getByLabelText(/start/i)).toBeInvalid();
    expect(screen.getByLabelText(/end/i)).toBeInvalid();
    expect(screen.getByDisplayValue('Select Category')).toBeInvalid();
  });

  test('edits an existing event', () => {
    const event = {
      id: 1,
      title: 'Meeting',
      start: new Date('2024-08-17T10:00'),
      end: new Date('2024-08-17T11:00'),
      category: 'Work',
    };
    renderComponent(event);
    fireEvent.change(screen.getByPlaceholderText('Event Title'), { target: { value: 'Updated Meeting' } });
    fireEvent.submit(screen.getByText('Update Event'));
    expect(mockEditEvent).toHaveBeenCalled();
    expect(mockToggleForm).toHaveBeenCalled();
  });

  test('deletes an event', () => {
    const event = {
      id: 1,
      title: 'Meeting',
    };
    renderComponent(event);
    fireEvent.click(screen.getByText('Delete Event'));
    expect(mockDeleteEvent).toHaveBeenCalled();
    expect(mockToggleForm).toHaveBeenCalled();
  });
});
