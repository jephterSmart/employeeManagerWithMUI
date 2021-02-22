import {createMuiTheme} from '@material-ui/core';


const theme = createMuiTheme({
    palette:{
        primary:{
            main:'#42949d'
        } ,
        secondary:{
            main:'#018b01',
        },
        tertiary:{
            main:'#e4827d'}
        },
    status:{
        danger: 'red'
    }
});

export default theme