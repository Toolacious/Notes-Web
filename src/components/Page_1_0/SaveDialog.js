import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { LOGOUT_Mutation } from "../../graphql/logout";
import { filecontext } from "../../context/filetree";
import { AuthContext } from "../../routes/auth";
import { getAccessToken, setAccessToken } from "../../accessToken";

//const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles((theme) => ({
    dialogButton: {
        width: "256px",
        fontSize: "18px",
        textTransform: "none",
    },
    dialog: {},
}));

export default function SaveDialog(props) {
    const classes = useStyles();
    const { updFunc, closeFunc } = props.func;

    return (
        <Dialog
            className={classes.dialog}
            aria-labelledby="save-dialog-title"
            open={true}
        >
            <DialogTitle id="save-dialog-title">Save File?</DialogTitle>
            <Button className={classes.dialogButton} onClick={updFunc}>
                Yes
            </Button>
            <Button className={classes.dialogButton} onClick={closeFunc}>
                No
            </Button>
        </Dialog>
    );
}
