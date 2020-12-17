import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import { apiAxios } from "../../../config/axios";

export const AddProduct = () => {

    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({});
    const history = useHistory();

    useEffect(() => {
        getCategories();
    }, []);

    const handleChange = async e => {
        const { name, value } = e.target;

        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const getCategories = () => {

        apiAxios
            .get("/categories")
            .then(({ data }) => {
                setCategories(data);
            })
            .catch((error) => console.log(error));

    }

    const handleSubmit = () => {
        apiAxios
            .post("/products", product)
            .then(({ data }) => {
                console.log(data);
                history.push('/products');
            })
            .catch((error) => console.log(error));
    }

    const useStyles = makeStyles({
        root: {
            width: '60%',
            padding: '20px',
        },
        container: {
            padding: 30,
        },
        input: {
            width: '100%',
        },
        form: {
            width: '100%',
            marginTop: '1rem',
        },
    });

    const classes = useStyles();

    return (
        <Grid container className={classes.container} container
            direction="row"
            justify="center"
            alignItems="center" >
            {
                categories.length > 0 ?
                    <Paper className={classes.root}>
                        <Box fontWeight="700" fontSize={32} m={1}>
                            Add Product
                        </Box>
                        <form className={classes.form} noValidate autoComplete="off">
                            <Grid container spacing={3} >
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" className={classes.input} label="Code" variant="outlined" name="code" onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" className={classes.input} label="Title" variant="outlined" name="title" onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" className={classes.input} label="Description" variant="outlined" name="description" onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" className={classes.input} label="Price" variant="outlined" name="price" type="number" onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl className={classes.input}>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="category"
                                            value={1}
                                            onChange={handleChange}
                                        >
                                            {categories.map((c) =>
                                                <MenuItem value={c.id}>{c.name}</MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" color="primary"
                                        className={classes.button}
                                        startIcon={<AddIcon />} className={classes.button} onClick={handleSubmit}>
                                        Add
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                    :
                    <CircularProgress color="secondary" />
            }
            {JSON.stringify(product)}
        </Grid >
    )
}