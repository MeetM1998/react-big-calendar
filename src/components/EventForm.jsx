import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { EventContext } from "../contexts/EventContext";

const EventForm = ({ currentEvent, setCurrentEvent, toggleForm }) => {
  const { addEvent, editEvent, deleteEvent } = useContext(EventContext);
  const [eventData, setEventData] = useState({
    title: "",
    start: "",
    end: "",
    category: "",
  });

  useEffect(() => {
    if (currentEvent) {
      setEventData({
        title: currentEvent.title,
        start: currentEvent.start.toISOString().substring(0, 16),
        end: currentEvent.end.toISOString().substring(0, 16),
        category: currentEvent.category,
      });
    } else {
      setEventData({ title: "", start: "", end: "", category: "" });
    }
  }, [currentEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentEvent) {
      editEvent({ ...eventData, id: currentEvent.id });
    } else {
      addEvent({
        ...eventData,
        id: Date.now(),
        start: new Date(eventData.start),
        end: new Date(eventData.end),
      });
    }
    setEventData({ title: "", start: "", end: "", category: "" });
    setCurrentEvent(null);
    toggleForm();
  };

  const handleDelete = () => {
    deleteEvent(currentEvent.id);
    setCurrentEvent(null);
    toggleForm();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <EventFormHeader>
          <h2>{currentEvent ? "Edit Event" : "Add Event"}</h2>
          <CloseButton onClick={toggleForm}>&times;</CloseButton>
        </EventFormHeader>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={eventData.title}
            onChange={(e) =>
              setEventData({ ...eventData, title: e.target.value })
            }
            placeholder="Event Title"
            required
          />
          <Input
            type="datetime-local"
            value={eventData.start}
            onChange={(e) =>
              setEventData({ ...eventData, start: e.target.value })
            }
            required
          />
          <Input
            type="datetime-local"
            value={eventData.end}
            onChange={(e) =>
              setEventData({ ...eventData, end: e.target.value })
            }
            required
          />
          <Select
            value={eventData.category}
            onChange={(e) =>
              setEventData({ ...eventData, category: e.target.value })
            }
            required
          >
            <option value="">Select Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </Select>

          <ButtonContainer>
            <Button type="submit">
              {currentEvent ? "Update" : "Add"} Event
            </Button>
            {currentEvent && (
              <Button type="button" danger onClick={handleDelete}>
                Delete Event
              </Button>
            )}
          </ButtonContainer>
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EventForm;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #f00;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box; /* Ensure input boxes don't overflow */
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: ${(props) => (props.danger ? "#dc3545" : "#007bff")};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: ${(props) => (props.danger ? "#c82333" : "#0056b3")};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.centered ? "center" : "space-between")};
  gap: 10px;
`;

const EventFormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;
