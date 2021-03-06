import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";
import Page from "./Page";
import seedPalettes from "./seedPalettes";
import { generatePalette } from "./colorHelpers";
import { createGenerateClassName } from "@material-ui/core";
import { StylesProvider } from "@material-ui/styles";

const generateClassname = createGenerateClassName({
  productionPrefix: "c",
  seed: "App"
});

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedPalettes };
  }

  findPalette = (id) => {
    return this.state.palettes.find(function (palette) {
      return palette.id === id;
    });
  };

  savePalette = (newPalette) => {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] },
      this.syncLocalStorage
    );
  };

  handleDelete = (id) => {
    this.setState(
      { palettes: this.state.palettes.filter((p) => p.id !== id) },
      this.syncLocalStorage
    );
  };

  restorePalettes = () => {
    this.setState({ palettes: seedPalettes }, this.syncLocalStorage);
  };

  syncLocalStorage() {
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    );
  }

  render() {
    const { palettes } = this.state;
    return (
      <StylesProvider generateClassName={generateClassname}>
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="page" timeout={500}>
                <Switch location={location}>
                  <Route
                    exact
                    path="/"
                    render={(routeProps) => (
                      <Page>
                        <PaletteList
                          palettes={palettes}
                          handleDelete={this.handleDelete}
                          restorePalettes={this.restorePalettes}
                          {...routeProps}
                        />
                      </Page>
                    )}
                  />
                  <Route
                    exact
                    path="/palette/new"
                    render={(routeProps) => (
                      <Page>
                        <NewPaletteForm
                          palettes={palettes}
                          savePalette={this.savePalette}
                          {...routeProps}
                        />
                      </Page>
                    )}
                  />
                  <Route
                    exact
                    path="/palette/:id"
                    render={(routeProps) => (
                      <Page>
                        <Palette
                          palette={generatePalette(
                            this.findPalette(routeProps.match.params.id)
                          )}
                        />
                      </Page>
                    )}
                  />
                  <Route
                    exact
                    path="/palette/:paletteId/:colorId"
                    render={(routeProps) => (
                      <Page>
                        <SingleColorPalette
                          colorId={routeProps.match.params.colorId}
                          palette={generatePalette(
                            this.findPalette(routeProps.match.params.paletteId)
                          )}
                          {...routeProps}
                        />
                      </Page>
                    )}
                  />
                  <Route
                    render={(routeProps) => (
                      <Page>
                        <PaletteList
                          palettes={palettes}
                          handleDelete={this.handleDelete}
                          {...routeProps}
                        />
                      </Page>
                    )}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </StylesProvider>
    );
  }
}

export default App;
