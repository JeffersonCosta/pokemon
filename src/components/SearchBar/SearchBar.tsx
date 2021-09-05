import React from 'react';
import { AppBar, Box, Button, Grid, MenuItem, TextField, Toolbar } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { AsyncPaginate } from 'react-select-async-paginate';
import pokeApi from '../../services/pokeApi';
import useStyles from './styles';

interface ISearchBarProp {
    typeSearch: string,
    setTypeSearch: (typeSearch: string) => void,
    search: string
	setSearch: (search: string) => void,
	area: string, 
	setArea: (area: string) => void,
	handleSearch: () => void,
}

function SearchBar({ 
    typeSearch, 
    setTypeSearch, 
    search,
    setSearch,
    area,
    setArea,
    handleSearch
}: ISearchBarProp) {

    const classes = useStyles();

    async function loadOptions(loadedOptions: any) {

		const response = await pokeApi.get<any>(`location-area?offset=${loadedOptions.length}&limit=20`);
		const results = response.data.results.map((result: any) => {
			return {
				value: result.id,
				label: result.name
			}
		})
		return {
			options: results,
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
                                >
                                    <SearchOutlined />
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