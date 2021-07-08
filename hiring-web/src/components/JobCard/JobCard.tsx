import React from 'react';
import { useHistory } from 'react-router-dom';
import { RootStateOrAny, useSelector } from 'react-redux';

import SweetAlert from 'sweetalert2';

import {
  Card,
  Container,
  IconButton,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import getDays from './getDays';
import Sweet from '../Sweet/Sweet';

import { useStyles } from './styles';

export default function JobCard({ job }) {
  const classes = useStyles();
  const history = useHistory();

  const userInfo = useSelector(
    (state: RootStateOrAny) => state.userUpdateReducer.userInfo
  );

  const jobPending = userInfo.jobs?.find(
    (jobPostulate) => jobPostulate.id === job.id
  );

  return (
    <Card className={classes.root}>
      <CardContent className={classes.topContainer}>
        <CardActions
          className={`${classes.topBorder} ${
            jobPending && classes.pendingTopBorder
          }`}
        >
          <Container className={classes.iconContainer}>
            <LocationOnIcon className={classes.icon} />
            <Typography className={classes.labelCity}>
              {job.country.name}
            </Typography>
          </Container>

          <IconButton className={classes.iconButton}>
            <FavoriteBorderIcon className={classes.icon} />
          </IconButton>
        </CardActions>

        <CardContent className={classes.bodyContainer}>
          <CardContent className={classes.titleContainer}>
            <Typography
              className={classes.title}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {job.name}
            </Typography>
            <Typography className={classes.endJob}>
              {job.end_date
                ? getDays(job.end_date) > 0
                  ? `Finaliza en ${getDays(job.end_date)} días`
                  : 'Postulación finalizada'
                : null}
            </Typography>
          </CardContent>

          <Divider />

          <CardContent className={classes.jobContainer}>
            <Typography
              variant="body2"
              noWrap={true}
              className={classes.jobRequirement}
              component="p"
            >
              {job.requirements}
            </Typography>

            <Typography
              variant="body2"
              className={classes.jobDetail}
              component="p"
            >
              {job.responsibilities}
            </Typography>
          </CardContent>
        </CardContent>
      </CardContent>

      <CardActions className={classes.buttonContainer}>
        <Button
          onClick={() => history.push(`/job/${job.id}`)}
          className={classes.infoButton}
          variant="contained"
          endIcon={<NavigateNextIcon />}
        >
          Más información
        </Button>

        <Sweet
          swal={SweetAlert}
          text={jobPending ? 'Actualizar' : 'Postularme'}
          from="job"
          jobId={job.id}
        />
      </CardActions>
    </Card>
  );
}
