import React from 'react';
import { AppBar, Box, Button, CircularProgress, Grid, MenuItem, TextField, Toolbar } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { AsyncPaginate } from 'react-select-async-paginate';
import pokeApi from '../../services/pokeApi';
import useStyles from './styles';
import ISearchBarProps from '../../types/ISearchBarProps';

function SearchBar({ 
    loading,
    typeSearch, 
    setTypeSearch, 
    search,
    setSearch,
    area,
    setArea,
    handleSearch
}: ISearchBarProps) {

    const classes = useStyles();

    async function loadOptions(search: string, prevOptions: any) {

		const response = await pokeApi.get<any>(`location-area?offset=${prevOptions.length}&limit=20`);

		const results = response.data.results.map((result: any) => {
			return {
				value: result.id,
				label: result.name
			}
		});

        const options = [...results, ...prevOptions];

		return {
			options: options,
			hasMore: response.data.next,
		};
	}

    return (
        <AppBar position="fixed" color="inherit">
            <Toolbar>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box display='flex' justifyContent="center" alignItems="center">

                            <TextField
                                className={classes.input}
                                size="small"
                                select
                                label="Pesquisar por"
                                value={typeSearch}
                                onChange={event => setTypeSearch(event.target.value)}
                                variant="outlined"
                            >
                                <MenuItem key="default" value="default">
                                    Todos
                                </MenuItem>
                                <MenuItem key="by-area" value="by-area">
                                    Localização
                                </MenuItem>
                                <MenuItem key="by-name" value="by-name">
                                    Nome
                                </MenuItem>
                            </TextField>

                            {
                                typeSearch === 'by-area'
                                    ? <AsyncPaginate
                                        className={classes.selectArea}
                                        value={area}
                                        loadOptions={loadOptions}
                                        onChange={(area: any) => { setArea(area) }}
                                        placeholder="Selecione uma área"
                                    />
                                    : <TextField
                                        className={classes.input}
                                        size="small"
                                        placeholder="Pesquisar..."
                                        value={search}
                                        onChange={event => {
                                            setSearch(event.target.value)
                                        }}
                                        disabled={typeSearch === 'default'}
                                        label="Digite aqui..."
                                        type="search"
                                        variant="standard"
                                    />
                            }

                            <Box display="flex" alignItems="center">
                                <Button
                                    size="large"
                                    variant="contained"
                                    onClick={handleSearch}
                                    color="primary"
                                    className={classes.btnSearch}
                                    disabled={(typeSearch === 'default') || (typeSearch === 'by-area' && area === null)}
                                >
                                    {
                                        loading === true
                                        ? <CircularProgress color="inherit" size={24} />
                                        : <SearchOutlined />
                                    }
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default SearchBar;