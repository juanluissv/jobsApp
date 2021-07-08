import { makeStyles } from '@material-ui/core';
import theme from '../../../utils/theme';

export const useStyles = makeStyles({
  root: {
    marginTop: '2rem',
    marginLeft: '6rem',
    width: '90vw',
  },
  header: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
});
