import React, { Component } from "react";
import "./Palette.css";

class Palette extends Component {
  state = {};
  render() {
    const { paletteName, id, emoji, colors } = this.props;

    return (
      <div className="Palette">
        <h1>{`${paletteName} ${emoji}`}</h1>
        <div className="Palette-colors">
          {colors.map((c) => {
            return (
              <div
                className="Palette-colorbox"
                style={{ backgroundColor: c.color }}
              >
                <span>{c.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Palette;
