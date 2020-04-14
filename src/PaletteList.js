import React, { Component } from "react";
import { Link } from "react-router-dom";

class PaletteList extends Component {
  state = {};
  render() {
    const { palettes } = this.props;
    return (
      <div className="PaletteList">
        <h1>Palette List!</h1>
        {palettes.map((palette) => (
          <Link to={`/palette/${palette.id}`}>
            <p>{palette.paletteName}</p>
          </Link>
        ))}
      </div>
    );
  }
}

export default PaletteList;
