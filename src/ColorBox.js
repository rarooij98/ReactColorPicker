import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './styles/ColorBox.css';

class ColorBox extends Component {
// Displays a single colorbox in the palette

    // Manages the copy state
    constructor(props) {
        super(props);
        this.state = { copied: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState(){
        this.setState({copied: true}, () => {
            setTimeout(() => this.setState({copied: false}), 1500);
        });
    }
    
    // Renders a single color box with the color name, copy button and link to see more shades,
    // conditionally renders the copy overlay
    render() {
    const {name, color, showLink} = this.props;
    const {copied} = this.state;
    const textColor = chroma(color).luminance() >= 0.5 ? 'black' : 'white';
    const buttonColor = textColor === 'white' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(133, 133, 133, 0.1)';
        return (
        <CopyToClipboard text={color} onCopy={this.changeCopyState}>
            <div className='ColorBox' style={{ backgroundColor: color }}>
                
                {/* Copy overlay */}
                <div className={`copy-overlay ${copied && 'show'}`} style={{ backgroundColor: color }}></div>
                <div className={`copy-msg ${copied && 'show'}`}>
                    <h1>Copied!</h1>
                    <p style={{ color: textColor }}>{color}</p>
                </div>
                
                {/* Color name */}
                <div className='copy-container'>
                    <div className='box-content'>
                        <p style={{ color: textColor }}>{name}</p>
                    </div>
                    <button style={{ color: textColor , backgroundColor: buttonColor }} className='copy-button'>Copy</button>
                </div> 
                
                {/* Link to see more shades */}
                {showLink && (
                    // stop.stopPropagation will stop the copy event from happening when clicking on more
                    <Link to={`/palette/${this.props.paletteId}/${this.props.colorId}`} onClick={(e) => e.stopPropagation}>
                    <span style={{ color: textColor }} className='see-more'>More</span>
                    </Link>
                )}
                
            </div>
        </CopyToClipboard>
        );
    }
}

export default ColorBox;