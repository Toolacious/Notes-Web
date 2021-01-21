import React, { useContext } from "react";
import { filecontext } from "../../context/filetree";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeMenu from "./TreeMenuItem";

import { AuthContext } from "../../routes/auth";

const useStyles = makeStyles((theme) => ({
    root: {
        height: 110,
        flexGrow: 1,
        maxWidth: 400,
        paddingTop: "6px",
    },
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
    colorWhite1: {
        "&.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label": {
            backgroundColor: "white",
        },
    },
}));

export default function FolderTree() {
    const classes = useStyles();
    const data = useContext(filecontext);
    const context = useContext(AuthContext);

    const renderTree = (node) => (
        <TreeItem
            key={node.id}
            nodeId={node.id}
            label={<TreeMenu node={node}></TreeMenu>}
            classes={{
                root: classes.colorWhite1,
            }}
        >
            {Array.isArray(node.usernotes)
                ? node.usernotes.map((child) => renderTree(child))
                : null}
        </TreeItem>
    );

    return (
        <>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpanded={["root"]}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {renderTree({
                    ...data,
                    id: "root",
                    title: context.user.name,
                    type: "dir",
                })}
            </TreeView>
        </>
    );
}
