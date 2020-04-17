import React from "react";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    backgroundColor: (props) => props.color,
  },
};

function DraggableColorBox(props) {
  return <div className={props.classes.root}>{props.name}</div>;
}

export default withStyles(styles)(DraggableColorBox);
