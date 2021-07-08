import { makeStyles } from '@material-ui/core/styles';
import theme from '../../utils/theme';

export const useStyles = makeStyles({
  pagination: {
    '& .MuiButtonBase-root': {
      '&:hover': {
        backgroundColor: 'transparent',
        border: 'none',
        boxShadow: 'none',
        color: theme.palette.primary.main,
      },
    },
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
});
