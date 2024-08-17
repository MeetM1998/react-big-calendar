import React, { useContext, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import styled from "styled-components";
import { EventContext } from "../contexts/EventContext";
import EventForm from "./EventForm";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const { events } = useContext(EventContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const filteredEvents = selectedCategory
    ? events.filter((event) => event.category === selectedCategory)
    : events;

  const handleSelectEvent = (event) => {
    setCurrentEvent(event);
    setShowForm(true);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setCurrentEvent(null);
  };

  return (
    <>
      <HeaderContainer>
        <FilterContainer>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </Select>
        </FilterContainer>

        <Button onClick={handleToggleForm}>
          {showForm ? "Hide Form" : "Add New Event"}
        </Button>
      </HeaderContainer>
      {showForm && (
        <EventForm
          currentEvent={currentEvent}
          setCurrentEvent={setCurrentEvent}
          toggleForm={handleToggleForm}
        />
      )}

      <CalendarContainer>
        <Calendar
          localizer={localizer}
          events={filteredEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={(slotInfo) => {
            setCurrentEvent({
              start: slotInfo.start,
              end: slotInfo.end,
            });
            setShowForm(true);
          }}
          selectable
        />
      </CalendarContainer>
    </>
  );
};

export default CalendarView;

const CalendarContainer = styled.div`
  height: 500px;
  margin: 50px auto;
  width: 90%;
  max-width: 1000px;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FilterContainer = styled.div`
  text-align: center;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;
