import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';

class SingleColorPalette extends Component {
// Maps over all shades of a single color and displays them as colorboxes

    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {format: 'hex'}
        this.changeFormat = this.changeFormat.bind(this);
    }
    
    // Returns all shades of some color
    gatherShades(palette, colorFilter){
        let shades = [];
        let allColors = palette.colors;
        for(let key in allColors){
            shades = shades.concat(allColors[key]) // Gets all the colors of 100, 200, etc. in an array
            shades = shades.filter(color => color.id === colorFilter) // Then filters on the color we want shades from
        }
        return shades.slice(1); // Returns all shades except for colorlevel 50
    }
    
    // Changes the format for copying the color: rgb, rgba, hex
    changeFormat(val){
        this.setState({format: val});
    }

    render() {
        const colorBoxes = this._shades.map(shade => {
            return <ColorBox color={shade[this.state.format]} name={shade.name} paletteId={this.props.palette.id} colorId={shade.name} key={shade.name} showLink={false} />
        })
        return (
            <div className='SingleColorPalette'>
                <Navbar handleFormatChange={this.changeFormat} isSingleColor={true} />
                <div className='SingleColorPalette Palette'>
                    <div className='Palette-colors'>
                        {colorBoxes}
                        <div className='go-back ColorBox'>
                            <Link className='back-button' to={`/palette/${this.props.palette.id}`}>Go back</Link>
                        </div>
                    </div>
                </div>
                <PaletteFooter paletteName={this.props.palette.paletteName} emoji={this.props.palette.emoji}/>
            </div>
        );
    }
}

export default SingleColorPalette;