import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { LOGOUT_Mutation } from "../../graphql/logout";
import { DELUSER_Mutation } from "../../graphql/deleteUser";
import { AuthContext } from "../../routes/auth";
import { getAccessToken, setAccessToken } from "../../accessToken";

import UploadDialog from "./UploadDialog";
import DeleteUserDialog from "./deleteUserDialog";

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: "128px",
        width: "128px",
        borderRadius: "50%",
    },
    headerAvatar: {
        height: "48px",
        width: "48px",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        borderRadius: "50%",
    },
    headerAvatarWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    avatarWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: theme.spacing(3),
    },
    dialogButton: {
        width: "256px",
        fontSize: "18px",
        textTransform: "none",
    },
    deleteButton: {
        width: "256px",
        fontSize: "18px",
        textTransform: "none",
        color: "red",
    },
    dialog: {},
}));

function SimpleDialog(props) {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const history = useHistory();
    const [logout] = useMutation(LOGOUT_Mutation);

    const { onClose, onOpen, selectedValue, open, avatar_src, func } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    return (
        <Dialog
            className={classes.dialog}
            onClose={handleClose}
            aria-labelledby="account-dialog-title"
            open={open}
        >
            <DialogTitle id="account-dialog-title">Account</DialogTitle>
            <div className={classes.avatarWrapper}>
                <img
                    className={classes.avatar}
                    src={avatar_src}
                    alt="avatar"
                ></img>
            </div>
            <Button onClick={onOpen} className={classes.dialogButton}>
                Change avatar
            </Button>
            <Button
                className={classes.dialogButton}
                onClick={async (e) => {
                    e.preventDefault();
                    await logout();
                    setAccessToken("");
                    if (!getAccessToken()) {
                        history.push("/");
                        context.logout();
                    }
                }}
            >
                Log out
            </Button>
            <Button className={classes.deleteButton} onClick={func}>
                Delete User
            </Button>
        </Dialog>
    );
}

export default function AccountDialog(props) {
    const context = useContext(AuthContext);
    const classes = useStyles();
    const history = useHistory();
    const [logout] = useMutation(LOGOUT_Mutation);
    const [open, setOpen] = useState(false);
    const [delOpen, setDelOpen] = useState(false);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(0);
    const [delUser] = useMutation(DELUSER_Mutation);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    const handleUploadClose = () => {
        setUploadOpen(false);
    };

    const closeFunc = () => {
        setDelOpen(false);
        handleClickOpen();
    };

    const delFunc = async (e) => {
        e.preventDefault();
        await delUser({ variables: { email: context.user.email } });
        await logout();
        setAccessToken("");
        if (!getAccessToken()) {
            history.push("/");
            context.logout();
        }
    };

    return (
        <div className={classes.headerAvatarWrapper}>
            <img
                className={classes.headerAvatar}
                src={props.src}
                alt="#"
                onClick={handleClickOpen}
            />
            <DeleteUserDialog
                open={delOpen}
                func={{ delFunc, closeFunc }}
                onClose={closeFunc}
            />
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                onOpen={() => {
                    handleClose();
                    setUploadOpen(true);
                }}
                func={() => {
                    handleClose();
                    setDelOpen(true);
                }}
                avatar_src={props.src}
            />
            <UploadDialog
                open={uploadOpen}
                onClose={() => {
                    handleUploadClose();
                    handleClickOpen();
                }}
            />
        </div>
    );
}
