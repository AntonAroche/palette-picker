import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ColorBoxStyles";

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
    const { name, color, moreUrl, showingFullPalette, classes } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={color} onCopy={this.changeCopyState}>
        <div className={classes.colorBox} style={{ background: color }}>
          <div
            className={classNames(classes.copyOverlay, {
              [classes.showOverlay]: copied,
            })}
            style={{ background: color }}
          />
          <div
            className={classNames(classes.copyMessage, {
              [classes.showMessage]: copied,
            })}
          >
            <h1>Copied!</h1>
            <p className={classes.copyText}>{color}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPalette && (
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
