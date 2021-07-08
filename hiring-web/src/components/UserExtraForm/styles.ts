import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme';

export const useStyles = makeStyles({
  root: {
    maxWidth: '30.8rem',
    color: theme.palette.primary.dark,
    height: 'fit-content',
    borderRadius: '0.7rem',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    border: `0.1rem solid ${theme.palette.primary.main}`,
    padding: '1rem',
  },
  gridContainer: {
    width: '100%',
    display: 'flex',
    margin: 0,
    '& .MuiGrid-container': {
      padding: 0,
    },
  },
  gridTitleContainer: {
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
    marginTop: '1rem',
  },
  textArea: {
    resize: 'none',
    color: theme.palette.primary.main,
    fontSize: '1rem',
    width: '99%',
    '& .MuiFormLabel-root.Mui-focused': {
      color: theme.palette.primary.main,
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
  button: {
    margin: '0',
    width: '100%',
    background: theme.palette.primary.main,
    borderRadius: '0.625rem',
    fontSize: '1.25rem',
    color: theme.palette.primary.contrastText,
  },
  customTooltip: {
    fontSize: '0.8rem',
    backgroundColor: theme.palette.primary.light,
  },
  expand: {
    transform: 'rotate(270deg)',
    padding: '0.5rem',
  },
  expandOpen: {
    transform: 'rotate(0deg)',
  },
});
