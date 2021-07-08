import React, { useState } from 'react';
import axios from 'axios';
import MaterialTable from '@material-table/core';
import { Grid } from '@material-ui/core';
import tableIcons from './tableIcons';
import theme from '../../../utils/theme';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import { useHistory } from 'react-router';

import { useStyles } from './styles';

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();

  const [selectedRow, setSelectedRow] = useState(null);

  const getCurrentJobs = ({ page, pageSize, search, ...props }) => {
    let orderBy = '';
    if (props.orderBy?.field === 'country.name') orderBy = 'countryId';
    else orderBy = props.orderBy?.field;
    const myurl = `${
      process.env.REACT_APP_BACKEND_URL
    }/jobs?&search=${search}&page=${page}&pageSize=${pageSize}&closed_jobs=true&sortBy=${
      orderBy || ''
    }&sortFrom=${props.orderDirection?.toUpperCase() || ''}`;

    return axios.get(myurl).then(({ data }) => {
      return {
        data: data?.data,
        page,
        pageSize,
        totalCount: data.totalCount,
      };
    });
  };

  return (
    <Grid className={classes.root}>
      <MaterialTable
        title="Postulaciones"
        icons={{
          Search: tableIcons.Search,
          ResetSearch: tableIcons.ResetSearch,
          FirstPage: tableIcons.FirstPage,
          LastPage: tableIcons.LastPage,
          NextPage: tableIcons.NextPage,
          PreviousPage: tableIcons.PreviousPage,
          SortArrow: tableIcons.SortArrow,
          DetailPanel: tableIcons.DetailPanel,
        }}
        data={getCurrentJobs}
        columns={[
          { title: 'id', field: 'id', hidden: true },
          { title: 'Nombre', field: 'name', align: 'center' },
          { title: 'Condition', field: 'condition' },
          { title: 'Pais', field: 'country.name' },
          { title: 'Fecha Inicio', field: 'start_date', type: 'date' },
          { title: 'Fecha Fin', field: 'end_date', type: 'date' },
          { title: 'Estado', field: 'status' },
        ]}
        actions={[
          {
            icon: FolderSharedIcon,
            tooltip: 'Usuarios Postulados',
            onClick: (event, rowData) => {
              history.push(`/admin/postulants/${rowData['id']}`);
            },
          },
        ]}
        onRowClick={(evt, selectedRow) => setSelectedRow(selectedRow.id)}
        options={{
          actionsColumnIndex: 0,
          debounceInterval: 1000,
          pageSize: 16,
          pageSizeOptions: [8, 16, 24, 32, 40],
          headerStyle: {
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
          },
          sorting: true,
          thirdSortClick: true,
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.id
                ? theme.palette.info.dark
                : theme.palette.info.light,
          }),
        }}
        localization={{
          body: {
            emptyDataSourceMessage: 'No hay registros para mostrar',
          },
          header: {
            actions: 'Postulantes',
          },
          toolbar: {
            searchPlaceholder: 'Buscar',
          },
          pagination: {
            labelDisplayedRows: '{from}-{to} de {count}',
            labelRowsPerPage: 'Filas por página',
            lastTooltip: 'Última página',
            firstTooltip: 'Primera página',
            nextTooltip: 'Página siguiente',
            previousTooltip: 'Página anterior',
            labelRowsSelect: 'Filas',
          },
        }}
      />
    </Grid>
  );
}
