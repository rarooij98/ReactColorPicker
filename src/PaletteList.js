import React from 'react';
import MiniPalette from './MiniPalette';
import { withStyles } from '@mui/styles';
import {Link, useNavigate} from 'react-router-dom';
import styles from './styles/PaletteListStyles';

const PaletteList = ({ classes, palettes, deletePalette  }) => {
// Maps over all the palettes to display them on the homepage
  
    // Navigate to each palette using its id
    const navigate = useNavigate();
    const goToPalette = (id) => {
      navigate(`/palette/${id}`);
    };
  
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Palettes</h1>
            <Link to='/palette/new'>Create New Palette</Link>
          </nav>
  
          <div className={classes.palettes}>
          {Array.isArray(palettes) &&
            palettes.map((palette) => (
              <MiniPalette
                palette={palette}
                handleClick={() => goToPalette(palette.id)}
                key={palette.id}
                id={palette.id}
                // handleDelete={deletePalette}
                // classes={classes}
              />
            ))}
        </div>
        </div>
      </div>
    );
  };
  
  export default withStyles(styles)(PaletteList);