import React from 'react';
import IPokemon from '../../types/IPokemon';

interface Props {
    pokemon: IPokemon
}

const Pokemon:React.FC<Props> = ({ pokemon, children }) => {

    return (
        <div style={{ height: 100}}>
            <strong>nome: {pokemon.name}</strong>
        </div>
    )
}

export default Pokemon;