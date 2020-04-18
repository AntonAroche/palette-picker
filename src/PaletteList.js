import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import RestoreIcon from "@material-ui/icons/Restore";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import MiniPalette from "./MiniPalette";
import styles from "./styles/PaletteListStyles";

class PaletteList extends Component {
  constructor(props) {
    super(props);
    const noPalettes = this.props.palettes.length === 0;
    this.state = {
      dialogOpen: noPalettes ? "noPalettes" : "",
      paletteToDeleteId: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.palettes.length > 0 && this.props.palettes.length === 0) {
      this.setState({ dialogOpen: "noPalettes" });
    }
  }
  goToPalette = (id) => {
    this.props.history.push(`/palette/${id}`);
  };

  handleDelete = () => {
    this.props.handleDelete(this.state.paletteToDeleteId);
    this.setState({ dialogOpen: "" });
  };

  createPalette = () => {
    this.setState({ dialogOpen: "" });
    this.props.history.push("/palette/new");
  };

  restorePalettes = () => {
    this.setState({ dialogOpen: "" });
    this.props.restorePalettes();
  };
  openDeleteDialog = (id) => {
    this.setState({ paletteToDeleteId: id, dialogOpen: "delete" });
  };

  closeDialog = () => {
    this.setState({ dialogOpen: "" });
  };

  render() {
    const { palettes, classes } = this.props;
    const { dialogOpen } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>Palette Picker</h1>
            <Link to="/palette/new">New Palette</Link>
          </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette) => (
              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <MiniPalette
                  {...palette}
                  goToPalette={this.goToPalette}
                  handleDelete={this.openDeleteDialog}
                  key={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={dialogOpen === "delete"}
          aria-labelledby="delete-dialog-title"
          onClose={this.closeDialog}
        >
          <DialogTitle id="delete-dialog-title">
            Delete This Palette?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Delete</ListItemText>
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Cancel</ListItemText>
            </ListItem>
          </List>
        </Dialog>
        <Dialog
          open={dialogOpen === "noPalettes"}
          aria-labelledby="no-palette-dialog-title"
          onClose={this.closeDialog}
        >
          <DialogTitle id="no-palette-dialog-title">
            You have no palettes!
          </DialogTitle>
          <List>
            <ListItem button onClick={this.createPalette}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: green[100], color: green[600] }}
                >
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Create New Palette</ListItemText>
            </ListItem>
            <ListItem button onClick={this.restorePalettes}>
              <ListItemAvatar>
                <Avatar
                  style={{ backgroundColor: blue[100], color: blue[600] }}
                >
                  <RestoreIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Restore Default Palettes</ListItemText>
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
