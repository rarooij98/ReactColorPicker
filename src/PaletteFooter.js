import React, { Component } from 'react';

class PaletteFooter extends Component {
  // Footer of the palette page, displays the palette's name and emoji

// Function to render emojis based on their type
renderEmoji = (emoji) => {
    if (typeof emoji === 'object') {
      if (emoji.native) {
        return <span>{emoji.native}</span>;
      } else if (emoji.props && emoji.props['aria-label']) {
        // Check if the emoji is a flag by looking for the "em" class
        if (emoji.props.className && emoji.props.className.startsWith('em em-flag-')) {
          // Extract the country code from the class name
          const countryCode = emoji.props.className.replace('em em-flag-', '');
          return <span>Flag: {countryCode}</span>; // Modify as needed
        } else {
          return <i {...emoji.props}></i>;
        }
      } else {
        return <span>{JSON.stringify(emoji)}</span>;
      }
    } else {
      return <span>{emoji}</span>;
    }
  };

  render() {
    const { paletteName, emoji } = this.props;

    return (
      <footer className='Palette-footer'>
        {paletteName}
        {this.renderEmoji(emoji)}
      </footer>
    );
  }
}

export default PaletteFooter;