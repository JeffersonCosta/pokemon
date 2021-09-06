import { red } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        cursor: 'pointer'
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
    subName: {
        color: '#999'
    },
    pokemonName: {
        fontFamily: 'Righteous, Raleway, Arial',
    },
    cardExpanded: {
        border: '5px solid #efefef'
    }
}));

export default useStyles;