import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import LinkIcon from "@material-ui/icons/Link";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { filecontext } from "../../context/filetree";
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
        borderLeft: `1px solid ${theme.palette.divider}`,
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
        marginLeft: drawerWidth,
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
    drawerButton: {
        width: "36px",
        padding: "0px",
        margin: "6px 0px 6px 6px",
    },
}));

export default function PersistentDrawerRight() {
    const classes = useStyles();
    const { currentOpenFile, usernotes, actions } = useContext(filecontext);
    const { setSearchStr, setOpen, setMode } = useContext(mainContext);
    const [r_open, setr_open] = useState(false);
    const [r_mode, setr_Mode] = useState("link");

    //links, tags to be showed
    const [inlinks, setInLink] = useState([]);
    const [outlinks, setOutLink] = useState([]);
    useEffect(() => {
        try {
            if (currentOpenFile) {
                let title = usernotes.find((e) => e.id === currentOpenFile)
                    .title;
                let inLinks = {};
                let outLinks = {};
                let tmp = usernotes.find((e) => e.id === currentOpenFile).links;
                usernotes.forEach((e) => {
                    e.links.forEach((ele) => {
                        if (ele === title) {
                            if (!Object.keys(inLinks).includes(e.title)) {
                                inLinks[e.title] = e.id;
                            }
                        }
                    });
                });
                setInLink(Object.entries(inLinks));
                usernotes.forEach((e) => {
                    if (tmp.includes(e.title)) {
                        outLinks[e.title] = e.id;
                    }
                });
                setOutLink(Object.entries(outLinks));
            }
        } catch (error) {
            console.log(error);
        }
        return () => {};
    }, [usernotes, currentOpenFile]);

    const [tags, setTag] = useState([]);

    useEffect(() => {
        let alltags = {};
        usernotes.forEach((e) => {
            e.tags.forEach((ele) => {
                if (Object.keys(alltags).includes(ele)) {
                    alltags[ele] += 1;
                } else {
                    alltags[ele] = 1;
                }
            });
        });
        setTag(Object.entries(alltags));
        return () => {};
    }, [usernotes]);
    const [showingItem, setShowingItem] = useState([]);
    useEffect(() => {
        setShowingItem(r_mode === "link" ? inlinks : tags);
        return () => {};
    }, [r_mode, inlinks, outlinks, tags]);

    const handleDrawerOpen = () => {
        setr_open(!r_open);
    };

    const handleMode = (updMode) => {
        setr_Mode(updMode);
    };

    const handleSearch = (tag) => {
        setSearchStr("tags: " + tag);
        setOpen(true);
        setMode("search");
    };

    const handleLink = (id) => {
        actions.open(id);
        if (document.getElementsByClassName("input")[0])
            document.getElementsByClassName("input")[0].focus();
    };

    return (
        <div className={clsx(classes.root, { [classes.rootShift]: r_open })}>
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
                    {r_open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>

            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={r_open}
                classes={{
                    paper: classes.drawerPaper,
                    docked: classes.drawerPaperWrapper,
                }}
            >
                <div style={{ display: "flex" }}>
                    <IconButton
                        color={r_mode === "link" ? "inherit" : "default"}
                        onClick={() => handleMode("link")}
                        classes={{
                            root: classes.drawerButton,
                        }}
                        disableRipple={true}
                    >
                        <LinkIcon />
                    </IconButton>
                    <IconButton
                        color={r_mode === "tag" ? "inherit" : "default"}
                        onClick={() => handleMode("tag")}
                        classes={{
                            root: classes.drawerButton,
                        }}
                        disableRipple={true}
                    >
                        <LocalOfferOutlinedIcon />
                    </IconButton>
                </div>
                <Divider style={{ height: "3px" }} />
                <div style={{ flexGrow: 1, overflowY: "auto" }}>
                    <List disablePadding={true}>
                        {showingItem.map((text, index) => (
                            <>
                                <ListItem
                                    button
                                    key={index}
                                    onClick={() => {
                                        r_mode === "tag"
                                            ? handleSearch(text[0])
                                            : handleLink(text[1]);
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            r_mode === "tag"
                                                ? "# " + text[0]
                                                : text[0]
                                        }
                                    />
                                    <ListItemText
                                        primary={
                                            r_mode === "tag" ? text[1] : ""
                                        }
                                        style={{ textAlign: "right" }}
                                    />
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
