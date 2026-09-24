import { Alert } from '@mui/material';
import useNotify from '../hooks/useNotify';

const Notification = () => {
  const { notification } = useNotify();
  if (!notification) return null;

  const style = {
    marginTop: 10,
    marginBottom: 10,
  };

  return (
    <Alert style={style} severity={notification.type}>
      {notification.message}
    </Alert>
  );
};

export default Notification;