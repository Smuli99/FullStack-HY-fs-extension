import { useContext } from 'react';
import NotificationContext from '../contexts/NotificationContext';

const useNotify = () => useContext(NotificationContext);

export default useNotify;