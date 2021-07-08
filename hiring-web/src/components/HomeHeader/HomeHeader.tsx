import React from 'react';

import { Container } from '@material-ui/core';

import SearchBar from '../SearchBar/SearchBar';

import { useStyles } from './styles';

const HomeHeader = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Container className={classes.image}>
        <Container className={classes.filter}>
          <SearchBar />
        </Container>
      </Container>
    </Container>
  );
};

export default HomeHeader;
