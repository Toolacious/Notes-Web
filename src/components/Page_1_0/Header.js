import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import SimpleMenu from "./MenuItem";
import AccountDialog from "./AccountDialog";
import NewDialog from "./NewDialog";
import icon from "../../icons/icon.jpg";

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
    },
    mainWrapper: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
    },
    titlebar: {
        fontSize: "20px",
        height: "32px",
        margin: theme.spacing(1),
        border: "1px transparent",
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

    const file_menu = {
        name: "File",
        sections: [
            {
                name: "New",
                func: () => {
                    setOpenNewDialog(true);
                },
            },
            { name: "Close", func: () => {} },
        ],
    };

    return (
        <React.Fragment>
            <Box className={classes.headerWrapper}>
                <img className={classes.icon} src={icon} alt="#" />
                <Box className={classes.mainWrapper}>
                    <input
                        className={classes.titlebar}
                        defaultValue="Welcome to AAA"
                    />
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
                <IconButton>
                    <SettingsIcon fontSize="large" />
                </IconButton>
                <AccountDialog src={icon}></AccountDialog>
            </Box>
        </React.Fragment>
    );
}
