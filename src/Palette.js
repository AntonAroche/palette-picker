import React, { Component } from "react";
import "rc-slider/assets/index.css";
import "./Palette.css";
import ColorBox from "./ColorBox";
import Slider from "rc-slider";

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
        <h1>{`${paletteName} ${emoji}`}</h1>
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={this.changeLevel}
          />
        </div>
        <div className="Palette-colors">{renderBoxes}</div>
      </div>
    );
  }
}

export default Palette;
