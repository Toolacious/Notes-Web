import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    titlebar: {
        flexGrow: 1,
        fontSize: "14px",
        margin: theme.spacing(1),
        outline: "none",
        padding: "1px 6px",
        borderRadius: "12px",
        borderColor: `${theme.palette.divider}`,
        '&:focus': {
            borderColor: theme.palette.text.primary,
        }
    },
}));

export default function FileTree() {
    const classes = useStyles();

    //TODO: backend replace demo data
    const demoResults = ['How to do this']
    const [showingItem, setShowingItem] = React.useState(demoResults)

    //TODO: backend search, return [] if input is empty string
    const search = (e) => {
        let str = e.target.value
        //result = ...
        //setShowingItem(result)
    }

    return (
        <>  
            <CssBaseline />
            <div style={{display: "flex"}}>
                <input className={classes.titlebar} placeholder="Search files or tags" onChange={search}/>
            </div> 
            <Divider style={{height: "3px"}}/>
            <div style={{flexGrow: 1, overflowY: "auto"}}>
                <List disablePadding={true}>
                    {showingItem.map((text, index) => (
                        <>
                            <ListItem button key={index}>
                                <ListItemText primary={text} />
                            </ListItem>
                            <Divider />
                        </>
                    ))}                        
                </List>
            </div>
        </>
    )
}