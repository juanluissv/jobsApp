import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.primary.contrastText,
    marginLeft: '2rem',
    marginRight: '2rem',
    borderRadius: '50px',
    paddingBottom: '16px',
    maxHeight: '70px',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 'none',
      alignItems: 'center',
      flexDirection: 'column',
      width: '80%',
      borderRadius: '1rem',
      backgroundColor: 'transparent',
    },
  },
  searchBar: {
    marginTop: '16px',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.primary.contrastText,
      borderRadius: '30px',
      padding: '1rem',
    },
  },
  filterAndCountry: {
    display: 'flex',
    justifyContent: 'center',
    width: 'fit-content',
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      backgroundColor: theme.palette.primary.contrastText,
      marginTop: '1rem',
      borderRadius: '30px',
      padding: '0 1rem 1rem 1rem',
      paddingBottom: '0.7rem',
      width: 'fit-content',
    },
  },
  searchField: {
    textAlign: 'center',
    borderRadius: 15,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  selectCountry: {
    width: '16vw',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    minWidth: '140px',
    maxWidth: '200px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  selectMenu: {
    height: 0,
  },
});
