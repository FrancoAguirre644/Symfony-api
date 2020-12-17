import React, { useState, useEffect } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import { apiAxios } from "../../../config/axios";


export const Categories = () => {

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getCategories = () => {

        apiAxios
            .get("/categories")
            .then(({ data }) => {
                setCategories(data);
            })
            .catch((error) => console.log(error));

    };

    const useStyles = makeStyles({
        root: {
            width: '100%',
        },
        container: {
            padding: 30,
        },
    });

    const classes = useStyles();

    return (
        <Grid container className={classes.container} container
            direction="row"
            justify="center"
            alignItems="center">
            {
                categories.length > 0 ?

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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((c) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={c.id}>
                                                <TableCell component="th" scope="row">
                                                    {c.id}
                                                </TableCell>
                                                <TableCell >{c.name}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={categories.length}
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
