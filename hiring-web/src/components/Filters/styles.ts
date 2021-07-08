import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme';

export const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #888',
    marginLeft: '1rem',
  },
  selectTypes: {
    width: 'fit-content',
  },
  selected: {
    border: 'solid thin',
    borderColor: theme.palette.primary.dark,
  },
  buttonType: {
    borderRadius: '0.35rem',
    color: theme.palette.secondary.main,
    transition: 'all 0.5s',
    cursor: 'pointer',
    padding: '0 0.3rem',
    width: 'fit-content',
    '&:hover': {
      backgroundColor: '#8686866b',
    },
    '&:active': {
      backgroundColor: '#868686ad',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  tags: {
    marginTop: '0.5rem',
  },
  tag: {
    fontSize: '0.5rem',
    padding: '0.1rem',
    borderRadius: '0.5rem',
    transition: 'all 0.5s',
    '&:hover': {
      backgroundColor: '#8686866b',
    },
    '&:active': {
      backgroundColor: '#868686ad',
    },
    '&:focus': {
      outline: 'none',
    },
  },
  tagChip: {
    marginBottom: '0.2rem',
    color: theme.palette.primary.dark,
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: '#0092dd22',
  },
  buttonActive: {
    backgroundColor: '#868686ad',
  },
  selectedTag: {
    border: `1px solid ${theme.palette.primary.dark}`,
    width: 'fit-content',
    display: 'inline-block',
    padding: '0.2rem',
  },
  label: {
    paddingTop: '0.5rem',
    fontSize: '0.95rem',
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
  },
  text: {
    '& span': {
      fontSize: '0.9rem',
    },
  },
});
