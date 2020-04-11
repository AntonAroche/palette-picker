import React, { Component } from "react";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
    const { name, hex } = this.props;
    const { copied } = this.state;
    return (
      <CopyToClipboard text={hex} onCopy={this.changeCopyState}>
        <div className="ColorBox" style={{ background: hex }}>
          <div
            className={`copy-overlay ${copied && "show"}`}
            style={{ background: hex }}
          />
          <div className={`copy-msg ${copied && "show"}`}>
            <h1>Copied!</h1>
            <p>{hex}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span>{name}</span>
            </div>
            <button className="copy-button">Copy</button>
          </div>
          <span className="see-more">More</span>
        </div>
      </CopyToClipboard>
    );
  }
}

export default ColorBox;
