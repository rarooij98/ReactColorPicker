import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import './styles/Palette.css';

class Palette extends Component {
// A single palette page that displays all coloe boxes for the current palette

    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: 'hex'
        };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }
    
    // Changes the level of color brightness
    changeLevel(newLevel) {
        this.setState({level: newLevel});
    }
    
    // Changes the color format between rgb, rgba, hex
    changeFormat(val){
        this.setState({format: val});
    }

    render() {
        return (
            <div className='Palette'>
                <Navbar level={this.state.level} changeLevel={this.changeLevel} handleFormatChange={this.changeFormat} isSingleColor={false} />
                <div className='Palette-colors'>
                    {this.props.palette.colors[this.state.level].map(color => {
                        return <ColorBox color={color[this.state.format]} name={color.name} paletteId={this.props.palette.id} colorId={color.id} key={color.id} showLink={true}/>
                    })}
                </div>
                
                <PaletteFooter paletteName={this.props.palette.paletteName} emoji={this.props.palette.emoji}/>
                
            </div>
        );
    }
}

export default Palette;