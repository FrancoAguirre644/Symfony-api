import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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
import ButtonBase from '@material-ui/core/ButtonBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import { apiAxios } from "../../../config/axios";


export const Carts = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        getCarts();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getCarts = () => {

        apiAxios
            .get("/carts")
            .then(({ data }) => {
                console.log(data);
                setCarts(data);
            })
            .catch((error) => console.log(error));

    };

    const deleteCart = (idCustomer, idCart) => {

        apiAxios
            .delete("/customers/" + idCustomer + "/cart/" + idCart)
            .then(({ data }) => {
                console.log(data);
                getCarts();
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
        },
        image: {
            height: 30,
            marginRight: 10,
        },
        img: {
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
            marginRight: 4,
        },
    });

    const classes = useStyles();

    return (
        <Grid container className={classes.container} container
            direction="row"
            justify="center"
            alignItems="center">
            {
                carts.length > 0 ?
                    <Paper className={classes.root}>
                        <TableContainer >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            ID
                                        </TableCell>
                                        <TableCell>
                                            Date
                                        </TableCell>
                                        <TableCell>
                                            Customer
                                        </TableCell>
                                        <TableCell>
                                            Products
                                        </TableCell>
                                        <TableCell>
                                            Total
                                        </TableCell>
                                        <TableCell>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {carts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((c) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={c.id}>
                                                <TableCell component="th" scope="row">
                                                    {c.id}
                                                </TableCell>
                                                <TableCell>
                                                    {c.dateTime}
                                                </TableCell>
                                                <TableCell >{c.customer.name} {c.customer.lastName} </TableCell>
                                                <TableCell >
                                                    {c.products.map((p) => {
                                                        return (<ButtonBase className={classes.image}>
                                                            <img className={classes.img} alt="complex" src="https://i.ytimg.com/vi/aWttx80Uflk/hqdefault.jpg" />
                                                            {p.description} • ${p.price}</ButtonBase>)
                                                    })}
                                                </TableCell>
                                                <TableCell > ${c.total}</TableCell>
                                                <TableCell >
                                                    <Link to={`/categories/update/${c.id}`}>
                                                        <Button variant="contained" color="primary" className={classes.button}>
                                                            Update
                                                            </Button>
                                                    </Link>
                                                    <Button variant="contained" color="secondary" onClick={() => deleteCart(c.customer.id, c.id)} className={classes.button}>
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
                            count={carts.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />

                    </Paper>
                    :
                    <CircularProgress color="secondary" />
            }

        </Grid >
    );
}
