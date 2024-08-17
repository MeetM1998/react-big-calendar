import React, { useContext } from 'react';
import { EventContext } from '../contexts/EventContext';

const EventDetails = ({ event }) => {
  const { deleteEvent } = useContext(EventContext);

  return (
    <div>
      <h3>{event.title}</h3>
      <p>Start: {new Date(event.start).toLocaleString()}</p>
      <p>End: {new Date(event.end).toLocaleString()}</p>
      <p>Category: {event.category}</p>
      <button onClick={() => deleteEvent(event.id)}>Delete Event</button>
    </div>
  );
};

export default EventDetails;
