import React from "react";
import { Box, LinearProgress } from "@material-ui/core";
import useStyles from "./styles";

interface IPokemonDetailsProps {
    pokemonDetails:{
        stats: Array<any>
    }
}

function PokemonDetails({ pokemonDetails }: IPokemonDetailsProps) {

    const classes = useStyles();

    return (
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
    )
}

export default PokemonDetails;