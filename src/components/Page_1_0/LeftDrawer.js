import React, { useState, useContext } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SearchIcon from "@material-ui/icons/Search";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { TabRounded } from "@material-ui/icons";

import SearchBox from "./SearchBox";
import FolderTree from "./FolderTree";
import { mainContext } from "../../context/mainContext";

const sidebarWidth = 32;
const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
    root: {
        width: sidebarWidth,
        display: "flex",
    },
    sidebarWrapper: {
        width: sidebarWidth,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    nopad: {
        padding: "0px",
        margin: "6px 0px",
    },
    rootShift: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    drawer: {
        flexShrink: 0,
    },
    drawerPaperWrapper: {
        position: "relative",
    },
    drawerPaper: {
        position: "absolute",
        top: "0px",
        right: sidebarWidth,
        width: drawerWidth,
        bottom: "0px",
    },
}));

export default function PersistentDrawerLeft() {
    const classes = useStyles();
    const theme = useTheme();
    const { open, setOpen, mode, setMode } = useContext(mainContext);
    // const [open, setOpen] = useState(false);
    // const [mode, setMode] = useState("search");
    const [graphMode, setGraph] = useState(false);

    const handleMode = (updMode) => {
        setMode(updMode);
        if (!open) {
            setOpen(true);
        }
        if (open && updMode === mode) {
            setOpen(false);
        }
    };

    const handleGraphMode = () => {
        setGraph(!graphMode);
    };

    return (
        <div className={clsx(classes.root, { [classes.rootShift]: open })}>
            <CssBaseline />
            <div className={classes.sidebarWrapper}>
                <IconButton
                    color={mode === "search" && open ? "inherit" : "default"}
                    aria-label="open drawer"
                    onClick={() => handleMode("search")}
                    classes={{
                        root: classes.nopad,
                    }}
                    disableRipple={true}
                >
                    <SearchIcon />
                </IconButton>
                <IconButton
                    color={mode === "file" && open ? "inherit" : "default"}
                    aria-label="open drawer"
                    onClick={() => handleMode("file")}
                    classes={{
                        root: classes.nopad,
                    }}
                    disableRipple={true}
                >
                    <FolderOutlinedIcon />
                </IconButton>
                <IconButton
                    color={graphMode ? "inherit" : "default"}
                    aria-label="open drawer"
                    onClick={handleGraphMode}
                    classes={{
                        root: classes.nopad,
                    }}
                    disableRipple={true}
                >
                    <DeviceHubIcon />
                </IconButton>
            </div>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                    docked: classes.drawerPaperWrapper,
                }}
            >
                {mode === "search" ? (
                    <SearchBox></SearchBox>
                ) : (
                    <FolderTree></FolderTree>
                )}
            </Drawer>
        </div>
    );
}
