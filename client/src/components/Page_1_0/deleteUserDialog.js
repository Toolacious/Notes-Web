import React from "react";
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

export default function DeleteUserDialog(props) {
    const classes = useStyles();
    const { delFunc, closeFunc } = props.func;

    return (
        <Dialog
            open={props.open}
            aria-labelledby="alert-dialog-title"
            onClose={props.onClose}
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this account?"}
            </DialogTitle>
            <DialogActions>
                <Button
                    className={classes.dialogButton}
                    onClick={delFunc}
                    color="primary"
                >
                    Yes
                </Button>
                <Button
                    className={classes.dialogButton}
                    onClick={closeFunc}
                    color="primary"
                >
                    No
                </Button>
            </DialogActions>
        </Dialog>
    );
}
