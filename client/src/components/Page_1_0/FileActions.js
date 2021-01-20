import { useReducer, useContext } from "react";
import { ADDNOTE_Mutation } from "../../graphql/createNote";
import { DELNOTE_Mutation } from "../../graphql/deleteNote";
import { UPDNOTE_Mutation } from "../../graphql/updateNote";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "../../routes/auth";

function actionReducer(state, action) {
    let updOpenFiles = [];
    let updCurrentOpenFile = "";

    switch (action.type) {
        case "SET":
            return action.updData;
        case "NEW":
            return {
                usernotes: [...state.usernotes, action.data],
                openFiles: [...state.openFiles, action.id],
                currentOpenFile: action.id,
            };
        case "OPEN":
            if (action.id === "root") {
                return state;
            }
            if (!state.openFiles.includes(action.id)) {
                return {
                    ...state,
                    openFiles: [...state.openFiles, action.id],
                    currentOpenFile: action.id,
                };
            } else {
                return {
                    ...state,
                    currentOpenFile: action.id,
                };
            }
        case "RENAME":
            return {
                ...state,
                usernotes: action.data,
            };
        case "DELETE":
            updCurrentOpenFile = state.currentOpenFile;
            updOpenFiles = state.openFiles.filter((e) => e !== action.id);
            if (action.id === state.currentOpenFile) {
                let idx = state.openFiles.indexOf(state.currentOpenFile);
                if (idx > 0) {
                    updCurrentOpenFile = state.openFiles[idx - 1];
                } else if (idx === 0 && state.openFiles.length > 1) {
                    updCurrentOpenFile = state.openFiles[1];
                } else {
                    updCurrentOpenFile = "";
                }
            }
            return {
                ...state,
                usernotes: action.data,
                openFiles: updOpenFiles,
                currentOpenFile: updCurrentOpenFile,
            };
        case "CLOSE":
            updCurrentOpenFile = state.currentOpenFile;
            updOpenFiles = state.openFiles.filter((e) => e !== action.id);
            if (action.id === state.currentOpenFile) {
                let idx = state.openFiles.indexOf(state.currentOpenFile);
                if (idx > 0) {
                    updCurrentOpenFile = state.openFiles[idx - 1];
                } else if (idx === 0 && state.openFiles.length > 1) {
                    updCurrentOpenFile = state.openFiles[1];
                } else {
                    updCurrentOpenFile = "";
                }
            }
            return {
                ...state,
                openFiles: updOpenFiles,
                currentOpenFile: updCurrentOpenFile,
            };
        default:
            return state;
    }
}

function FileActions(initialState) {
    const [state, dispatch] = useReducer(actionReducer, initialState);
    const [newNote] = useMutation(ADDNOTE_Mutation);
    const [delNote] = useMutation(DELNOTE_Mutation);
    const [updNote] = useMutation(UPDNOTE_Mutation);
    const {
        user: { email },
    } = useContext(AuthContext);

    function setUserNotes(data) {
        dispatch({
            type: "SET",
            updData: {
                ...state,
                usernotes: data,
            },
        });
    }
    function setOpenFiles(data) {
        dispatch({
            type: "SET",
            updData: {
                ...state,
                openFiles: data,
            },
        });
    }
    function setCurrentOpenFile(data) {
        dispatch({
            type: "SET",
            updData: {
                ...state,
                currentOpenFile: data,
            },
        });
    }
    async function newFile(title) {
        try {
            const a = await newNote({
                variables: {
                    email,
                    title,
                    markdown: "",
                    tags: [],
                    links: [],
                },
            });
            dispatch({
                type: "NEW",
                id: a.data.createNote.id,
                data: a.data.createNote,
            });
        } catch (err) {
            console.log(err);
        }
    }
    function openFile(id) {
        dispatch({
            type: "OPEN",
            id: id,
        });
    }
    function saveFile(id, data) {
        let newNotes = [...state.usernotes];
        let idx = newNotes.findIndex((e) => e.id === id);
        newNotes[idx] = data;
        setUserNotes(newNotes);
    }
    function closeFile(id) {
        dispatch({
            type: "CLOSE",
            id: id,
        });
    }
    async function renameFile(id, title) {
        try {
            let data = [...state.usernotes];
            data.find((e) => e.id === id).title = title;
            dispatch({
                type: "RENAME",
                id,
                data,
            });
            await updNote({ variables: { id, email, title } });
        } catch (error) {
            console.log(error);
        }
    }
    async function deleteFile(id) {
        // TODO: delete file in backend, return new usernotes data
        try {
            let data = [...state.usernotes];
            let idx = data.findIndex((e) => e.id === id);
            data.splice(idx, 1);
            dispatch({
                type: "DELETE",
                id,
                data,
            });
            await delNote({ variables: { id, email } });
        } catch (err) {
            console.log(err);
        }
    }

    return {
        usernotes: state.usernotes,
        openFiles: state.openFiles,
        currentOpenFile: state.currentOpenFile,
        setuserNotes: setUserNotes,
        setopenFiles: setOpenFiles,
        setcurrentOpenFile: setCurrentOpenFile,
        actions: {
            new: newFile,
            open: openFile,
            save: saveFile,
            close: closeFile,
            rename: renameFile,
            delete: deleteFile,
        },
    };
}

export { FileActions };
