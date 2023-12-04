import chroma from 'chroma-js';

// Define the levels of color darkness/brightness
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

// This function generates varieties for each color in a palette
function generatePalette(starterPalette){
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {}
  };
  
  // Loop over every level, generate a new array in the colors object
    for(let level of levels){
        newPalette.colors[level] = [];
    }
    // For every color, get a new scale of colors, from dark to light
    for (let color of starterPalette.colors){
        let scale = getScale(color.color, 10).reverse();
        // For each scale add a new level in the colors object
        // Push the new colors in!
        for(let i in scale){
            newPalette.colors[levels[i]].push({
                name: `${color.name} ${levels[i]}`,
                id: color.name.toLowerCase().replace(/ /g, "-"),
                hex: scale[i], 
                rgb: chroma(scale[i]).css(),
                rgba: chroma(scale[i]).css('rgba')
            })
        }
    }
    return newPalette;
}

// The range of colors will be between:
// hex color (darkened) - hex color (regular) - white
function getRange(hexColor){
    const end = '#fff';
    return [
        chroma(hexColor).darken(1.4).hex(),
        hexColor,
        end
    ];
}

// This function gives us a number of colors in the color range we set
function getScale(hexColor, numberColors){
    return chroma.scale(getRange(hexColor)).mode("lab").colors(numberColors);
}

export {generatePalette}