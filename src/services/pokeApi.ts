import axios from "axios";

const pokeApi =  axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    headers: { 'Content-Type': 'Application/json' }
});

export default pokeApi;