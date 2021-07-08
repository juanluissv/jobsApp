import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme';

export const useStyles = makeStyles({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    '& svg': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      '&.MuiGrid-grid-xs-10': {
        maxWidth: '100%',
        flexBasis: '100%',
      },
    },
  },
  jobsAndPagination: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      '&.MuiGrid-grid-xs-10': {
        maxWidth: '100%',
        flexBasis: '100%',
      },
    },
  },
  jobsCardCointainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  filterContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  responsiveFilter: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
      width: '0%',
      '& .MuiGrid-grid-xs-2': {
        flexBasis: 0,
      },
    },
  },
});
