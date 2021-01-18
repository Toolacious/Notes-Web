import React, { useContext, useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import { WrapText } from "@material-ui/icons";

import { filecontext } from "../../context/filetree";
import { AuthContext } from "../../routes/auth";
import { useMutation } from "@apollo/react-hooks";
import { ADDTAG_Mutation } from "../../graphql/addTag";
import { DELTAG_Mutation } from "../../graphql/delTag";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        listStyle: "none",
        margin: 0,
        height: "32px",
        overflowY: "auto",
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    titlebar: {
        flexGrow: 1,
        fontSize: "14px",
        margin: theme.spacing(0.5),
        outline: "none",
        padding: "1px 6px",
        borderRadius: "12px",
        borderColor: `${theme.palette.divider}`,
        "&:focus": {
            borderColor: theme.palette.text.primary,
        },
    },
}));

export default function TagBar() {
    const classes = useStyles();
    const { currentOpenFile, usernotes, setuserNotes } = useContext(
        filecontext
    );
    const context = useContext(AuthContext);
    const [addtag] = useMutation(ADDTAG_Mutation);
    const [deltag] = useMutation(DELTAG_Mutation);
    const [tag, setTag] = useState("");

    const [chipData, setChipData] = useState([]);
    useEffect(() => {
        if (currentOpenFile && usernotes) {
            setChipData(usernotes.find((e) => e.id === currentOpenFile).tags);
        }
        return () => {};
    }, [currentOpenFile, usernotes]);
    const updTag = (e) => {
        setTag(e.target.value);
    };

    const handleDelete = async (chipToDelete) => {
        try {
            let chips = chipData.filter(
                (data, index) => index !== chipToDelete
            );
            setChipData(chips);
            let newnotes = [...usernotes];
            newnotes
                .find((e) => e.id === currentOpenFile)
                .tags.splice(chipToDelete, 1);
            setuserNotes(newnotes);
            console.log("setusernote");
            await deltag({
                variables: {
                    id: currentOpenFile,
                    email: context.user.email,
                    index: chipToDelete,
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

    const newTag = async (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            try {
                console.log(tag);
                let newnotes = [...usernotes];
                newnotes.find((e) => e.id === currentOpenFile).tags.push(tag);
                setuserNotes(newnotes);
                setChipData([...chipData, tag]);
                await addtag({
                    variables: {
                        id: currentOpenFile,
                        email: context.user.email,
                        tag,
                    },
                });
                setTag("");
                e.target.value = "";
                //TODO: backend add tag
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <>
            <CssBaseline />
            <div className={classes.root}>
                {chipData.map((data, index) => {
                    return (
                        <li key={index}>
                            <Chip
                                size="small"
                                label={data}
                                onDelete={() => handleDelete(index)}
                                className={classes.chip}
                            />
                        </li>
                    );
                })}
                <input
                    className={classes.titlebar}
                    placeholder="New tags"
                    onChange={updTag}
                    onKeyDown={newTag}
                />
            </div>
        </>
    );
}
