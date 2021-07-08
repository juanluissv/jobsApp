import { makeStyles } from '@material-ui/core';
import { Height } from '@material-ui/icons';
import theme from '../../utils/theme';

export const useStyles = makeStyles({
  root: {
    boxShadow: '0 1px 0 rgb(0 0 0 / 10%)',
    '& header': {
      boxShadow: '0 1px 0 rgb(0 0 0 / 10%)',
    },
  },
  navbar: {
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    height: '70px',
    boxShadow: '0 1px 0 rgb(0 0 0 / 10%)',
    justifyContent: 'space-between',
    padding: '0 25px 0 0',
  },
  techoContainer: {
    padding: '0 20px',
    width: 122.48,
  },
  image: {
    maxWidth: 'initial',
  },
  rightContainer: {
    padding: '0 20px',
    height: 'inherit',
  },
  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& p': {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
  },
  adminButton: {
    backgroundColor: 'transparent',
    color: '#c8e0e3',
    marginRight: '0.625rem',
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
});
