import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import StorefrontIcon from '@material-ui/icons/Storefront';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1),
    },
    button: {
        color: '#FFFFFF',
    },
    title: {
        flexGrow: 1,
    },
    background: {
        backgroundColor: '#000000',
    },
    link: {
        textDecoration: 'none',
        color: '#FFFFFF',
    }
}));

export const Navbar = () => {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.background}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Link to={"/"} className={classes.link} >
                            <StorefrontIcon />
                        </Link>
                    </IconButton>
                    <Typography variant="h6" className={classes.menuButton}>
                        <Link to={"/products"} className={classes.link} >
                            <Button color="secondary" className={classes.button}>
                                Products
                            </Button>
                        </Link>
                    </Typography>
                    <Typography variant="h6" className={classes.menuButton}>
                        <Link to={"/categories"} className={classes.link} >
                            <Button color="secondary" className={classes.button}>
                                Categories
                            </Button>
                        </Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link to={"/customers"} className={classes.link} >
                            <Button color="secondary" className={classes.button}>
                                Customers
                            </Button>
                        </Link>
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );

}