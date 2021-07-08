import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme';

export const useStyles = makeStyles({
  root: {
    borderRadius: 20,
  },
  title: {
    color: theme.palette.primary.main,
    fontSize: '2rem',
  },
  sweetButton: {
    color: theme.palette.primary.main,
    margin: '0.7rem',
    height: '4rem',
    width: 'fit-content',
    border: 0,
    textAlign: 'center',
    outline: 'none',
    backgroundColor: theme.palette.primary.contrastText,
    transition: 'transform 1s',
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.2)',
    },
  },
  sweetIcon: {
    '&::before': {
      fontSize: '4rem',
    },
  },
  loginButton: {
    backgroundColor: 'transparent',
    color: '#c8e0e3',
    marginRight: '0.625rem',
    width: '6.25rem',
    height: 'inherit',
    textAlign: 'center',
    fontWeight: 'bold',
    borderRadius: 0,
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#c8e0e3',
      color: theme.palette.primary.main,
    },
  },
  largeButton: {
    backgroundColor: theme.palette.primary.main,
    fontWeight: 'bold',
    alignSelf: 'center',
    borderRadius: '1rem',
    width: '100%',
    margin: '1rem 0.5rem',
    color: theme.palette.primary.contrastText,
  },
  postSmallButton: {
    textTransform: 'none',
    fontSize: '1rem',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '0.5em',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  actSmallButton: {
    textTransform: 'none',
    fontSize: '1rem',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    borderRadius: '0.5em',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
});
