import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    menubarButton: {
        fontSize: "14px",
        paddingTop: "0px",
        paddingBottom: "0px",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        flexShrink: 0,

        textTransform: "none"
    },
    menuItem: {
        fontSize: "14px",
        width: "128px",
    }
}));

export default function SimpleMenu(props) {
    const classes = useStyles();
    const { name, sections } = props.menu;
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            <Button className={classes.menubarButton} aria-controls="name" aria-haspopup="true" onClick={handleClick}>
                {name}
            </Button>
            <Menu
                id="name"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={()=>{setAnchorEl(null);}}
            >   
                {sections.map((section) => (
                    <MenuItem 
                        className={classes.menuItem}
                        onClick={() => {
                            section.func();
                            setAnchorEl(null);
                        }}
                    >{section.name}</MenuItem>
                ))}
            </Menu>
        </div>
    );
}
/*
 aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
 <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
 */