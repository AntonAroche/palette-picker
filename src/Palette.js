import React, { Component } from "react";
import "rc-slider/assets/index.css";
import "./Palette.css";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar"

class Palette extends Component {
  state = {
    level: 500,
  };
  changeLevel = (level) => {
    this.setState({ level });
  };
  render() {
    const { paletteName, emoji, colors } = this.props.palette;
    const { level } = this.state;
    const renderBoxes = colors[level].map((c) => {
      return <ColorBox {...c} />;
    });
    return (
      <div className="Palette">
        <Navbar level={level} changeLevel={this.changeLevel} />
        <h1>{`${paletteName} ${emoji}`}</h1>
        <div className="Palette-colors">{renderBoxes}</div>
      </div>
    );
  }
}

export default Palette;
