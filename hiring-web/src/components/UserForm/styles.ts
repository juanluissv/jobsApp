import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme';

export const useStyles = makeStyles({
  root: {
    maxWidth: '32rem',
    color: theme.palette.primary.dark,
    height: 'fit-content',
    borderRadius: '0.7rem',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    border: `0.1rem solid ${theme.palette.primary.main}`,
    padding: '1rem',
  },
  container: {
    width: '100%',
    display: 'flex',
    margin: 0,
    '& .MuiGrid-container': {
      padding: 0,
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    margin: '0',
  },
  title: {
    margin: 0,
    fontSize: '1.8rem',
    color: theme.palette.primary.main,
  },
  arrow: {
    marginTop: '0.375rem',
  },
  inputContainer: {
    height: '6rem',
    '& .MuiOutlinedInput-input': {
      padding: '1rem',
    },
  },
  inputContainerFirst: {
    marginTop: '1rem',
  },
  inputAreaContainer: {
    height: '11.0625rem',
  },
  input: {
    width: '100%',
    color: theme.palette.primary.main,
    '& .MuiFormLabel-root.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '& .MuiFormHelperText-contained': {
      alignSelf: 'flex-end',
    },
    '& .MuiOutlinedInput-notchedOutline:hover': {
      borderColor: theme.palette.primary.main,
    },
    '& .MuiInputBase-root': {
      color: theme.palette.primary.dark,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
  idType: {
    marginLeft: '1rem',
    marginTop: '-0.4625rem',
  },
  techoContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '1.6rem',
  },
  techo: {
    color: theme.palette.primary.main,
  },
  techoCheck: {
    '& svg': {
      color: theme.palette.primary.main,
    },
  },
  buttonContainer: {
    display: 'flex',
  },
  button: {
    margin: '1vw auto',
    marginBottom: 0,
    width: '40%',
    background: theme.palette.primary.main,
    borderRadius: '1rem',
    fontSize: '1.25rem',
    color: theme.palette.primary.contrastText,
  },
  expand: {
    transform: 'rotate(270deg)',
    padding: '0.5rem',
  },
  expandOpen: {
    transform: 'rotate(0deg)',
  },
});
