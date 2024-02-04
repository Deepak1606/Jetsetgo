import React from "react";
import { event } from "./index";

const EventContext = React.createContext(event);

const EventProvider = ({ children }) => {
  return (
    <EventContext.Provider value={event}>
    {children}
    </EventContext.Provider>
  );
};

export default EventProvider;

export const useEvent = () => {
  return React.useContext(EventContext);
};