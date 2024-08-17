import React from 'react';
import CalendarView from './components/CalendarView';
import { EventProvider } from './contexts/EventContext';
import styled from 'styled-components';

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const App = () => {
  return (
    <EventProvider>
      <AppContainer>
        <h1>My Calendar App</h1>
        <CalendarView />
      </AppContainer>
    </EventProvider>
  );
};

export default App;
