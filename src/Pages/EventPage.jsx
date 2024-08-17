import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import EventDetails from '../components/EventDetails';
import { EventContext } from '../contexts/EventContext';

const EventPage = () => {
  const { id } = useParams();
  const { events } = useContext(EventContext);
  const event = events.find(event => event.id === parseInt(id));

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <div>
      <EventDetails event={event} />
    </div>
  );
};

export default EventPage;
