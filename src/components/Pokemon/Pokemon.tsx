import React from 'react';

interface IPokemon {
	name: string,
	url: string
}

interface Props {
    pokemon: IPokemon
}

const Pokemon:React.FC<Props> = ({ pokemon, children }) => {

    return (
        <div>
            <strong>nome: {pokemon.name}</strong>
        </div>
    )
}

export default Pokemon;