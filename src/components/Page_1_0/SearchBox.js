import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { filecontext } from "../../context/filetree";
import { mainContext } from "../../context/mainContext";

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
    linksIOTitle: {
        height: "28px",
        padding: theme.spacing(2, 0),
    },
}));

export default function SearchBox() {
    const classes = useStyles();
    const { usernotes, actions } = useContext(filecontext);
    const { searchStr, setSearchStr } = useContext(mainContext);
    const [tagItem, setTagItem] = useState([]);
    const [titleItem, setTitleItem] = useState([]);
    const [mdItem, setMdItem] = useState([]);
    const [openTitle, setOpenTitle] = useState(false);
    const [openMd, setOpenMd] = useState(false);

    const autoFocus = () => {
        if (document.getElementsByClassName("input")[0]) {
            document.getElementsByClassName("input")[0].focus();
        }
    };

    const search = (e) => {
        setSearchStr(e.target.value);
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
                setTagItem(alltags);
            } else {
                let titlefiles = [];
                let mdfiles = [];
                usernotes.forEach((e) => {
                    let { title, id, markdown } = e;
                    if (e.title.includes(searchStr)) {
                        titlefiles.push({ title, id, markdown });
                    }
                    if (e.markdown.includes(searchStr)) {
                        mdfiles.push({ title, id, markdown });
                    }
                });
                console.log("search files");
                setTitleItem(titlefiles);
                setMdItem(mdfiles);
            }
        } else {
            setTitleItem([]);
            setMdItem([]);
        }

        return () => {};
    }, [searchStr]);

    return (
        <>
            <CssBaseline />
            <div style={{ display: "flex" }}>
                <input
                    id="searchbox"
                    className={classes.titlebar}
                    placeholder="Search files or tags"
                    onChange={search}
                    value={searchStr}
                />
            </div>
            <Divider style={{ height: "3px" }} />
            <div style={{ flexGrow: 1, overflowY: "auto" }}>
                <List disablePadding={true}>
                    {searchStr.slice(0, 5) === "tags:" ? (
                        tagItem.map((obj, index) => (
                            <>
                                <ListItem
                                    button
                                    key={index}
                                    onClick={() => {
                                        actions.open(obj.id);
                                        autoFocus();
                                    }}
                                >
                                    <ListItemText primary={obj.title} />
                                </ListItem>
                                <Divider />
                            </>
                        ))
                    ) : (
                        <>
                            <ListItem
                                button
                                key="titleMatched"
                                onClick={() => setOpenTitle(!openTitle)}
                                className={classes.linksIOTitle}
                            >
                                {openTitle ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                )}
                                <ListItemText primary={"File"} />
                            </ListItem>
                            <Divider />
                            {openTitle
                                ? titleItem.map((obj, index) => (
                                      <>
                                          <ListItem
                                              button
                                              key={index}
                                              onClick={() => {
                                                  actions.open(obj.id);
                                                  autoFocus();
                                              }}
                                          >
                                              <ListItemText
                                                  primary={obj.title}
                                              />
                                          </ListItem>
                                          <Divider />
                                      </>
                                  ))
                                : null}
                            <ListItem
                                button
                                key="mdMatched"
                                onClick={() => setOpenMd(!openMd)}
                                className={classes.linksIOTitle}
                            >
                                {openMd ? (
                                    <ExpandLessIcon />
                                ) : (
                                    <ExpandMoreIcon />
                                )}
                                <ListItemText primary={"Content"} />
                            </ListItem>
                            <Divider />
                            {openMd
                                ? mdItem.map((obj, index) => (
                                      <>
                                          <ListItem
                                              button
                                              key={index}
                                              onClick={() => {
                                                  actions.open(obj.id);
                                                  autoFocus();
                                              }}
                                          >
                                              <ListItemText
                                                  primary={obj.title}
                                              />
                                          </ListItem>
                                          <Divider />
                                      </>
                                  ))
                                : null}
                        </>
                    )}
                </List>
            </div>
        </>
    );
}
