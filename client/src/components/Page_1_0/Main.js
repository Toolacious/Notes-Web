import React, { useContext, useEffect } from "react";
import { filecontext } from "../../context/filetree";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import SaveDialog from "./SaveDialog";

import Markdown from "./Markdown";
import { useMutation } from "@apollo/react-hooks";
import { UPDNOTE_Mutation } from "../../graphql/updateNote";
import { AuthContext } from "../../routes/auth";

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
        height: "calc(100vh - 130px)",
        fontSize: "18px",
        padding: theme.spacing(2, 4),
        resize: "none",
        border: "none",
        outline: "none",
        overflow: "auto",
    },
    outputStyle: {
        width: "100%",
        height: "calc(100vh - 130px)",
        fontSize: "18px",
        textAlign: "left",
        backgroundColor: "white",
        padding: theme.spacing(2, 4),
        overflow: "auto",
    },
}));

export default function Main() {
    const [updNote] = useMutation(UPDNOTE_Mutation);
    const {
        user: { email },
    } = useContext(AuthContext);
    const classes = useStyles();
    const theme = useTheme();
    const { usernotes, openFiles, currentOpenFile, actions } = useContext(
        filecontext
    );

    const [mode, setMode] = React.useState("main");
    const [pageNum, setPageNum] = React.useState(0);
    const [pages, setPages] = React.useState([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialogFunctions, setDialogFunctions] = React.useState({});

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
        if (pages[chipToDelete].unsaved) {
            setOpenDialog(true);
            setDialogFunctions({
                updFunc: async (e) => {
                    await save(id);
                    deletePage(id);
                    setOpenDialog(false);
                },
                closeFunc: () => {
                    deletePage(id);
                    setOpenDialog(false);
                },
            });
        } else {
            deletePage(id);
        }
    };
    const deletePage = (id) => {
        let chipToDelete = openFiles.indexOf(id);

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

    const save = async (fileID) => {
        let currentPageIndex = openFiles.indexOf(fileID);
        const { id, title, markdown, tags, unsaved } = pages[currentPageIndex];
        if (unsaved) {
            try {
                const regex = /\[\[(\w*?)\]\]/gm;
                const str = markdown;
                let g;
                let links = [];
                while ((g = regex.exec(str)) !== null) {
                    // This is necessary to avoid infinite loops with zero-width matches
                    if (g.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }

                    // The result can be accessed through the `m`-variable.
                    g.forEach((match, groupIndex) => {
                        console.log(
                            `Found match, group ${groupIndex}: ${match}`
                        );
                        if (groupIndex === 1) links.push(match);
                    });
                }
                let newPages = [...pages];
                newPages[currentPageIndex].links = links;
                actions.save(fileID, {
                    id,
                    title,
                    markdown,
                    tags,
                    links,
                });
                newPages[currentPageIndex].unsaved = false;
                setPages(newPages);
                await updNote({
                    variables: { id, email, markdown, links },
                });
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            {openFiles.length === 0 ? (
                <div className={classes.mainWindowWrapper}>No Page</div>
            ) : (
                <>
                    <div className={classes.pageBar}>
                        {openFiles.map((fileID, index) => {
                            return (
                                <li key={index}>
                                    <Chip
                                        size="small"
                                        label={
                                            usernotes.find(
                                                (e) => e.id === fileID
                                            ).title
                                        }
                                        disableRipple={true}
                                        onClick={(e) => {
                                            actions.open(fileID);
                                            document
                                                .getElementsByClassName(
                                                    "input"
                                                )[0]
                                                .focus();
                                        }}
                                        onDelete={() => handleDelete(fileID)}
                                        className={clsx(classes.chip, {
                                            [classes.chipFocus]:
                                                fileID === currentOpenFile,
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
                            {pageNum === openFiles.length &&
                            pages[openFiles.indexOf(currentOpenFile)]
                                .unsaved ? (
                                <IconButton
                                    id="saveMain"
                                    onClick={() => save(currentOpenFile)}
                                    classes={{
                                        root: classes.nopad,
                                    }}
                                    disableRipple={true}
                                >
                                    <SaveIcon />
                                </IconButton>
                            ) : null}
                            {openDialog ? (
                                <SaveDialog func={dialogFunctions}></SaveDialog>
                            ) : null}
                        </div>
                        {mode === "main" || mode === "mix" ? (
                            <Paper
                                elevation={0}
                                className={classes.mainWindow}
                                style={mode === "main" ? { width: "100%" } : {}}
                            >
                                <textarea
                                    autoFocus
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
