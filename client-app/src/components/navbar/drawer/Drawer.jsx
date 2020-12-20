import React from "react";
import Drawer from "@material-ui/core/Drawer";
import withStyles from "@material-ui/core/styles/withStyles";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { Link } from 'react-router-dom';


const styles = theme => ({
    list: {
        width: 250
    },
    fullList: {
        width: "auto"
    },
    link: {
        textDecoration: 'none',
        color: '#000000',
    }
});

class DrawerComponent extends React.Component {
    state = {
        left: false
    };

    render() {
        const { classes } = this.props;

        const sideList = side => (
            <div
                className={classes.list}
                role="presentation"
                onClick={this.props.toggleDrawerHandler}
                onKeyDown={this.props.toggleDrawerHandler}
            >
                <List>
                    <Link to={"/products"} className={classes.link} >
                        <ListItem button>
                            <ListItemIcon className={classes.link}>
                                <StorefrontIcon />
                            </ListItemIcon>

                            <ListItemText primary="Products" />
                        </ListItem>
                    </Link>

                    <Link to={"/categories"} className={classes.link} >
                        <ListItem button >
                            <ListItemIcon className={classes.link}>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                        </ListItem>
                    </Link>

                    <Link to={"/customers"} className={classes.link} >
                        <ListItem button>

                            <ListItemIcon className={classes.link}>
                                <PersonIcon />
                            </ListItemIcon>

                            <ListItemText primary="Customers" />
                        </ListItem>
                    </Link>

                    <Link to={"/carts"} className={classes.link} >
                        <ListItem button>

                            <ListItemIcon className={classes.link}>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Carts" />
                        </ListItem>
                    </Link>

                </List>
                <Divider />
                <List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </div >
        );

        return (
            <Drawer open={this.props.left} onClose={this.props.toggleDrawerHandler}>
                {sideList("left")}
            </Drawer>
        );
    }
}

export default withStyles(styles)(DrawerComponent);
