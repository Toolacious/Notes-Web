import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LinkIcon from '@material-ui/icons/Link';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const sidebarWidth = 32;
const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
    root: {
        width: sidebarWidth,
        display: 'flex',
    },
    sidebarWrapper: {
        width: sidebarWidth,
        display: 'flex',
        alignItems: "center",
        flexDirection: 'column',
        borderLeft: `1px solid ${theme.palette.divider}`,
    },
    nopad:{
        padding: "0px",
        margin: "6px 0px",
    },
    rootShift: {
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    drawer: {
        flexShrink: 0,
    },
    drawerPaperWrapper:{
        position: "relative",
    },
    drawerPaper: {
        position: "absolute",
        top: "0px",
        right: sidebarWidth,
        width: drawerWidth,
        bottom: "0px",
    },
    drawerButton: {
        width: "36px",
        padding: "0px",
        margin: "6px 0px 6px 6px",
    },
}));

export default function PersistentDrawerRight() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState('link');

    //TODO: backend replace demo data
    const demoLinks = ['Algebraic Closure', 'Brauwer Group', 'Celsius', 'Domain Adaptation']
    const demoTags = ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'd', 'a', 'b', 'c', 'd', 'a', 'b', 'c', 'd']
    
    //links, tags to be showed
    const [links, setLink] = React.useState(demoLinks);
    const [tags, setTag] = React.useState(demoTags);
    const [showingItem, setShowingItem] = React.useState(demoLinks)

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleMode = (updMode) => {
        setMode(updMode)
        setShowingItem((updMode === 'link')? links : tags)
    }

    return (
        <div 
            className={clsx(classes.root, {[classes.rootShift]: open,})}
        >
            <CssBaseline />
            <div className={classes.sidebarWrapper}>
                <IconButton
                    color="default"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    classes={{
                        root: classes.nopad,
                    }}
                    disableRipple={true}
                >
                    {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                    docked: classes.drawerPaperWrapper,
                }}
            >   
                <div style={{display: "flex"}}>
                    <IconButton
                        color={(mode === 'link') ? "inherit" : "default"}
                        onClick={() => handleMode('link')}
                        classes={{
                            root: classes.drawerButton,
                        }}
                        
                        disableRipple={true}
                    >
                        <LinkIcon />
                    </IconButton>
                    <IconButton
                        color={(mode === 'tag') ? "inherit" : "default"}
                        onClick={() => handleMode('tag')}
                        classes={{
                            root: classes.drawerButton,
                        }}
                        
                        disableRipple={true}
                    >
                        <LocalOfferOutlinedIcon />
                    </IconButton>
                </div> 
                <Divider style={{height: "3px"}}/>
                <div style={{flexGrow: 1, overflowY: "auto"}}>
                    <List disablePadding={true}>
                        {showingItem.map((text, index) => (
                            <>
                                <ListItem button key={index}>
                                    <ListItemText primary={(mode==='tag')? '# '+text : text} />
                                </ListItem>
                                <Divider />
                            </>
                        ))}                        
                    </List>
                </div>
                
            </Drawer>
            
        </div>
    );
}
