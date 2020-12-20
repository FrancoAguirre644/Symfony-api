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
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
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

    const deleteCategory = (id, name) => {

        const confirm = window.confirm("Are you sure you want to delete the category: " + name + "?");

        if (confirm) {

            apiAxios
                .delete("/categories/" + id)
                .then(({ data }) => {
                    console.log(data);
                    getCategories();
                })
                .catch((error) => console.log(error));

        }
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
        link: {
            textDecoration: 'none',
            color: '#FFFFFF',
        }
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
                        <Link to="/categories/add" className={classes.link}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<AddIcon />}
                            >
                                Add Category
                            </Button>
                        </Link>
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
                                            Actions
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
                                                <TableCell >
                                                    <Link to={`/categories/update/${c.id}`} className={classes.link}>
                                                        <Button variant="contained" color="primary" className={classes.button}>
                                                            Update
                                                            </Button>
                                                    </Link>
                                                    <Button variant="contained" color="secondary" onClick={() => deleteCategory(c.id, c.name)} className={classes.button}>
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
