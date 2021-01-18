import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { filecontext } from "../../context/filetree";

const useStyles = makeStyles((theme) => ({
    titlebar: {
        flexGrow: 1,
        fontSize: "14px",
        margin: theme.spacing(1),
        outline: "none",
        padding: "1px 6px",
        borderRadius: "12px",
        borderColor: `${theme.palette.divider}`,
        "&:focus": {
            borderColor: theme.palette.text.primary,
        },
    },
}));

export default function SearchBox(ref) {
    const classes = useStyles();
    const { usernotes, actions } = useContext(filecontext);
    //TODO: backend replace demo data
    const demoResults = ["Algebraic Closure"];
    const [searchStr, setSearchStr] = useState("");
    const [showingItem, setShowingItem] = useState([]);

    //TODO: backend search, return [] if input is empty string
    const search = (e) => {
        setSearchStr(e.target.value);
        ref.children.current.focus();
    };

    useEffect(() => {
        if (searchStr) {
            if (searchStr.slice(0, 5) === "tags:") {
                let alltags = [];
                usernotes.forEach((e) => {
                    let { title, id, markdown } = e;
                    e.tags.forEach((ele) => {
                        if (ele === searchStr.slice(6)) {
                            console.log("success");
                            alltags.push({ title, id, markdown });
                        }
                    });
                });
                console.log("search tag");
                setShowingItem(alltags);
            } else {
                let allfiles = [];
                usernotes.forEach((e) => {
                    let { title, id, markdown } = e;
                    if (
                        e.markdown.includes(searchStr) ||
                        e.title.includes(searchStr)
                    ) {
                        allfiles.push({ title, id, markdown });
                    }
                });
                console.log("search files");
                setShowingItem(allfiles);
            }
        } else setShowingItem([]);

        return () => {};
    }, [searchStr]);

    return (
        <>
            <CssBaseline />
            <div style={{ display: "flex" }}>
                <input
                    ref={ref.children}
                    className={classes.titlebar}
                    placeholder="Search files or tags"
                    onChange={search}
                />
            </div>
            <Divider style={{ height: "3px" }} />
            <div style={{ flexGrow: 1, overflowY: "auto" }}>
                <List disablePadding={true}>
                    {showingItem.map((obj, index) => (
                        <>
                            <ListItem button key={index}>
                                <ListItemText
                                    onClick={() => {
                                        actions.open(obj.id);
                                    }}
                                    primary={obj.title}
                                />
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                </List>
            </div>
        </>
    );
}
