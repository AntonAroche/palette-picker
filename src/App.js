import React from 'react';
import './App.css';
import Palette from './Palette';
import seedPalettes from "./seedPalettes"
import { generatePalette } from './colorHelpers';

function App() {
  console.log(generatePalette(seedPalettes[4]))
  return (
    <div className="App">
      <Palette palette={generatePalette(seedPalettes[4])}/>
    </div>
  );
}

export default App;
