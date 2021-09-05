import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		flexGrow: 1,
		fontFamily: 'Righteous, Raleway, Arial'
	},
	container: {
		paddingTop: 20
	},
	selectArea: {
		maxWidth: 250,
		width: '100%',
		margin: 10
	}
}));

export default useStyles;