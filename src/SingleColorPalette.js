import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import styles from "./styles/PaletteStyles";

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
  }
  state = { format: "hex" };

  gatherShades(palette, filterColorId) {
    let shades = [];
    const allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === filterColorId)
      );
    }
    return shades.slice(1);
  }

  changeFormat = (format) => {
    this.setState({ format: format });
  };

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        key={color.name}
        color={color[format]}
        name={color.name}
        showingFullPalette={false}
      />
    ));

    return (
      <div className={classes.Palette}>
        <Navbar showSlider={false} handleChange={this.changeFormat} />
        <div className={classes.colors}>
          {colorBoxes}
          <div className={classes.goBack} onClick={this.goBack}>
            <Link to={`/palette/${id}`}>GO BACK</Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
