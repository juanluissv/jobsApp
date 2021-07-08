import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import IconButton from '@material-ui/core/IconButton';

import { useStyles } from './styles';

export default function PopOverPostulation() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const userInfoValidated = useSelector(
    (state: RootStateOrAny) => state.userUpdateReducer.userInfoValidated
  );

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={classes.iconButton}
      >
        <InfoOutlinedIcon
          className={`${classes.iconValidate} ${
            userInfoValidated ? '' : classes.iconNoValidate
          }`}
        />
      </IconButton>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography className={classes.popup}>
          {userInfoValidated
            ? 'Datos personales completos'
            : 'Requiere completar datos personales'}
        </Typography>
      </Popover>
    </div>
  );
}
