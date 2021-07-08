import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useParams } from 'react-router';
import MaterialTable from '@material-table/core';
import TABLE_ICONS from '../Dashboard/tableIcons';
import { Grid } from '@material-ui/core';

import { getPostulantsByJobId } from '../../../redux/actions/postulantsByJobId';
import theme from '../../../utils/theme';
import { useStyles } from './styles';

const PostulantsByJobId = () => {
  const dispatch = useDispatch();
  const { jobId } = useParams<any>();
  const classes = useStyles();
  const { jobPostulants } = useSelector(
    (state: RootStateOrAny) => state.adminReducer
  );
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    dispatch(getPostulantsByJobId(jobId));
  }, []);

  return (
    <Grid className={classes.root}>
      <MaterialTable
        title={
          jobPostulants[0]?.job.name
            ? `Postulantes para ${jobPostulants[0]?.job.name}`
            : 'No se encontraron postulantes'
        }
        icons={TABLE_ICONS}
        data={jobPostulants}
        columns={[
          { field: 'userId', hidden: true },
          { title: 'Nombre', field: 'user.firstName', align: 'center' },
          { title: 'Apellido', field: 'user.lastName' },
          { title: 'Email', field: 'user.email' },
          { title: 'Residencia', field: 'user.residence' },
          {
            title: 'Experiencia Techo',
            field: 'user.techo_experience',
            type: 'boolean',
          },
          {
            title: 'Expect. salarial',
            field: 'expected_salary',
            type: 'currency',
            align: 'left',
          },
          { title: 'Fecha de postulacion', field: 'updatedAt', type: 'date' },
          { title: 'Estado', field: 'status' },
        ]}
        onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.userId)}
        options={{
          headerStyle: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
          },
          sorting: true,
          thirdSortClick: true,
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.userId
                ? theme.palette.info.dark
                : theme.palette.info.light,
          }),
        }}
      />
    </Grid>
  );
};

export default PostulantsByJobId;
