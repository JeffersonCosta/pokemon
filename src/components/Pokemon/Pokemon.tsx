import { Box, Card, CardContent, CardMedia, Chip, Collapse, Grid, LinearProgress, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import IPokemon from '../../types/IPokemon';
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
                });
        }

    }, [pokemon.url]);

    return (
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

                    <Box marginY={2}>
                        Abilities:
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
                        <Box marginY={2}>
                            {
                                Object.keys(pokemonDetails).length && pokemonDetails.stats.map((stat: any, index: number) =>
                                    <Box key={index} display="flex" alignItems="center" className={classes.boxProgress}>
                                        <p className={classes.statName}>
                                            {stat.stat.name}
                                            <strong className={classes.baseStatName}>{stat.base_stat}</strong>
                                        </p>
                                        <LinearProgress className={classes.progressBar} variant="determinate" value={stat.base_stat} />
                                    </Box>
                                )
                            }
                        </Box>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    )
}

export default Pokemon;