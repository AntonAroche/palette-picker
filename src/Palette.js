import React, { Component } from "react";
import "./Palette.css";
import ColorBox from "./ColorBox"

class Palette extends Component {
  state = {};
  render() {
    const { paletteName, emoji, colors } = this.props;

    return (
      <div className="Palette">
        <h1>{`${paletteName} ${emoji}`}</h1>
        <div className="Palette-colors">
          {colors.map((c) => {
            return (
              <ColorBox {...c} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Palette;
