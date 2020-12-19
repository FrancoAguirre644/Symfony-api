import React from "react";
import ToolbarComponent from "./toolbar/Toolbar";
import DrawerComponent from "./drawer/Drawer";

class Navbar extends React.Component {
    state = {
        left: false
    };

    toggleDrawer = () => {
        this.setState({ left: false });
    };

    openDrawer = () => {
        this.setState({
            left: true
        });
    };

    render() {
        return (
            <div className="App">
                <ToolbarComponent openDrawerHandler={this.openDrawer} />
                <DrawerComponent
                    left={this.state.left}
                    toggleDrawerHandler={this.toggleDrawer}
                />
            </div>
        );
    }
}
export default Navbar;
