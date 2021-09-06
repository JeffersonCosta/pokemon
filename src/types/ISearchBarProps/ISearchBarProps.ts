interface ISearchBarProps {
    typeSearch: string,
    setTypeSearch: (typeSearch: string) => void,
    search: string
	setSearch: (search: string) => void,
	area: {
        label: string,
        value: string
    }, 
	setArea: (area: string) => void,
	handleSearch: () => void,
    loading: boolean
}

export default ISearchBarProps;