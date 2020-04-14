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
      return <ColorBox name={c.name} color={c[format]} key={c.id}/>;
    });
    return (
      <div className="Palette">
        <Navbar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        <div className="Palette-colors">{renderBoxes}</div>
        <footer className="Palette-footer">
            {paletteName}
            <span className="emoji">{emoji}</span>
        </footer>
      </div>
    );
  }
}

export default Palette;
