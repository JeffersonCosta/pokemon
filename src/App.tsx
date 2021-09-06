import React, { useEffect, useState } from 'react';
import { Backdrop, CircularProgress, Container, CssBaseline, Grid, IconButton, Snackbar, Toolbar, Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import Pokemon from './components/Pokemon';
import SearchBar from './components/SearchBar';
import pokeApi from './services/pokeApi';
import useStyles from './styles';
import IPagination from './types/IPagination';
import IPokemon from './types/IPokemon';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';

const App = () => {

	const classes = useStyles();

	const [results, setResults] = useState<IPagination>({
		count: 0,
		next: 'pokemon?limit=10&offset=0',
		previous: '',
		results: []
	});

	const [pokemon, setPokemon] = useState<IPokemon>({});
	const [pokemons, setPokemons] = useState<Array<IPokemon>>([]);
	const [typeSearch, setTypeSearch] = useState('default');
	const [search, setSearch] = useState('');
	const [area, setArea] = useState<any>({});
	const [loading, setLoading] = useState(false);
	const [openErrorMessage, setOpenErrorMessage] = useState(false);
	const [errorMessage, setErrorMessage] = useState('Erro ao realizar busca...');

	const handleSearchPokemonsByDefault = () => {

		setLoading(true);

		pokeApi
			.get<IPagination>(results.next)
			.then(response => {

				setResults(prevState => {

					return {
						results: [...prevState.results, ...response.data.results],
						next: response.data.next,
						count: response.data.count,
						previous: response.data.previous,
					}
				});

				setLoading(false);
			})
			.catch(error => {

				setLoading(false);

				setErrorMessage('Erro ao realizar busca, por favor, tente novamente...');
				setOpenErrorMessage(true);

				console.log(error);
			});
	}

	const handleSearchPokemonByName = () => {

		setLoading(true);

		pokeApi
			.get<any>(`pokemon/${search}`)
			.then(response => {

				setPokemon({
					name: response.data.name,
					url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}/`
				});
				setLoading(false);
			})
			.catch(error => {

				setPokemon({});
				setLoading(false);

				setErrorMessage('Erro ao realizar busca, por favor, tente novamente...');
				setOpenErrorMessage(true);

				console.log(error);
			});
	}

	const handleSearchPokemonByLocationArea = () => {

		setLoading(true);

		if (area.hasOwnProperty('label')) {

			pokeApi
				.get<any>(`location-area/${area.label}`)
				.then(response => {

					const pokemonsEncounters = response.data.pokemon_encounters.map((pokemonItem: any) => pokemonItem.pokemon);
					setPokemons(pokemonsEncounters);
					setLoading(false);
				})
				.catch(error => {

					setPokemons([]);
					setLoading(false);

					setErrorMessage('Erro ao realizar busca, por favor, tente novamente...');
					setOpenErrorMessage(true);

					console.log(error);
				});
		}
	}

	const handleSearch = () => {

		if (typeSearch === 'by-area' && Object.keys(area).length > 0) {

			handleSearchPokemonByLocationArea();
		} else if (typeSearch === 'by-name' && search.length > 0) {

			handleSearchPokemonByName();
		} else if (typeSearch === 'default') {

			handleSearchPokemonsByDefault();
		}
	}

	useEffect(() => {

		handleSearch();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {

		if (typeSearch !== 'by-name') {

			setSearch('');
			setPokemon({});
		} else {

			setArea({});
			setPokemons([]);
		}
	}, [typeSearch]);

	return (

		<React.Fragment>
			<CssBaseline />

			<div className={classes.root}>

				<SearchBar
					loading={loading}
					typeSearch={typeSearch}
					setTypeSearch={setTypeSearch}
					search={search}
					setSearch={setSearch}
					area={area}
					setArea={setArea}
					handleSearch={handleSearch}
				/>

				<Toolbar />
				<Backdrop className={classes.backdrop} open={loading}>
					<CircularProgress color="inherit" />
				</Backdrop>

				<Container maxWidth="lg" className={classes.container}>

					{
						typeSearch === 'default'
						&& <InfiniteScroll
							style={{ overflow: 'inherit' }}
							dataLength={results.results.length}
							next={handleSearchPokemonsByDefault}
							hasMore={results.next.length ? true : false}
							loader={
								<div style={{ textAlign: 'center' }}>
									<CircularProgress />
								</div>
							}
							endMessage={
								<p style={{ textAlign: 'center' }}>
									<b>Não há mais pokémons a serem exibidos</b>
								</p>
							}
						>
							<Grid container spacing={3}>
								{
									results.results.map((pokemon, index) => (
										<Pokemon pokemon={pokemon} key={index} />
									))
								}
							</Grid>
						</InfiniteScroll>
					}
					<Grid container spacing={3}>

						{
							typeSearch === 'by-name'
							&& (
								Object.keys(pokemon).length
									? <Pokemon pokemon={pokemon} />
									: <Grid item sm={12}>
										<img
											className={classes.imgPikachu}
											src={process.env.PUBLIC_URL + '/img/sad-pikachu.png'}
											alt="Nenhum pokémon encontrado"
										/>

										<Typography
											gutterBottom variant="h4"
											component="h2"
											align="center"
											className={classes.imgPikachuDescription}
										>
											Nenhum pokemon encontrado
										</Typography>

									</Grid>
							)
						}

						{
							typeSearch === 'by-area'
							&& (
								pokemons.length
									? pokemons.map((pokemon, index) => <Pokemon pokemon={pokemon} key={index} />)
									: <Grid item sm={12}>
										<img
											className={classes.imgPikachu}
											src={process.env.PUBLIC_URL + '/img/happy-pikachu.png'}
											alt="Nenhuma área selecionada"
										/>

										<Typography
											gutterBottom variant="h4"
											component="h2"
											align="center"
											className={classes.imgPikachuDescription}
										>
											Selecione uma área e clique na lupa
										</Typography>
									</Grid>
							)
						}
					</Grid>
				</Container>
			</div >
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={openErrorMessage}
				autoHideDuration={6000}
				action={
					<React.Fragment>
						<IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpenErrorMessage(false)}>
							<Close fontSize="small" />
						</IconButton>
					</React.Fragment>
				}
			>
				<Alert onClose={() => setOpenErrorMessage(false)} severity="error">
					{errorMessage}
				</Alert>
			</Snackbar>
		</React.Fragment>
	);
}

export default App;