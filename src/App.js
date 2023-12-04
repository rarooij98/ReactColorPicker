import React, { useEffect, useState } from "react";
import PaletteList from './PaletteList';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Routes, Route, useParams } from 'react-router-dom';

function App() {
  // Get palettes from seedColors or local storage
  const getSavedPalettes = () => {
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes")) || seedColors;
    return Array.isArray(savedPalettes) ? savedPalettes : [savedPalettes];
  };
  const [palettes, setPalettes] = useState(getSavedPalettes());

  // When the component mounts, check if there are palettes in local storage
  useEffect(() => {
    setPalettes(getSavedPalettes);
  }, []);
  
  // Displays the selected color palette
  const FindPalette = () => {
    let { id } = useParams();
    const currentPalette = palettes.find((palette) => palette.id === id);
    return <Palette palette={generatePalette(currentPalette)} />
  }
  
  // Displays a single color from the selected palette
  const GetSingleColorPalette = () => {
    let { paletteId, colorId } = useParams();
    const currentPalette = palettes.find((palette) => palette.id === paletteId);
    return <SingleColorPalette colorId={colorId} palette={generatePalette(currentPalette)} />
  }
  
  // Adds new palette to the list of palettes and saves it in local storage
  const submitPalette = (newPalette) => {
    setPalettes((prevPalettes) => {
      const updatedPalettes = [...prevPalettes, newPalette];
      window.localStorage.setItem("palettes", JSON.stringify(updatedPalettes));
      return updatedPalettes;
    });
  };
  
  // Deletes the selected color palette
  const deletePalette = (id) => {
    setPalettes(palettes.filter((palette) => palette.id !== id));
  };
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<PaletteList palettes={palettes} deletePalette={deletePalette} />} />
        <Route path='/palette/:id' element={<FindPalette/>} />
        <Route path='/palette/:paletteId/:colorId' element={<GetSingleColorPalette/>} />
        <Route path="/palette/new" element={<NewPaletteForm palettes={palettes} submitPalette={submitPalette} />} />
      </Routes>
    </div>
  );
}

export default App;