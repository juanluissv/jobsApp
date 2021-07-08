import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import TuneIcon from '@material-ui/icons/Tune';
import Filters from './Filters';
import { IconButton } from '@material-ui/core';
import theme from '../../utils/theme';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  responsiveIcon: {
    padding: '0',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

export default function FilterSide() {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState(open);
  };

  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(true)}
      onKeyDown={toggleDrawer(false)}
    >
      <Filters side={true} />
    </div>
  );

  return (
    <div>
      <React.Fragment key={'left'}>
        <IconButton
          className={classes.responsiveIcon}
          onClick={toggleDrawer(true)}
        >
          <TuneIcon style={{ marginTop: '22px', paddingRight: '1rem' }} />
        </IconButton>
        <SwipeableDrawer
          anchor={'left'}
          open={state}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
