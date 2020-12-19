import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import { apiAxios } from "../../../config/axios";

export const AddCustomer = () => {

    const [customer, setCustomer] = useState({});
    const history = useHistory();

    const handleChange = async e => {
        const { name, value } = e.target;

        setCustomer(prevState => ({
            ...prevState,
            [name]: value
        }))

    }

    const handleSubmit = () => {
        apiAxios
            .post("/customers", customer)
            .then(({ data }) => {
                console.log(data);
                history.push('/customers');
            })
            .catch((error) => console.log(error));
    }

    const useStyles = makeStyles({
        root: {
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
            <Paper className={classes.root}>
                <Box fontWeight="700" fontSize={32} m={1}>
                    Add Customer
                        </Box>
                <form noValidate autoComplete="off">
                    <Grid container spacing={3} >
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" className={classes.input} label="Name" variant="outlined" name="name" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" className={classes.input} label="Last Name" variant="outlined" name="lastName" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" className={classes.input} label="Phone" variant="outlined" name="phoneNumber" onChange={handleChange} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField id="outlined-basic" className={classes.input} label="E-mail" variant="outlined" name="email" type="email" onChange={handleChange} />
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

            {JSON.stringify(customer)}
        </Grid >
    )
}