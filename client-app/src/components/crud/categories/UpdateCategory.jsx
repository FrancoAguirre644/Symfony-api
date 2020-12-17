import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { apiAxios } from "../../../config/axios";

export const UpdateCategory = () => {

    const [category, setCategory] = useState({});

    useEffect(() => {
        getCategory();
    }, []);

    const { id } = useParams();

    const getCategory = () => {

        apiAxios
            .get("/categories/" + id)
            .then(({ data }) => {
                setCategory(data);
            })
            .catch((error) => console.log(error));

    }

    const handleChange = async e => {
        const { name, value } = e.target;

        setCategory(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const handleSubmit = () => {
        apiAxios
            .patch("/categories/" + id, category)
            .then(({ data }) => {
                alert(data);
            })
            .catch((error) => console.log(error));
    }

    const useStyles = makeStyles({
        root: {
            width: '50%',
            padding: '20px',
        },
        container: {
            padding: 30,
        },
        button: {
            marginTop: '1rem',
        },
        input: {
            width: '100%',
        },
        form: {
            width: '100%',
            marginTop: '1rem',
        }
    });

    const classes = useStyles();

    return (
        < Grid container className={classes.container} container
            direction="row"
            justify="center"
            alignItems="center" >
            {
                Object.entries(category).length !== 0 ? (

                    <Paper className={classes.root}>
                        <Box fontWeight="700" fontSize={32} m={1}>
                            Update Category
                        </Box>

                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField id="outlined-basic" label="Name" variant="outlined" name="name" className={classes.input} value={category.name} onChange={handleChange} />
                            <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
                                Update
                            </Button>
                        </form>

                    </Paper>

                )
                    :
                    <CircularProgress color="secondary" />
            }

        </Grid >
    )
}