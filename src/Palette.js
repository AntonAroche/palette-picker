import React, { Component } from "react";
import "rc-slider/assets/index.css";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles"

class Palette extends Component {
  state = {
    level: 500,
    format: "hex",
  };
  changeLevel = (level) => {
    this.setState({ level });
  };

  changeFormat = (format) => {
    this.setState({ format: format });
  };

  render() {
    const { classes } = this.props;
    const { paletteName, emoji, colors, id } = this.props.palette;
    const { level, format } = this.state;
    const renderBoxes = colors[level].map((c) => {
      return (
        <ColorBox
          name={c.name}
          color={c[format]}
          key={c.id}
          moreUrl={`/palette/${id}/${c.id}`}
          showingFullPalette
        />
      );
    });
    return (
      <div className={classes.Palette}>
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showSlider
        />
        <div className={classes.colors}>{renderBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
