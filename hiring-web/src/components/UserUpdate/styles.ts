import { makeStyles } from '@material-ui/core/styles';
import Image from '../images/techo19b.jpg';

export const useStyles = makeStyles({
  rootRoot: {
    width: 'fit-content',
  },
  root: {
    display: 'flex',
    width: '100%',
    margin: 0,
    justifyContent: 'center',
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'scroll',
    backgroundPositionX: 'center',
    minHeight: '880px',
  },
  containerRoot: {
    width: 'fit-content',
  },
  container: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    height: 'fit-content',
    position: 'relative',
    borderRadius: '0.7rem',
    top: '0.7rem',
  },
});
