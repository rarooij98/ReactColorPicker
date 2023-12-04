import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
// MUI
import { Snackbar } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';

class Navbar extends Component {
// Navbar on the palette page, that contains: 
// - Link back to the homepage,
// - Slider to change the color brightness,
// - Selector to change the format of the copied color

    constructor(props) {
        super(props);
        this.state = {
            format: 'hex',
            open: false
        };
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
      
    handleFormatChange(e){
        this.setState({format: e.target.value});
        this.props.handleFormatChange(e.target.value);
        this.setState({open: true});
    };
    
    closeSnackbar = (e, reason) => {
        this.setState({open: false});
    };

    render() {
    const message = <span id='message-id'>Format changed to {this.state.format.toUpperCase()}</span>
    const showSlider = (this.props.isSingleColor === false);
        return (
            <nav className='Navbar'>
                <div className='logo'>
                    <Link to="/">colorpicker</Link>
                </div>
                
                {showSlider && (
                    <div className='slider-container'>
                        <p>Level: {this.props.level}</p>
                        <div className='slider'>
                            <Slider defaultValue={this.props.level} min={100} max={900} step={100} onChange={this.props.changeLevel} />
                        </div>
                    </div>
                )}
                
                <div className='select-container'>
                    <Select value={this.state.format} onChange={this.handleFormatChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgb(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                
                <Snackbar
                  anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                  open={this.state.open}
                  onClose={this.closeSnackbar}
                  autoHideDuration={3000}
                  ContentProps={{"aria-describedby": "message-id"}}
                  message={message}
                  action={
                    <IconButton
                      size="small"
                      key="close" 
                      aria-label="close"
                      color="inherit"
                      onClick={this.closeSnackbar}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  }
                />
                
            </nav>
        );
    }
}

export default Navbar;