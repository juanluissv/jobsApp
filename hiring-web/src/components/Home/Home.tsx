import React, { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import JobCard from '../JobCard/JobCard';
import HomeHeader from '../HomeHeader/HomeHeader';
import Pagination from '../Pagination/Pagination';
import { getJobs } from '../../redux/actions/jobsActions';
import { useStyles } from './styles';
import Filters from '../Filters/Filters';
import Fade from '@material-ui/core/Fade';

const Home = () => {
  const { loading, jobs, queries } = useSelector(
    (state: RootStateOrAny) => state.jobsList
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const jobsData = jobs?.data;

  useEffect(() => {
    dispatch(getJobs({ ...queries, pageSize: 8 }));
  }, []);

  return (
    <Grid container>
      <HomeHeader />
      <Grid container style={{ paddingLeft: '0.5rem' }} spacing={2}>
        <Grid xs={2} className={classes.filterContainer}>
          <div className={classes.responsiveFilter}>
            <Filters side={false} />
          </div>
        </Grid>
        {loading ? (
          <Grid className={classes.loadingContainer} xs={10}>
            <CircularProgress />
          </Grid>
        ) : (
          <Grid container className={classes.jobsAndPagination} xs={10}>
            <Pagination />
            <Fade in={true} timeout={1000}>
              <Grid container className={classes.jobsCardCointainer}>
                {jobsData?.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </Grid>
            </Fade>
            <Pagination />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
