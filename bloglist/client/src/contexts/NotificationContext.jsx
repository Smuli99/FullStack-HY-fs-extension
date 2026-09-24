import { createContext, useState } from 'react';

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null);

  const notify = (message, type = 'success') => setNotification({ message, type });
  const resetNotify = () => setNotification(null);

  return (
    <NotificationContext.Provider value={{ notification, notify, resetNotify }}>
      {props.children}
    </NotificationContext.Provider>
  );
};