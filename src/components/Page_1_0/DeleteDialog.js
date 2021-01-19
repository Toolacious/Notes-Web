import React, { useContext } from "react";
import PropTypes from "prop-types";
import { filecontext } from "../../context/filetree";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
    dialogButton: {
        width: "128px",
        fontSize: "18px",
        textTransform: "none",
    },
    dialog: {},
}));

export default function DeleteDialog(props) {
    const classes = useStyles();
    const { actions } = useContext(filecontext);

    return (
        <Dialog
            open={true}
            aria-labelledby={`delete-dialog-title_${props.fileID}`}
        >
            <DialogTitle id={`delete-dialog-title_${props.fileID}`}>
                {`Delete ${props.title}?`}
            </DialogTitle>
            <DialogActions>
                <Button
                    className={classes.dialogButton}
                    onClick={() => {
                        actions.delete(props.fileID);
                        props.closeFunc();
                    }}
                    color="primary"
                >
                    Yes
                </Button>
                <Button
                    className={classes.dialogButton}
                    onClick={props.closeFunc}
                    color="primary"
                >
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
}
