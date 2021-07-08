import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../utils/theme';

export const useStyles = makeStyles({
  root: {
    margin: '6rem',
    maxWidth: '50rem',
    border: '1px solid',
    borderRadius: '1rem',
    padding: '1rem',
  },
  title: {
    marginBottom: '3rem',
    fontSize: '1.375rem',
    fontWeight: 'bold',
    fontColor: '#2d4a69',
  },
  formContainer: {
    display: 'flex',
  },
  header: {
    display: 'flex',
  },
  titleJob: {
    height: '3.3rem',
    width: '90%',
    margin: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  tagsJob: {
    height: '3.4rem',
    width: '13rem',
    margin: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  leftContainer: {
    display: 'flex',
    padding: '1rem',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
  rightContainer: {
    display: 'flex',
    padding: '1rem',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0,
    },
  },
  textArea: {
    width: '95%',
    margin: '1rem',
    bordeRadius: '1.25rem 1.25rem 0p 0p',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '0.5rem 10rem',
  },
  input: {
    width: '10rem',
    margin: '1rem',
  },
  responsiveInputs: {
    display: 'flex',
    justifyContent: 'center',
  },
});
