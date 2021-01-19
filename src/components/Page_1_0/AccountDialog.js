import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";

import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { LOGOUT_Mutation } from "../../graphql/logout";
import { AuthContext } from "../../routes/auth";
import { getAccessToken, setAccessToken } from "../../accessToken";

//const emails = ['username@gmail.com', 'user02@gmail.com'];
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
        width: "256px",
        fontSize: "18px",
        textTransform: "none",
    },
    dialog: {},
}));

function SimpleDialog(props) {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const history = useHistory();
    const [logout] = useMutation(LOGOUT_Mutation);

    const { onClose, selectedValue, open, avatar_src } = props;

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
            <Button className={classes.dialogButton}>Change avatar</Button>
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
        </Dialog>
    );
}

export default function AccountDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div className={classes.headerAvatarWrapper}>
            <img
                className={classes.headerAvatar}
                src={props.src}
                alt="#"
                onClick={handleClickOpen}
            />
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                avatar_src={props.src}
            />
        </div>
    );
}
