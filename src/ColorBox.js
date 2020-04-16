import React, { Component } from "react";
import chroma from "chroma-js"
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";

class ColorBox extends Component {
  state = {
    copied: false,
  };
  changeCopyState = () => {
    this.setState({ copied: true }, () => [
      setTimeout(() => this.setState({ copied: false }), 1600),
    ]);
  };
  render() {
    const { name, color, moreUrl, showLink } = this.props;
    const { copied } = this.state;
    const isDarkColor = chroma(color).luminance() <= 0.07
    const textClass = isDarkColor ? "light-text" : "dark-text"

    return (
      <CopyToClipboard text={color} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{ background: color }}>
          <div
            className={`copy-overlay ${copied && "show"}`}
            style={{ background: color }}
          />
          <div className={`copy-msg ${copied && "show"}`}>
            <h1>Copied!</h1>
            <p className={textClass}>{color}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor && "light-text"}>{name}</span>
            </div>
            <button className={`copy-button ${textClass}`}>Copy</button>
          </div>
          {showLink && (
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className={`see-more ${textClass}`}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
