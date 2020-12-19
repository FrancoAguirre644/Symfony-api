import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { apiAxios } from "../../../config/axios";

export const Customers = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getCustomers = () => {

        apiAxios
            .get("/customers")
            .then(({ data }) => {
                console.log(data);
                setCustomers(data);
            })
            .catch((error) => console.log(error));

    };

    const deleteCustomer = (id) => {

        apiAxios
            .delete("/customers/" + id)
            .then(({ data }) => {
                getCustomers();
            })
            .catch((error) => console.log(error));
    }

    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        container: {
            padding: 30,
        },
        button: {
            margin: 2,
        }
    });

    const classes = useStyles();

    return (
        <Grid container className={classes.container} container
            direction="row"
            justify="center"
            alignItems="center">
            {
                customers.length > 0 ?

                    <Paper className={classes.root}>
                        <TableContainer >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            ID
                                        </TableCell>
                                        <TableCell>
                                            Name
                                        </TableCell>
                                        <TableCell>
                                            Last Name
                                        </TableCell>
                                        <TableCell>
                                            E-mail
                                        </TableCell>
                                        <TableCell>
                                            Phone
                                        </TableCell>
                                        <TableCell>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((p) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={p.id}>
                                                <TableCell component="th" scope="row">
                                                    {p.id}
                                                </TableCell>
                                                <TableCell >{p.name}</TableCell>
                                                <TableCell >{p.lastName}</TableCell>
                                                <TableCell >{p.email}</TableCell>
                                                <TableCell >{p.phoneNumber}</TableCell>
                                                <TableCell >
                                                    <Link to={`/products/update/${p.id}`}>
                                                        <Button variant="contained" color="primary" className={classes.button}>
                                                            Update
                                                        </Button>
                                                    </Link>
                                                    <Button variant="contained" color="secondary" onClick={() => deleteCustomer(p.id)} className={classes.button}>
                                                        Delete
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={customers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />

                    </Paper>
                    :
                    <CircularProgress color="secondary" />
            }
        </Grid>
    );
}
