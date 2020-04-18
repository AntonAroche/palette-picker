import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import Button from "@material-ui/core/Button";
import PaletteFormDetails from "./PaletteFormDetails";
import styles from "./styles/PaletteFormNavStyles";

class PaletteFormNav extends Component {
  state = {
    formShowing: false,
  };

  showForm = () => {
    this.setState({ formShowing: true });
  };

  hideForm = () => {
    this.setState({ formShowing: false });
  };

  render() {
    const { classes, open, palettes, handleSubmit } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <AddToPhotosIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              onClick={this.showForm}
            >
              Save
            </Button>
            <Link to="/">
              <Button
                variant="contained"
                className={classes.button}
                color="secondary"
              >
                Go Back
              </Button>
            </Link>
          </div>
        </AppBar>
        {this.state.formShowing && (
          <PaletteFormDetails
            palettes={palettes}
            handleSubmit={handleSubmit}
            hideForm={this.hideForm}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
