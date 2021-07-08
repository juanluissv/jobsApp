import React, { useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';

import { Pagination as MyPagination } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import { getJobs } from '../../redux/actions/jobsActions';
import { useStyles } from './styles';

const Pagination = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const pageSize = 8;

  const jobsList = useSelector((state: RootStateOrAny) => state.jobsList);
  const { queries, totalCount } = jobsList;
  const pages = Math.ceil(totalCount / pageSize);

  const handleChangePagination = (event, value) => {
    dispatch(getJobs({ ...queries, page: value - 1, pageSize }));
  };

  return (
    <Container
      style={{ width: 'unset' }}
      maxWidth={false}
      disableGutters={true}
    >
      <Grid container>
        <MyPagination
          count={pages}
          className={classes.pagination}
          page={queries.page + 1}
          size="large"
          onChange={handleChangePagination}
        />
      </Grid>
    </Container>
  );
};

export default Pagination;
