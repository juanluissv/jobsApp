import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Flag from 'react-world-flags';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';

import { getJobs } from '../../redux/actions/jobsActions';
import { getCountries } from '../../redux/actions/countriesActions';
import { useStyles } from './styles';
import { InputAdornment } from '@material-ui/core';

import FilterSide from '../Filters/FilterSide';

const SearchBar = () => {
  const countries = useSelector(
    (state: RootStateOrAny) => state.countriesListReducer?.countries
  );
  const { queries } = useSelector((state: RootStateOrAny) => state.jobsList);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [country, setCountry] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleQueryChange = (e) => {
    if (e.target.name === 'countryId') {
      setCountry(e.target.value);
    }
    if (e.target.name === 'search') {
      setSearch(e.target.value);
    }
    dispatch(getJobs({ ...queries, [e.target.name]: e.target.value }));
  };

  return (
    <Container className={classes.root} style={{ maxWidth: '43.75rem' }}>
      <FormControl className={classes.searchBar}>
        <TextField
          id="search"
          name="search"
          placeholder="Busqueda de trabajo"
          className={classes.searchField}
          value={search}
          onChange={handleQueryChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <Container className={classes.filterAndCountry}>
        <FilterSide />
        <FormControl className={classes.selectCountry}>
          <InputLabel id="demo-simple-select-label">
            Seleccionar Pais
          </InputLabel>
          <Select
            placeholder="Pais"
            name="countryId"
            type="text"
            value={country}
            label="Seleccionar Pais"
            variant="standard"
            onChange={handleQueryChange}
            style={{ width: '100%' }}
            classes={{ selectMenu: classes.selectMenu }}
          >
            <MenuItem key={0} value="">
              Mostrar Todos
            </MenuItem>
            {countries &&
              countries.map(({ code, name, id }) => (
                <MenuItem key={id} value={id}>
                  <Flag code={code} height="20" />
                  &nbsp; {name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Container>
    </Container>
  );
};

export default SearchBar;
