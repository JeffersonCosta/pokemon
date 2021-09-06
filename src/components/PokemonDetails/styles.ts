import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
    progressBar: {
        flex: 1,
        height: 10,
        borderRadius: 2
    },
    statName: {
        flex: '50% 0 0',
        paddingRight: 10,
        margin: 0,
        color: '#777',
        textAlign: "right"
    },
    baseStatName: {
        color: '#115293',
        width: 30,
        display: 'inline-block'
    },
    boxProgress: {
        margin: '5px 0'
    }
}));

export default useStyles;