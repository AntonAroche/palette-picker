import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colorNameInput: {
    width: "100%",
    height: "70px",
  },
};
class ColorPickerForm extends Component {
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", () =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }
  state = {
    currentColor: "teal",
    newColorName: "",
  };

  updateCurrentColor = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  };

  handleNameChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleSubmit = () => {
    const { newColorName, currentColor } = this.state;
    const newColor = {
      color: currentColor,
      name: newColorName,
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: "" });
  };

  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChange={(newColor) => this.updateCurrentColor(newColor)}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            value={newColorName}
            name="newColorName"
            className={classes.colorNameInput}
            placeHolder="Color Name"
            onChange={this.handleNameChange}
            variant="filled"
            margin="normal"
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter Color name",
              "Color name must be unique",
              "The color must be unique",
            ]}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={paletteIsFull}
            style={{
              backgroundColor: paletteIsFull ? "grey" : currentColor,
            }}
            type="submit"
            className={classes.addColor}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
