import React, { Component } from 'react';

class PaletteFooter extends Component {
// Footer of the palette page, displays the palettes name and emoji

    render() {
        return (
            <footer className='Palette-footer'>
                {this.props.paletteName}
                <span className='emoji'>{this.props.emoji}</span>
            </footer>
        );
    }
}

export default PaletteFooter;