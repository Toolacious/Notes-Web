import React, { useContext } from "react";
import { filecontext } from "../../context/filetree";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles(() => ({
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
    const [valid, setValid] = React.useState(true);
    const [helper, setHelper] = React.useState("");

    const handleTitle = (val) => {
        setTitle(val);
        setValid(true);
    };

    const handleRename = () => {
        // check title validity
        if (!title) {
            setValid(false);
            setHelper("empty name!");
            return;
        }
        if (usernotes.findIndex((notes) => notes.title === title) !== -1) {
            setValid(false);
            setHelper("name existed!");
            return;
        }
        actions.rename(props.fileID, title);
        props.closeFunc();
    };

    return (
        <Dialog
            open={true}
            aria-labelledby={`form-dialog-title_${props.fileID}`}
        >
            <DialogTitle id={`form-dialog-title_${props.fileID}`}>
                New name
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    error={!valid}
                    helperText={!valid ? helper : ""}
                    margin="dense"
                    id={`renameBox_${props.fileID}`}
                    label="new name"
                    fullWidth
                    onChange={(e) => handleTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleRename();
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeFunc} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleRename} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}
