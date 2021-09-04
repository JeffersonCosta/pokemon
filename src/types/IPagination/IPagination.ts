import IPokemon from "../IPokemon";

interface IPagination {
	count: number,
	next: string,
	previous: string,
	results: Array<IPokemon>
}

export default IPagination;