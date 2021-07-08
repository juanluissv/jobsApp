import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme';
import Image from '../images/SearchBarImage.png';

export const useStyles = makeStyles({
  root: {
    padding: 0,
    height: '220px',
    width: '100vw',
    display: 'flex',
    margin: 0,
    maxWidth: 'none',
    '& .MuiContainer-maxWidthLg': {
      maxWidth: 'none',
    },
    marginBottom: '2.5rem',
  },
  image: {
    padding: 0,
    width: '100%',
    backgroundImage: `url(${Image})`,
    height: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    display: 'flex',
  },
  filter: {
    width: '100%',
    padding: 0,
    height: '100%',
    background: 'linear-gradient(45deg, #1897ba 40%,#9476C2  100%)',
    opacity: '0.6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
