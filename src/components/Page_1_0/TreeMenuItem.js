import React, { useContext, useEffect } from "react";
import { filecontext } from "../../context/filetree";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";

import RenameDialog from "./RenameDialog";
import DeleteDialog from "./DeleteDialog";

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
    const [openRenameDialog, setOpenRenameDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    const data = useContext(filecontext);
    const { actions } = data;

    const handleClick = (event) => {
        event.preventDefault();
        console.log(event.currentTarget);
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
                }}
                onClick={(e) => {
                    console.log(e.button);
                    if (e.button === 0) {
                        console.log(e.currentTarget);
                        console.log("it should go here");

                        actions.open(node.id);
                        if (document.getElementsByClassName("input")[0])
                            document.getElementsByClassName("input")[0].focus();
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
            {node.type !== "dir" ? (
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
                    autoFocus={false}
                >
                    <MenuItem
                        className={classes.menuItem}
                        onClick={() => {
                            setOpenRenameDialog(true);
                            setAnchorEl(null);
                        }}
                    >
                        Rename
                    </MenuItem>
                    <MenuItem
                        className={classes.menuItem}
                        onClick={() => {
                            setOpenDeleteDialog(true);
                            setAnchorEl(null);
                        }}
                    >
                        Delete
                    </MenuItem>
                </Menu>
            ) : null}
            {openRenameDialog ? (
                <RenameDialog
                    fileID={node.id}
                    closeFunc={() => setOpenRenameDialog(false)}
                ></RenameDialog>
            ) : null}
            {openDeleteDialog ? (
                <DeleteDialog
                    fileID={node.id}
                    title={node.title}
                    closeFunc={() => setOpenDeleteDialog(false)}
                ></DeleteDialog>
            ) : null}
        </div>
    );
}
