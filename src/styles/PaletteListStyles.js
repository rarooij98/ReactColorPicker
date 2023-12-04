// background by SVGBackgrounds.com
import doodles from './doodles.svg';

const styles = {
    
    '@global' : {
    '*::-webkit-scrollbar': {
        display: 'none'
    }},
    
    root: {
      height: '100vh',
      background: '#384BAD',
      backgroundImage: `url(${doodles})`,
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflow: 'scroll',
    },
    
    container: {
        width: '60%',
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: 'white',
        alignItems: 'center',
        '& a': {color: 'white'}
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '5%'
    }
}
export default styles;