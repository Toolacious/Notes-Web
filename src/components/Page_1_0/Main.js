import React from "react";
import clsx from 'clsx';
import PropTypes from "prop-types";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { WrapText } from '@material-ui/icons';
import Markdown from "./Markdown";

const pageBarHeight = 24
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    pageBar: {
        display: 'flex',
        flexWrap: "wrap",
        alignItems: "center",
        listStyle: 'none',
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
        '&:focus': {
            backgroundColor: "white",
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    },
    chipText:{
        width: theme.spacing(12),
        textAlign: "left",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    chipFocus: {
        backgroundColor: "white",
        borderBottom: "1px solid white!important",
        '&:hover': {
            backgroundColor: "white",
        },
    },
    markdown: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
    },
    mainWindowWrapper: {
        display: "flex",
        flexGrow: 1,
        position: "relative",
    },
    mainWindow:{
        display: "flex",
        flexGrow: 1,
        borderRadius: "0px",
    },
    viewWindow:{
        display: "flex",
        flexGrow: 1,
        borderRadius: "0px",
    },
    modeButtonWrapper:{
        display: "flex",
        position: "absolute",
        top: "6px",
        right: "6px",
        borderRadius: "16px",
        border: "1px solid black",
    },
    nopad:{
        padding: "0px",
        margin: "0px 3px",
    },
}));

export default function Main(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { posts, title } = props;

    const [mode, setMode] = React.useState('main')
    const [currentPageIndex, setcurrentPageIndex] = React.useState(0)

    //TODO: backend replace demo data
    const demoTags = ['Angular', 'jQuery', 'Polymer', 'React']
    const [chipData, setChipData] = React.useState(demoTags);

    const handleDelete = (chipToDelete) => {
        let chips = chipData.filter((data, index) => index !== chipToDelete);
        if(chips.length === currentPageIndex){
            setcurrentPageIndex(currentPageIndex - 1)
        }
        setChipData(chips);

        //TODO: backend delete tag
    };

    const handleMode = (updMode) => {
        setMode(updMode)
    }

    const handleCurrentPageIndex = (updIndex) => {
        setcurrentPageIndex(updIndex)
        console.log(currentPageIndex)
    }

    return (
        <div className={classes.root}>  
            <CssBaseline />
            <div className={classes.pageBar}>
                {chipData.map((data, index) => {
                    return (
                        <li key={index}>
                            <Chip
                                size="small"
                                label={data}
                                disableRipple={true}
                                onClick={() => handleCurrentPageIndex(index)}
                                onDelete={() => handleDelete(index)}
                                className={clsx(classes.chip, {[classes.chipFocus]: (index === currentPageIndex)})}
                                classes= {{
                                    root: classes.chipRoot,
                                    label: classes.chipText,
                                }}
                            />
                        </li>
                    );
                })}
                <div style={{
                    flexGrow: 1, 
                    height: pageBarHeight,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}></div>
            </div>
            <div className={classes.mainWindowWrapper}>
                <div className={classes.modeButtonWrapper}>
                    <IconButton
                        color={(mode === 'main') ? "inherit" : "default"}
                        onClick={() => handleMode('main')}
                        classes={{
                            root: classes.nopad,
                        }}
                        disableRipple={true}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color={(mode === 'mix') ? "inherit" : "default"}
                        onClick={() => handleMode('mix')}
                        classes={{
                            root: classes.nopad,
                        }}
                        disableRipple={true}
                    >
                        <VisibilityIcon />
                    </IconButton>
                </div>
                {(mode === "main" || mode === "mix")?
                    <Paper 
                        elevation={0}
                        className={classes.mainWindow}
                    >

                    </Paper> : <></>
                }
                {(mode === "mix")?
                    <Divider
                        orientation="vertical"
                    >

                    </Divider>: null
                }
                {(mode === "view" || mode === "mix") ? 
                    <Paper
                        elevation={0}
                        className={classes.viewWindow}
                    >

                    </Paper> : <></>
                }
                
            </div>
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