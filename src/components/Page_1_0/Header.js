import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import SettingsIcon from "@material-ui/icons/Settings";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import SimpleMenu from "./MenuItem";
import AccountDialog from "./AccountDialog";
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

const new_project = () => {};

const file_menu = {
    name: "File",
    sections: [
        { name: "New", func: new_project },
        { name: "Close", func: () => {} },
    ],
};

export default function Header(props) {
    const classes = useStyles();
    const { sections, title } = props;

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

Header.propTypes = {
    sections: PropTypes.array,
    title: PropTypes.string,
};
