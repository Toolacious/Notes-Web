import React, { useReducer } from "react";

function actionReducer(state, action) {
    let updOpenFiles = [];
    let updCurrentOpenFile = "";

    switch (action.type) {
        case "SET":
            console.log(action.updData);
            return action.updData;
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
            updOpenFiles = state.openFiles.slice();
            let pos = state.openFiles.indexOf(action.id);
            if (pos !== -1) {
                updOpenFiles[pos] = action.title;
                return {
                    ...state,
                    openFiles: updOpenFiles,
                };
            }
            return state;
        case "CLOSE":
            updCurrentOpenFile = "";
            updOpenFiles = [];
            for (let i = 0; i < state.openFiles.length; i++) {
                if (state.openFiles[i] === action.id) {
                    if (i !== 0) {
                        updCurrentOpenFile = state.openFiles[i - 1];
                    }
                    updOpenFiles = state.openFiles.filter(
                        (e, idx) => idx !== i
                    );
                    break;
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
    function newFile() {
        // TODO: create file in backend, return new usernotes data and new file id
        let data = null;
        let id = null;
        setUserNotes(data);

        openFile(id);
    }
    function openFile(id) {
        dispatch({
            type: "OPEN",
            id: id,
        });
    }
    function saveFile(id, data) {
        // TODO: save data(md string) to file, return new usernotes data
    }
    function closeFile(id) {
        dispatch({
            type: "CLOSE",
            id: id,
        });
    }
    function renameFile(id, title) {
        // TODO: rename file in backend, return new usernotes data
        let data = null;
        setUserNotes(data);

        dispatch({
            type: "RENAME",
            id: id,
            title: title,
        });
    }
    function deleteFile(id) {
        closeFile(id);

        // TODO: delete file in backend, return new usernotes data
        let data = null;
        setUserNotes(data);
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
