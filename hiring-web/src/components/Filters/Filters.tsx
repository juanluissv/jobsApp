import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { getTags } from '../../redux/actions/tagsActions';
import { getJobs } from '../../redux/actions/jobsActions';
import {
  Button,
  InputLabel,
  Chip,
  List,
  ListItem,
  ListItemText,
  Grid,
  IconButton,
  Divider,
} from '@material-ui/core';
import { useStyles } from './styles';
import BackspaceIcon from '@material-ui/icons/Backspace';

export interface iTag {
  id: number;
  name: string;
  code: string;
}

const Filter = ({ side }) => {
  const tagsList = useSelector(
    (state: RootStateOrAny) => state.tagsReducer.tags
  );
  const jobsList = useSelector((state: RootStateOrAny) => state.jobsList);
  const { queries } = jobsList;
  const [chips, setChips] = useState([]);

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getTags());
  }, []);

  const handleDelete = (id) => {
    setChips((chips) => chips.filter((chip) => chip.id !== id));
    const tags = queries.tags.filter((tag) => Number(tag) !== Number(id));
    dispatch(getJobs({ ...queries, tags, page: 0 }));
  };

  const handleQueryChange = (type: string, value) => {
    dispatch(getJobs({ ...queries, [type]: value, page: 0 }));
  };

  const handleTagsClick = (id) => {
    let tags = queries.tags;
    const newChip = tagsList.find((tag) => tag.id === Number(id));
    if (!chips.filter((chip) => chip.id === newChip.id).length) {
      setChips([...chips, newChip]);
      tags = [...queries.tags, id];
    }

    dispatch(getJobs({ ...queries, tags, page: 0 }));
  };

  const handleDeleteFilters = () => {
    setChips([]);
    dispatch(
      getJobs({
        countryId: queries.countryId,
        condition: '',
        page: 0,
        pageSize: 8,
        search: queries.search,
        sortBy: '',
        sortFrom: '',
        full_time: '',
        presency: '',
        tags: [],
        closed_jobs: 'false',
      })
    );
  };
  const array_conditions = [
    { type: 'condition', name: 'Todos', value: '' },
    { type: 'condition', name: 'Voluntario', value: 'volunteer' },
    { type: 'condition', name: 'Contratado', value: 'contract' },
  ];
  const array_schedule = [
    { type: 'full_time', name: 'Todos', value: '', id: 1 },
    { type: 'full_time', name: 'Full Time', value: true, id: 2 },
    { type: 'full_time', name: 'Part Time', value: false, id: 3 },
  ];
  const array_presency = [
    { type: 'presency', name: 'Todos', value: '', id: 1 },
    { type: 'presency', name: 'Presencial', value: 'full_presency', id: 2 },
    {
      type: 'presency',
      name: 'Semi Presencial',
      value: 'semi_presency',
      id: 3,
    },
    { type: 'presency', name: 'Remote', value: 'remote', id: 4 },
  ];

  return (
    <Grid className={classes.root}>
      <Button onClick={handleDeleteFilters}>Borrar filtros</Button>
      {queries.tags.length && !side ? (
        <Grid>
          <InputLabel>Areas seleccionadas</InputLabel>

          {tagsList.map(
            (tag) =>
              queries.tags.includes(tag.id) && (
                <Chip
                  variant="outlined"
                  className={classes.tagChip}
                  size="small"
                  id={tag.id}
                  key={tag.id}
                  label={tag.name}
                  clickable
                  onDelete={() => handleDelete(tag.id)}
                />
              )
          )}
        </Grid>
      ) : null}

      <Divider />
      <InputLabel className={classes.label}>ÁREA</InputLabel>
      <List>
        {tagsList?.map((el: iTag) => (
          <>
            <ListItem
              button
              className={
                side && queries.tags.includes(el.id)
                  ? `${classes.selectedTag} ${classes.tag}`
                  : classes.tag
              }
              key={el.id}
              onClick={() => handleTagsClick(el.id)}
            >
              <ListItemText className={classes.text} primary={el.name} />
            </ListItem>
            {side && queries.tags.includes(el.id) && (
              <IconButton
                style={{ padding: '0 0.2rem' }}
                onClick={() => {
                  handleDelete(el.id);
                }}
              >
                <BackspaceIcon style={{ fontSize: '1rem' }} />
              </IconButton>
            )}
          </>
        ))}
      </List>
      <Divider />
      <InputLabel id="demo-simple-select-label" className={classes.label}>
        TIPO DE TRABAJO
      </InputLabel>
      <List className={classes.selectTypes}>
        {array_conditions.map((el) => (
          <ListItem
            className={
              queries[el.type] === el.value
                ? `${classes.selected} ${classes.buttonType}`
                : classes.buttonType
            }
            key={el.value}
            value={el.value}
            onClick={() => handleQueryChange('condition', el.value)}
          >
            <ListItemText className={classes.text} primary={el.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <InputLabel id="demo-simple-select-label" className={classes.label}>
        JORNADA LABORAL
      </InputLabel>
      <List className={classes.selectTypes}>
        {array_schedule.map((el) => (
          <ListItem
            className={
              queries[el.type] === el.value
                ? `${classes.selected} ${classes.buttonType}`
                : classes.buttonType
            }
            key={el.id}
            value={el.value.toString()}
            onClick={() => handleQueryChange('full_time', el.value)}
          >
            <ListItemText className={classes.text} primary={el.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <InputLabel id="demo-simple-select-label" className={classes.label}>
        PRESENCIALIDAD
      </InputLabel>
      <List className={classes.selectTypes}>
        {array_presency.map((el) => (
          <ListItem
            className={
              queries[el.type] === el.value
                ? `${classes.selected} ${classes.buttonType}`
                : classes.buttonType
            }
            key={el.id}
            value={el.value}
            onClick={() => handleQueryChange('presency', el.value)}
          >
            <ListItemText className={classes.text} primary={el.name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Grid>
  );
};

export default Filter;
