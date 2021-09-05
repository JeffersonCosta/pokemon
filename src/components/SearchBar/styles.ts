import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
	input: {
		margin: 10,
		maxWidth: 250,
		width: '100%'
	},
	selectArea: {
		maxWidth: 250,
		width: '100%',
		margin: 10
	},
	btnSearch: {
		padding: 8,
		minWidth: 30
	}
}));

export default useStyles;