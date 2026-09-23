import { Alert } from '@mui/material';
import { useNotification } from '../stores/notificationStore';

const Notification = () => {
  const { message, type } = useNotification();
  if (!message) return null;

  const style = {
    marginTop: 10,
    marginBottom: 10,
  };

  return (
    <Alert style={style} severity={type}>
      {message}
    </Alert>
  );
};

export default Notification;
