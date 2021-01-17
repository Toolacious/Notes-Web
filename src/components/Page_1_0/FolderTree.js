import React, { useContext } from "react";
import { filecontext } from "../../context/filetree";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FolderIcon from "@material-ui/icons/Folder";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import TreeItem from "@material-ui/lab/TreeItem";
import { AuthContext } from "../../routes/auth";

const test = {
    id: "4",
    type: "file",
    name: "Child - 4",
};
const testArr = Array(50).fill(test);
// const data = {
//     id: "root",
//     type: "dir",
//     name: "(Username)",
//     children: [
//         {
//             id: "1",
//             type: "file",
//             name: "Child - 144444444444444444444444444444444444444444444444",
//         },
//         {
//             id: "3",
//             type: "dir",
//             name: "Child - 3",
//             children: testArr,
//         },
//     ],
// };

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
}));

export default function FolderTree() {
    const classes = useStyles();
    const data = useContext(filecontext);
    const context = useContext(AuthContext);

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
                const { openFiles } = data;
                openFiles.push(node.id);
            }}
            label={
                <div style={{ display: "flex", alignItems: "center" }}>
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
            }
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
