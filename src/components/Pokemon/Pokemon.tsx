import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Chip, Collapse, Grid, IconButton, Snackbar, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { Alert, Skeleton } from "@material-ui/lab";
import axios from 'axios';
import IPokemon from '../../types/IPokemon';
import PokemonDetails from "../PokemonDetails";
import useStyles from "./styles";

interface Props {
    pokemon: IPokemon
}

const Pokemon: React.FC<Props> = ({ pokemon }) => {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const [loadingPokemonDetails, setLoadingPokemonDetails] = useState(false);
    const [pokemonDetails, setPokemonDetails] = useState<any>({});
    const [openErrorMessage, setOpenErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('Erro ao realizar busca...');

    useEffect(() => {

        setLoadingPokemonDetails(true);

        if (pokemon.url) {

            axios
                .get<any>(pokemon.url)
                .then(response => {

                    setPokemonDetails(response.data);
                    setLoadingPokemonDetails(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoadingPokemonDetails(false);

                    setErrorMessage('Erro ao buscar detalhes do pokémon, por favor, tente novamente...');
                    setOpenErrorMessage(true);
                });
        }

    }, [pokemon.url]);

    return (
        <>
            <Grid item xs={12} sm={4}>
                <Card
                    onClick={handleExpandClick}
                    className={`${expanded === true ? classes.cardExpanded : ''}`}
                >
                    {
                        loadingPokemonDetails
                            ? <Skeleton variant="rect" width="100%" height={200} />
                            : <CardMedia
                                className={classes.media}
                                image={Object.keys(pokemonDetails).length ? pokemonDetails.sprites.other.dream_world.front_default : 'https://img1.gratispng.com/20171220/kqw/pokeball-png-5a3a4a7e247ce7.9167778215137695981495.jpg'}
                                title={`Pokemón ${pokemon.name}`}
                            />
                    }

                    <CardContent>

                        <Typography gutterBottom variant="h4" component="h2" align="center" className={classes.pokemonName}>
                            {pokemon.name} <span className={classes.subName}>Nº{pokemonDetails.id}</span>
                        </Typography>

                        <Box marginY={1} display="flex" justifyContent="center" flexWrap="wrap">
                            {
                                loadingPokemonDetails
                                    ? <Skeleton variant="text" />
                                    : Object.keys(pokemonDetails).length && pokemonDetails.abilities.map((ability: any, index: number) =>
                                        <Chip className={classes.chip} color="secondary" size="medium" key={index} label={ability.ability.name} />
                                    )
                            }
                        </Box>
                    </CardContent>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <PokemonDetails
                                pokemonDetails={pokemonDetails}
                            />
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
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
        </>
    )
}

export default Pokemon;