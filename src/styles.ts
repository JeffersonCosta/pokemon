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
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	imgPikachu: {
		maxWidth: 300,
		display: 'block',
		margin: '50px auto'
	},
	imgPikachuDescription: {
		fontFamily: 'Righteous, Raleway, Arial',
		marginTop: 20
	}
}));

export default useStyles;