import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme';

export const useStyles = makeStyles({
  root: {
    width: '35vw',
    height: '16.3rem',
    borderRadius: 10,
    margin: '0.875em',
    float: 'left',
    border: '0.313rem',
    borderColor: theme.palette.primary.dark,
    backgroundColor: theme.palette.info.light,
    paddingBottom: '0.3125em',
    transition: 'all 0.5s',
    '&:hover': {
      width: '35.3vw',
      heigt: '18rem',
      boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.75)',
      webkitBoxShadow: ' 0px 0px 30px 0px rgba(0,0,0,0.75)',
      mozBoxShadow: ' 0px 0px 30px 0px rgba(0,0,0,0.75)',
    },
    '& .MuiContainer-root': {
      paddingLeft: 0,
    },
    [theme.breakpoints.down('sm')]: {
      width: '42vw',
      '&:hover': {
        width: '42.3vw',
        heigt: '18rem',
      },
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
      '&:hover': {
        width: '92%',
        heigt: '18rem',
      },
    },
  },
  topContainer: {
    padding: 0,
    color: theme.palette.primary.dark,
  },
  topBorder: {
    backgroundColor: theme.palette.primary.main,
    height: '1.5625em',
    width: '100%',
    justifyContent: 'space-between',
  },
  pendingTopBorder: {
    backgroundColor: theme.palette.primary.dark,
  },
  iconContainer: {
    color: theme.palette.primary.contrastText,
    fontSize: 14,
    display: 'flex',
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
  labelCity: {
    marginTop: '0.25em',
    marginLeft: 0,
  },
  iconButton: {
    padding: 0,
    marginRight: '0.9375em',
    visibility: 'hidden',
  },
  bodyContainer: {
    padding: '0.3125em',
    margin: '0 8px',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0',
    marginTop: '0.3125em',
  },
  title: {
    fontSize: 22,
    marginBottom: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  endJob: {
    fontSize: 11,
    color: theme.palette.secondary.light,
    fontWeight: 'bolder',
    marginRight: '-0.625em',
  },
  jobContainer: {
    padding: 0,
    marginTop: '0.1875em',
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  jobRequirement: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 12,
    color: theme.palette.primary.light,
  },
  jobDetail: {
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitLineClamp: 4,
    paddingTop: '0.6em',
    WebkitBoxOrient: 'vertical',
    textAlign: 'justify',
    marginTop: '0.4375em',
    minHeight: '5.95em',
    fontSize: 15,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
    marginTop: '0.75em',
    margin: '1rem',
  },
  infoButton: {
    backgroundColor: 'transparent',
    border: 'none',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 13,
    padding: '0.3125em',
    '& span': {
      margin: 0,
    },
    '&:hover': {
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
      color: theme.palette.primary.light,
    },
  },
  
  endIcon: {
    margin: 0,
  },
});
