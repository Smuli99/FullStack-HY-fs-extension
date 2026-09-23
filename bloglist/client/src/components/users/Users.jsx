import { useUsers } from '../../stores/userStore';
import { Link } from 'react-router-dom';

import {
  Table, TableBody, TableCell,
  TableRow, TableContainer, TableHead, Paper
} from '@mui/material';

const Users = () => {
  const users = useUsers();

  const headerCellStyle = { fontWeight: 'bold', fontSize: '0.85rem' };

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={headerCellStyle}>Name</TableCell>
              <TableCell sx={headerCellStyle}>Username</TableCell>
              <TableCell sx={headerCellStyle}>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;