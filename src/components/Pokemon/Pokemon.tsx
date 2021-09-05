import { Box, Card, CardActions, CardContent, CardMedia, Chip, Collapse, Grid, LinearProgress, Typography } from "@material-ui/core";
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Skeleton } from "@material-ui/lab";
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import IPokemon from '../../types/IPokemon';


const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    media: {
        padding: 0,
        height: 200,
        backgroundSize: 'auto 80%',
        backgroundColor: '#F2F2F2',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    chip: {
        margin: 2
    },
    progressBar: {
        flex: 1,
        height: 10,
        borderRadius: 2
    },
    statName: {
        flex: '50% 0 0',
        paddingRight: 10,
        margin: 0,
        color: '#777',
        textAlign: "right"
    },
    baseStatName: {
        color: '#115293',
        width: 30,
        display: 'inline-block'
    },
    boxProgress: {
        margin: '5px 0'
    },
    subName: {
        color: '#999'
    },
    pokemonName: {
        fontFamily: 'Righteous, Raleway, Arial',
    }
}));

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
            <Card>
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
                {/* <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, eum in libero adipisci repudiandae, error, autem consequatur commodi illum vel unde velit inventore ipsum labore! Cumque eaque repellendus sunt provident.
                    </CardContent>
                </Collapse> */}
            </Card>
            {/* <strong>nome: {pokemon.name}</strong>
                <div>
                    {
                        loadingPokemonDetails
                            ? <p>Caregando detalhes do pokemón</p>
                            : Object.keys(pokemonDetails).length && <img src={pokemonDetails.sprites.back_default} alt={`Pokemón ${pokemon.name}`} />
                    }
                </div> */}
        </Grid>
    )
}

export default Pokemon;