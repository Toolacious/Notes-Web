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

export default function SaveDialog(props) {
    const classes = useStyles();
    const { updFunc, closeFunc } = props.func;

    return (
        <Dialog open={true} aria-labelledby="save-dialog-title">
            <DialogTitle id="save-dialog-title">Save File?</DialogTitle>
            <DialogActions>
                <Button
                    className={classes.dialogButton}
                    onClick={updFunc}
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
