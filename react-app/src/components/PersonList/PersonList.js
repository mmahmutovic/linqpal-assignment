import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getAllExternalUsers, getCurrentUser } from './../../services/user.service';
const useStyles = makeStyles({
    table: {
      minWidth: 650,
      maxWidth: '80%'
    },
  });

  
export default function PersonList(props) {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        async function getUsers(){
          const user = getCurrentUser();
          if (user) {
            const result = await getAllExternalUsers();
            setUsers(result.data);
            setLoading(false);
          } else {
            props.history.push('/login');
            window.location.reload();
          }
        }
        getUsers()
    }, []);
    return (
      <TableContainer className={classes.table} component={Paper}>
        {isLoading}
        {
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                    <TableCell>First name</TableCell>
                    <TableCell align="right">Last name</TableCell>
                    <TableCell align="right">Country</TableCell>
                    <TableCell align="right">Zip Code</TableCell>
                    <TableCell align="right">City</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="right">Phone number</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                    <TableRow key={user._id}>
                        <TableCell component="th" scope="row">
                        {user.firstName}
                        </TableCell>
                        <TableCell align="right">{user.lastName}</TableCell>
                        
                        <TableCell align="right">{user.country}</TableCell>
                        <TableCell align="right">{user.zipCode}</TableCell>
                        <TableCell align="right">{user.city}</TableCell>
                        <TableCell align="right">{user.address}</TableCell>
                        <TableCell align="right">{user.phoneNumber}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        }
      </TableContainer>
    );
}