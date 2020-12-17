import React, { useEffect, useState } from 'react';
import { apiAxios } from "../config/axios";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { makeStyles } from '@material-ui/core/styles';
import { CarrouselProducts } from '../components/CarrouselProducts';

export const Home = () => {

    const [products, setProducts] = useState([]);

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            borderColor: '#ffeb3b',
            borderWidth: '1px',
        },
        image: {
            width: '100%',
            height: 128,
        },
        img: {
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {

        apiAxios
            .get("/products")
            .then(({ data }) => {
                setProducts(data);
            })
            .catch((error) => console.log(error));

    };

    return (

        <div className={classes.root}>
            <CarrouselProducts />
            <Grid container spacing={0}>
                {products.map((p) =>
                    <Grid item xs style={{ padding: 10 }}>
                        <Paper className={classes.paper}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="complex" src="https://i.ytimg.com/vi/aWttx80Uflk/hqdefault.jpg" />
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1">
                                                {p.title}
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                {p.description} • {p.category.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                ${p.price}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </div>

    )

}