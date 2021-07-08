import { makeStyles, Theme } from '@material-ui/core/styles';
import theme from '../../utils/theme';

export const useStyles = makeStyles((muiTheme: Theme) => ({
  popover: {
    pointerEvents: 'none',
    hidden: 'true',
  },
  paper: {
    padding: muiTheme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  iconButton: {
    padding: 0,
    width: '100%',
    height: '100%',
  },
  iconValidate: {
    fontSize: '2rem',
    color: theme.palette.primary.main,
  },
  iconNoValidate: {
    color: 'red',
  },
  popup: {
    fontSize: '0.8rem',
    color: theme.palette.primary.contrastText,
  },
}));
