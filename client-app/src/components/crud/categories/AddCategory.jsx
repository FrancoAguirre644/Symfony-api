import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { apiAxios } from "../../../config/axios";

export const AddCategory = () => {

    const [category, setCategory] = useState({});
    const history = useHistory();

    const handleChange = async e => {
        const { name, value } = e.target;

        setCategory(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const handleSubmit = () => {
        apiAxios
            .post("/categories", category)
            .then(({ data }) => {
                console.log(data);
                history.push('/categories');
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

            <Paper className={classes.root}>
                <Box fontWeight="700" fontSize={32} m={1}>
                    Add Category
                </Box>

                <form className={classes.form} noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Name" variant="outlined" name="name" className={classes.input} value={category.name} onChange={handleChange} />
                    <Button variant="contained" color="primary" color="primary"
                        className={classes.button}
                        startIcon={<AddIcon />} className={classes.button} onClick={handleSubmit}>
                        Add Category
                    </Button>
                </form>

            </Paper>

        </Grid >
    )
}