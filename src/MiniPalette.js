import React from 'react';
import { withStyles } from '@mui/styles';
import styles from './styles/MiniPaletteStyles'
  
function MiniPalette(props) {
// Displays a mini version of each palette on the homepage

  const { classes, palette, handleClick } = props;
  
  // Extract the emoji representation from the palette object
  let emojiElement;
  if (typeof palette.emoji === 'object') {
    if (palette.emoji.native) {
      emojiElement = <span>{palette.emoji.native}</span>;
    } else if (palette.emoji.props && palette.emoji.props['aria-label']) {
      const flagClass = palette.emoji.props.class;
      emojiElement = <i className={flagClass}></i>;
    } else {
      emojiElement = <span>{JSON.stringify(palette.emoji)}</span>;
    }
  } else {
    emojiElement = <span>{palette.emoji}</span>;
  }
  
  return (
    <div className={classes.root} onClick={handleClick}>
      
      <div className={classes.colors}>
        {palette.colors.map((color, name) => (
          <div
            className={classes.mini}
            style={{ backgroundColor: color.color }}
            key={name}
          ></div>
        ))}
      </div>

      <h5 className={classes.title}>
        {palette.paletteName}
        <span className={classes.emoji}>{emojiElement}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);