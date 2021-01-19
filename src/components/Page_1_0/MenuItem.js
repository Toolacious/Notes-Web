import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    menubarButton: {
        fontSize: "14px",
        paddingTop: "0px",
        paddingBottom: "0px",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        flexShrink: 0,

        textTransform: "none",
    },
    menuItem: {
        fontSize: "14px",
        width: "128px",
    },
    disabledMenuItem: {
        cursor: "default",
        color: "rgb(180, 180, 180)!important",
        backgroundColor: "white!important",
    },
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
            <Button
                className={classes.menubarButton}
                aria-controls="name"
                aria-haspopup="true"
                onClick={handleClick}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                    }
                }}
            >
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
                onClose={() => {
                    setAnchorEl(null);
                }}
            >
                {sections.map((section) => (
                    <MenuItem
                        className={clsx(classes.menuItem, {
                            [classes.disabledMenuItem]:
                                section.name === "Save" &&
                                !document.getElementById("saveMain"),
                        })}
                        onClick={() => {
                            section.func();
                            setAnchorEl(null);
                        }}
                    >
                        {section.name}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
