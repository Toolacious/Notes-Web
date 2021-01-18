import React, { useContext, useEffect } from "react";
import { filecontext } from "../../context/filetree";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

const useStyles = makeStyles((theme) => ({
    labelIcon: {
        marginRight: theme.spacing(0.5),
    },
    labelText: {
        textAlign: "left",
        fontSize: "16px",
        fontWeight: "inherit",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    },
    menuItem: {
        fontSize: "14px",
        width: "128px",
    },
}));

export default function TreeMenu(props) {
    const classes = useStyles();
    const node = props.node;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const data = useContext(filecontext);
    const { actions } = data;

    const handleClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    return (
        <div>
            <div
                onContextMenu={handleClick}
                style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    cursor: "context-menu",
                }}
                aria-controls="name"
                aria-haspopup="true"
                onClick={(e) => {
                    if (e.button === 0) {
                        actions.open(node.id);
                    } else if (e.button === 2) {
                        handleClick();
                    }
                }}
            >
                {node.type === "dir" ? (
                    <FolderIcon
                        fontSize="small"
                        className={classes.labelIcon}
                    />
                ) : (
                    <InsertDriveFileIcon
                        fontSize="small"
                        className={classes.labelIcon}
                    />
                )}

                <Typography className={classes.labelText}>
                    {node.title}
                </Typography>
            </div>
            <Menu
                id="name"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => {
                    setAnchorEl(null);
                }}
            >
                <MenuItem
                    className={classes.menuItem}
                    onClick={() => {
                        actions.rename(node.id, "ha");
                        setAnchorEl(null);
                    }}
                >
                    Rename
                </MenuItem>
                <MenuItem
                    className={classes.menuItem}
                    onClick={() => {
                        actions.delete(node.id);
                        setAnchorEl(null);
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
}
