import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";
import UpdateIcon from '@material-ui/icons/Update';
import { apiAxios } from "../../../config/axios";


export const UpdateCustomer = () => {

    const [customer, setCustomer] = useState({});
    const history = useHistory();

    useEffect(() => {
        getCustomer();
    }, []);

    const { id } = useParams();

    const getCustomer = () => {
        apiAxios
            .get("/customers/" + id)
            .then(({ data }) => {
                setCustomer(data);
            })
            .catch((error) => console.log(error));
    }

    const handleChange = async e => {
        const { name, value } = e.target;

        setCustomer(prevState => ({
            ...prevState,
            [name]: value
        }))

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
            {
                Object.entries(customer).length !== 0 ? (
                    <Paper className={classes.root}>
                        <Box fontWeight="700" fontSize={32} m={1}>
                            Update Customer
                        </Box>
                        <form noValidate autoComplete="off">
                            <Grid container spacing={3} >
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" className={classes.input} label="Name" variant="outlined" name="name" value={customer.name} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" className={classes.input} label="Last Name" variant="outlined" name="lastName" value={customer.lastName} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" className={classes.input} label="Phone" variant="outlined" name="phoneNumber" value={customer.phoneNumber} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic" className={classes.input} label="E-mail" variant="outlined" name="email" type="email" value={customer.email} onChange={handleChange} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Button variant="contained" color="primary" color="primary"
                                        className={classes.button}
                                        startIcon={<UpdateIcon />} className={classes.button}>
                                        Update
                            </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Paper>
                )
                    :
                    <CircularProgress color="secondary" />
            }
        </Grid >
    )
}