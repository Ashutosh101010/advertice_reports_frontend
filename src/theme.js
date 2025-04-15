// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#45679F',
        },
        secondary: {
            main: '#FFC107',
        },
        background: {
            default: '#f4f4f4',
        },
    },
    typography: {
        fontFamily: 'sans-serif',
    },
});

export default theme;
