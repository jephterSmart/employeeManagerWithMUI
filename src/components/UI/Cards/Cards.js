import React from 'react';
import Card from './Card/Card';
import {Grid} from '@material-ui/core';
import {People} from '@material-ui/icons';


const Cards = props => {
    const arr = props.statistics || [
        {id: 0,
        label:"Total Employees",
        labelValue: props.totalEmployees,
        color: "primary",
        icon:People,
        
    },
        {id: 5,
        label:"Current Employees",
        labelValue: props.totalEmployees,
        color: "primary",
        icon:People
    },
        {id: 7,
        label:"Pending Employees",
        labelValue: 0,
        color: "primary",
        icon:People
    },
        {id: 10,
        label:"KGM Direct Employees",
        labelValue: 5,
        color: "secondary",
        icon:People
    },
    {
        id: 1,
        label:"Temporary Employee(s)",
        labelValue: 1 ,
        color:"secondary"  
,
icon:People    },
    {
        id: 2,
        label:"NYSC Employees",
        labelValue: 0 ,
        color: "secondary",
        icon:People  
    },
    {
        id: 3,
        label:"Expatrait Employees",
        labelValue: 0 ,
        color: "secondary" 
,
icon:People    },
    {
        id: 4,
        label:"Consultant Employees",
        labelValue: 1,
        color: "secondary" ,
        icon:People
    },{
        id: 11,
        label:"SWES Employees",
        labelValue: 0,
        color: "secondary" ,
        icon:People   
    },{
        id: 12,
        label:"Exited Employees",
        labelValue: 1,
        color: "tertiary" ,
        icon:People
    }
    ] ;
    const result = arr.map(stat => {
        return(
            <Grid item xs={4} key={stat.id}>
            <Card {...stat}
            />
        </Grid>
        )
    })
return ( 
    <Grid container  spacing={2}>
        {result}
    </Grid>
    
    )
    ;

}


export default Cards;