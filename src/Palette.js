import React, { Component } from "react";
import "rc-slider/assets/index.css";
import "./Palette.css";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";

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
    const { paletteName, emoji, colors } = this.props.palette;
    const { level, format } = this.state;
    const renderBoxes = colors[level].map((c) => {
      return <ColorBox name={c.name} color={c[format]} />;
    });
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        <h1>{`${paletteName} ${emoji}`}</h1>
        <div className="Palette-colors">{renderBoxes}</div>
      </div>
    );
  }
}

export default Palette;
