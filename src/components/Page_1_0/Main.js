import React, { useContext, useCallback, useEffect, useState } from "react";
import { filecontext } from "../../context/filetree";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { AddShoppingCartRounded, WrapText } from "@material-ui/icons";
import Markdown from "./Markdown";

const pageBarHeight = 24;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    pageBar: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        listStyle: "none",
        margin: 0,
        height: pageBarHeight,
        overflowY: "auto",

        backgroundColor: "#E0E0E0",
    },
    chip: {
        margin: "0px",
        borderRadius: "0px",
        borderRight: `2px solid ${theme.palette.divider}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    chipRoot: {
        transform: "none",
        "&:focus": {
            backgroundColor: "white",
        },
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    },
    chipText: {
        width: theme.spacing(12),
        textAlign: "left",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    chipFocus: {
        backgroundColor: "white",
        borderBottom: "1px solid white!important",
        "&:hover": {
            backgroundColor: "white",
        },
    },
    markdown: {
        padding: theme.spacing(3, 0),
    },
    mainWindowWrapper: {
        display: "flex",
        flexGrow: 1,
        position: "relative",
    },
    mainWindow: {
        display: "flex",
        width: "50%",
        borderRadius: "0px",
        overflow: "auto",
    },
    viewWindow: {
        display: "flex",
        width: "50%",
        borderRadius: "0px",
        overflow: "auto",
    },
    modeButtonWrapper: {
        display: "flex",
        position: "absolute",
        top: "6px",
        right: "6px",
        borderRadius: "16px",
        border: "1px solid black",
    },
    nopad: {
        padding: "0px",
        margin: "0px 3px",
    },
    inputStyle: {
        width: "100%",
        height: "100%",
        fontSize: "18px",
        padding: theme.spacing(2, 4),
        resize: "none",
        border: "none",
        outline: "none",
    },
    outputStyle: {
        width: "100%",
        height: "100%",
        fontSize: "18px",
        textAlign: "left",
        backgroundColor: "white",
        padding: theme.spacing(2, 4),
    },
}));

export default function Main() {
    const classes = useStyles();
    const theme = useTheme();
    const {
        usernotes,
        openFiles,
        currentOpenFile,
        setuserNotes,
        setopenFiles,
        setcurrentOpenFile,
        actions,
    } = useContext(filecontext);

    const [mode, setMode] = React.useState("main");
    const [pageNum, setPageNum] = React.useState(0);
    const [pages, setPages] = React.useState([]);

    // add page in frontend
    const addPage = (node) => {
        setPages([...pages, node]);
        setPageNum(pageNum + 1);
        console.log(pages);
    };

    useEffect(() => {
        if (openFiles.length > pageNum) {
            let fileID = openFiles[openFiles.length - 1];
            let node = Object.assign(
                { unsaved: false },
                usernotes.find((e) => e.id === fileID)
            );
            console.log(node);
            addPage(node);
        }
    }, [openFiles]);

    // delete page
    const handleDelete = (id) => {
        let chipToDelete = openFiles.indexOf(id);
        console.log(chipToDelete);
        if (pages[chipToDelete].unsaved) {
            console.log("Unsaved");
        }

        // set backend openFiles
        actions.close(id);

        // set frontend pages
        let updPages = pages.filter((data, index) => index !== chipToDelete);
        setPages(updPages);

        // set pageNum
        setPageNum(pageNum - 1);
    };

    const handleMode = (updMode) => {
        setMode(updMode);
    };

    const handleContentData = (val) => {
        let currentPageIndex = openFiles.indexOf(currentOpenFile);
        let updPages = [...pages];
        updPages[currentPageIndex].markdown = val;
        updPages[currentPageIndex].unsaved = true;
        setPages(updPages);
    };

    const save = () => {
        let currentPageIndex = openFiles.indexOf(currentOpenFile);
        actions.save(currentOpenFile, pages[currentPageIndex].markdown);
        let updPages = [...pages];
        updPages[currentPageIndex].unsaved = false;
        setPages(updPages);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            {openFiles.length === 0 ? (
                <div className={classes.mainWindowWrapper}>No Page</div>
            ) : (
                <>
                    <div className={classes.pageBar}>
                        {pages.map((page, index) => {
                            return (
                                <li key={index}>
                                    <Chip
                                        size="small"
                                        label={page.title}
                                        disableRipple={true}
                                        onClick={() => {
                                            actions.open(page.id);
                                        }}
                                        onDelete={() => handleDelete(page.id)}
                                        className={clsx(classes.chip, {
                                            [classes.chipFocus]:
                                                page.id === currentOpenFile,
                                        })}
                                        classes={{
                                            root: classes.chipRoot,
                                            label: classes.chipText,
                                        }}
                                    />
                                </li>
                            );
                        })}
                        <div
                            style={{
                                flexGrow: 1,
                                height: pageBarHeight,
                                borderBottom: `1px solid ${theme.palette.divider}`,
                            }}
                        ></div>
                    </div>
                    <div className={classes.mainWindowWrapper}>
                        <div className={classes.modeButtonWrapper}>
                            <IconButton
                                color={mode === "main" ? "inherit" : "default"}
                                onClick={() => handleMode("main")}
                                classes={{
                                    root: classes.nopad,
                                }}
                                disableRipple={true}
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                color={mode === "mix" ? "inherit" : "default"}
                                onClick={() => handleMode("mix")}
                                classes={{
                                    root: classes.nopad,
                                }}
                                disableRipple={true}
                            >
                                <VisibilityIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => save()}
                                classes={{
                                    root: classes.nopad,
                                }}
                                disableRipple={true}
                            >
                                <SaveIcon />
                            </IconButton>
                        </div>
                        {mode === "main" || mode === "mix" ? (
                            <Paper
                                elevation={0}
                                className={classes.mainWindow}
                                style={mode === "main" ? { width: "100%" } : {}}
                            >
                                <textarea
                                    className={`input ${classes.inputStyle}`}
                                    value={
                                        pageNum === openFiles.length
                                            ? pages[
                                                  openFiles.indexOf(
                                                      currentOpenFile
                                                  )
                                              ].markdown
                                            : ""
                                    }
                                    onChange={(e) => {
                                        handleContentData(e.target.value);
                                    }}
                                ></textarea>
                            </Paper>
                        ) : (
                            <></>
                        )}
                        {mode === "mix" ? (
                            <Divider orientation="vertical"></Divider>
                        ) : null}
                        {mode === "view" || mode === "mix" ? (
                            <Paper
                                elevation={0}
                                className={classes.viewWindow}
                                style={mode === "view" ? { width: "100%" } : {}}
                            >
                                <Markdown
                                    className={`input ${classes.outputStyle}`}
                                >
                                    {pageNum === openFiles.length
                                        ? pages[
                                              openFiles.indexOf(currentOpenFile)
                                          ].markdown
                                        : ""}
                                </Markdown>
                            </Paper>
                        ) : (
                            <></>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

Main.propTypes = {
    posts: PropTypes.array,
    title: PropTypes.string,
};

/*
{posts.map((post) => (
                <Markdown
                    className={classes.markdown}
                    key={post.substring(0, 40)}
                >
                    {post}
                </Markdown>
            ))} */
//<Markdown style={outputStyle}>{markdown}</Markdown>
