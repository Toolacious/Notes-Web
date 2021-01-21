import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import SimpleMenu from "./MenuItem";
import AccountDialog from "./AccountDialog";
import NewDialog from "./NewDialog";
import icon from "../../icons/icon.jpg";
import user from "../../icons/avatar.jpg";
import { AvatarContext } from "../../context/avatarContext";
import titleImg from "../../icons/title.jpg";

const useStyles = makeStyles((theme) => ({
    headerWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "nowrap",
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.drawer + 1,
    },
    icon: {
        height: "48px",
        width: "48px",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        borderRadius: "50%",
    },
    mainWrapper: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    titlebar: {
        fontSize: "20px",
        height: "48px",
        border: "1px transparent",
    },
    titleImg: {
        maxHeight: "48px",
        objectFit: "contain",
    },
    menubar: {
        minHeight: "0px",
        padding: "0px",
        overflowX: "auto",
    },
}));

export default function Header() {
    const classes = useStyles();
    const [openNewDialog, setOpenNewDialog] = React.useState(false);
    const { avatar } = useContext(AvatarContext);

    const file_menu = {
        name: "File",
        sections: [
            {
                name: "New",
                func: () => {
                    setOpenNewDialog(true);
                },
            },
            {
                name: "Save",
                func: () => {
                    let saveButton = document.getElementById("saveMain");
                    if (saveButton) {
                        saveButton.click();
                    }
                },
            },
        ],
    };

    return (
        <React.Fragment>
            <Box className={classes.headerWrapper}>
                <img className={classes.icon} src={icon} alt="#" />
                <Box className={classes.mainWrapper}>
                    <div className={classes.titlebar}>
                        <img src={titleImg} className={classes.titleImg} />
                    </div>
                    <Toolbar
                        component="nav"
                        variant="dense"
                        className={classes.menubar}
                    >
                        <SimpleMenu menu={file_menu}></SimpleMenu>
                        {openNewDialog ? (
                            <NewDialog
                                closeFunc={() => {
                                    setOpenNewDialog(false);
                                }}
                            ></NewDialog>
                        ) : null}
                    </Toolbar>
                </Box>
                <IconButton style={{ display: "none" }}>
                    <SettingsIcon fontSize="large" />
                </IconButton>
                <AccountDialog src={avatar ? avatar : user}></AccountDialog>
            </Box>
        </React.Fragment>
    );
}
