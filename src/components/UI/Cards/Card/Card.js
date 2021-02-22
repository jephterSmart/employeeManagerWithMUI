import React from 'react';
import {People} from '@material-ui/icons';
import clsx from 'clsx'
import {Divider} from '@material-ui/core'

import classes from './Card.css';




const Card = props => { 
    const color = classes[props.color? props.color:"primary"];

return (
<div className={classes.CardUpper}> 
    <div className={classes.Card}>
     <div className={classes.CardChild}>
        <div className={clsx(classes.Icon,color)}>
            <props.icon />
        </div>
        <div className={classes.Label}>
            <div style={{opacity:"0.8"}}>{props.label}</div>
            <div >{props.labelValue}</div>
        </div>
        </div>
        <div className={classes.Divider}>
         <Divider /> 
         </div>
    </div>
</div>
    );

}


export default Card;