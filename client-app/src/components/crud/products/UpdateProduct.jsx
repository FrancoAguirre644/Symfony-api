import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import UpdateIcon from '@material-ui/icons/Update';
import { apiAxios } from "../../../config/axios";

export const UpdateProduct = () => {

    const { id } = useParams();

    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getProduct();
        getCategories();
    }, []);

    const getProduct = () => {
        apiAxios
            .get("/products/" + id)
            .then(({ data }) => {
                setProduct(data);
            })
            .catch((error) => console.log(error));
    }

    const getCategories = () => {
        apiAxios
            .get("/categories")
            .then(({ data }) => {
                setCategories(data);
            })
            .catch((error) => console.log(error));
    }

    const handleChange = async e => {
        const { name, value } = e.target;

        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const handleSubmit = () => {
        apiAxios
            .patch("/products/" + id, product)
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
        < Grid container className={classes.container} container
            direction="row"
            justify="center"
            alignItems="center" >
            {
                categories.length > 0 && Object.entries(product).length !== 0 ?
                    <Paper className={classes.root}>
                        <Box fontWeight="700" fontSize={32} m={1}>
                            Update Product
                        </Box>
                        <form className={classes.form} noValidate autoComplete="off">
                            <Grid container spacing={3} >
                                <Grid item xs={12}>
                                    <TextField id="outlined-basic" className={classes.input} label="Code" variant="outlined" name="code" value={product.code} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" className={classes.input} label="Title" variant="outlined" name="title" value={product.title} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" className={classes.input} label="Description" variant="outlined" name="description" value={product.description} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" className={classes.input} label="Price" variant="outlined" name="price" type="number" value={product.price} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl className={classes.input}>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="category"
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
                                        startIcon={<UpdateIcon />} className={classes.button}
                                        onClick={handleSubmit} >
                                        Update
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                    :
                    <CircularProgress color="secondary" />
            }
        </Grid>
    );
}