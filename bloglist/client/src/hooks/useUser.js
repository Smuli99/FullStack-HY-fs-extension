import { useContext } from 'react';
import SignedinUserContext from '../contexts/SignedinUser';

const useUser = () => useContext(SignedinUserContext);

export default useUser;