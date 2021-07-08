import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme';
import ImageLeft from '../images/techo33.jpg';
import ImageRight from '../images/techo24.jpg';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    margin: 0,
    justifyContent: 'space-between',
    backgroundColor: theme.palette.info.main,
    height: '100vh',
    '& .MuiGrid-grid-xs-6': {
      padding: 0,
    },
  },
  container: {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    transition: '1s ease',
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
  },
  leftContainer: {
    backgroundImage: `url(${ImageLeft})`,
  },
  rightContainer: {
    backgroundImage: `url(${ImageRight})`,
    borderLeft: `0.1rem solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down('sm')]: {
      borderLeft: 0,
      borderTop: `0.1rem solid ${theme.palette.primary.main}`,
    },
  },
  filter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: '1rem',
    transition: '1s ease',
  },
  containerOff: {
    backgroundColor: 'rgba(35, 24, 55, 0.5)',
    transition: '1s ease',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '4.5rem',
    alignItems: 'center',
    '& .MuiGrid-grid-xs-6': {
      padding: 8,
    },
  },
  redirectContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'fit-content',
    padding: '0 1rem',
    marginBottom: '1.4rem',
    marginTop: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: `0.1rem solid ${theme.palette.primary.main}`,
  },
  redirectRoot: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: '1rem',
    margin: '0',
  },
  customTooltip: {
    fontSize: '0.8rem',
    backgroundColor: theme.palette.primary.light,
  },
  iconValidate: {
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
  iconNoValidate: {
    color: 'red',
  },
});
