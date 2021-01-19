import React, { useContext } from "react";
import PropTypes from "prop-types";
import { filecontext } from "../../context/filetree";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
    dialogButton: {
        width: "256px",
        fontSize: "18px",
        textTransform: "none",
    },
    dialog: {},
}));

export default function RenameDialog(props) {
    const classes = useStyles();
    const { usernotes, actions } = useContext(filecontext);
    const [title, setTitle] = React.useState("");

    const handleCreate = () => {
        // check title validity
        if (!title) {
            console.log("Empty");
            return;
        }
        if (usernotes.findIndex((notes) => notes.title === title) !== -1) {
            console.log("Repeat");
            return;
        }
        actions.new(title);
        props.closeFunc();
    };

    return (
        <Dialog open={true} aria-labelledby="name-dialog-title">
            <DialogTitle id="name-dialog-title">File name</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="createBox"
                    label="new name"
                    fullWidth
                    onChange={(e) => setTitle(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeFunc} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCreate} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
