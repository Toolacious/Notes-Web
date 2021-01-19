import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Crop from "./crop";

const useStyles = makeStyles((theme) => ({
    avatar: {
        height: "128px",
        width: "128px",
    },
    headerAvatar: {
        height: "48px",
        width: "48px",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
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
        width: "50%",
        fontSize: "18px",
        textTransform: "none",
    },
    dialog: {},
}));

export default function UploadDialog(props) {
    const classes = useStyles();
    const { onClose, open } = props;

    return (
        <Dialog
            maxWidth="xl"
            open={open}
            onClose={onClose}
            aria-labelledby="avatarUpload"
        >
            <DialogTitle id="avatarUpload">Upload Avatar</DialogTitle>
            <Crop />
        </Dialog>
    );
}
