import { makeStyles } from '@material-ui/core';
import theme from '../../utils/theme';
import Image from '../images/techo8.jpg';

export const useStyles = makeStyles({
  root: {
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    margin: 0,
    maxWidth: '100vw',
    padding: '5rem 0',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      backgroundImage: 'none',
      backgroundColor: theme.palette.info.dark,
    },
  },
  container: {
    height: 'fit-content',
    padding: '0 1.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    border: `0.13rem solid ${theme.palette.secondary.main}`,
    borderRadius: '1rem',
    justifyContent: 'center',
    maxWidth: '70vw',
    transition: ' all 0.7s ease-out ',
    color: theme.palette.primary.dark,
    [theme.breakpoints.only('xs')]: {
      maxWidth: '90vw',
    },
    [theme.breakpoints.only('sm')]: {
      maxWidth: '80vw',
    },
  },
  title: {
    marginTop: '-1.8rem',
    minHeight: '5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '0.9rem',
    width: '100%',
    border: `0.13rem solid ${theme.palette.secondary.main}`,
    textAlign: 'center',
    boxShadow: '0px 12px 32px -12px rgba(0,0,0,0.75)',
    WebkitBoxShadow: '0px 12px 32px -12px rgba(0,0,0,0.75)',
    MozBoxShadow: '0px 12px 32px -12px rgba(0,0,0,0.75)',
    [theme.breakpoints.only('xs')]: {
      fontSize: '1.8rem',
    },
  },
  description: {
    textAlign: 'justify',
    padding: '1rem',
    width: '100%',
    borderTop: `0.13rem solid ${theme.palette.secondary.main}`,
    borderBottom: `0.13rem solid ${theme.palette.secondary.main}`,
    '& p': {
      fontSize: '1.2rem',
    },
    [theme.breakpoints.down('xs')]: {
      '& p': {
        fontSize: '1rem',
      },
    },
  },
  generalInfo: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1rem',
  },
  label: {
    fontWeight: 'bold',
    marginRight: '0.3rem',
  },
  listContainer: {
    width: 'fit-content',
    padding: '0 0.5rem',
  },
  dateAndButton: {
    marginTop: '-1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  endDate: {
    fontSize: '0.9rem',
    alignSelf: 'flex-end',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    '& svg': {
      color: theme.palette.primary.main,
    },
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 'fit-content',
    paddingTop: '0.8rem',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  infoDetail: {
    display: 'flex',
    alignSelf: 'center',
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'unset',
      paddingTop: '0.5rem',
    },
  },
});
