import React, { useContext, useEffect } from "react";
import { filecontext } from "../../context/filetree";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { AuthContext } from "../../routes/auth";
import { AccordionActions } from "@material-ui/core";

import TreeMenu from "./TreeMenuItem";

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
    const {
        openFiles,
        setopenFiles,
        setcurrentOpenFile,
        currentOpenFile,
        actions,
    } = data;
    // useEffect(() => {
    //     subscribeToMore({
    //       document: MSGS_SUBSCRIPTION,
    //       updateQuery: (prev, { subscriptionData }) => {
    //         if (!subscriptionData.data) return prev;
    //         if (subscriptionData.data.message.mutation === "DELETED") {
    //           refetch();
    //           return data;
    //         }

    //         const newMsg = subscriptionData.data.message.data;
    //         if (
    //           (newMsg[0].name === username || newMsg[0].senduser === username) &&
    //           hasUser
    //         ) {
    //           setStatus({
    //             type: "success",
    //             msg: `${newMsg[0].name}'s message: ${newMsg[0].body} has saved!`,
    //           });
    //           return {
    //             users: [...prev.users, ...newMsg],
    //           };
    //         } else return prev;
    //       },
    //     }); // eslint-disable-next-line
    //   }, [subscribeToMore]);
    const renderTree = (node) => (
        <TreeItem
            key={node.id}
            nodeId={node.id}
            onClick={(e) => {
                actions.open(node.id);
                if (document.getElementsByClassName("input")[0])
                    document.getElementsByClassName("input")[0].focus();
            }}
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
    );
}
