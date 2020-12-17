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

export const Products = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getProducts = () => {

        apiAxios
            .get("/products")
            .then(({ data }) => {
                setProducts(data);
            })
            .catch((error) => console.log(error));

    };

    const deleteProduct = (id) => {

        apiAxios
            .delete("/products/" + id)
            .then(({ data }) => {
                console.log(data);
                getProducts();
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
                products.length > 0 ?

                    <Paper className={classes.root}>
                        <TableContainer >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            ID
                                        </TableCell>
                                        <TableCell>
                                            Title
                                        </TableCell>
                                        <TableCell>
                                            Descripcion
                                        </TableCell>
                                        <TableCell>
                                            Category
                                        </TableCell>
                                        <TableCell>
                                            Price
                                        </TableCell>
                                        <TableCell>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((p) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={p.id}>
                                                <TableCell component="th" scope="row">
                                                    {p.id}
                                                </TableCell>
                                                <TableCell >{p.title}</TableCell>
                                                <TableCell >{p.description}</TableCell>
                                                <TableCell >{p.category.name}</TableCell>
                                                <TableCell >${p.price}</TableCell>
                                                <TableCell >
                                                    <Link to={`/products/update/${p.id}`}>
                                                        <Button variant="contained" color="primary" className={classes.button}>
                                                            Update
                                                        </Button>
                                                    </Link>
                                                    <Button variant="contained" color="secondary" onClick={() => deleteProduct(p.id)} className={classes.button}>
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
                            count={products.length}
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
