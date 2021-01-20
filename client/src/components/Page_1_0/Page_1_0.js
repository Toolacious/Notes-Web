import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "./Header";
import Main from "./Main";
import { filecontext } from "../../context/filetree";
import { AvatarContext } from "../../context/avatarContext";
import { useQuery } from "@apollo/react-hooks";
import { NOTES_QUERY } from "../../graphql/notes";
import { AVATAR_QUERY } from "../../graphql/getAvatar";
import { GUIDE_QUERY } from "../../graphql/noti";
import { AuthContext } from "../../routes/auth";

import PersistentDrawerLeft from "./LeftDrawer";
import PersistentDrawerRight from "./RightDrawer";
import TagBar from "./TagBar";

import { FileActions } from "./FileActions";
import { mainContext } from "../../context/mainContext";

import Loading from "../../routes/loading";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    pageContainer: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
}));

export default function Page_1_0() {
    const classes = useStyles();
    const {
        user: { email, userId: id },
    } = useContext(AuthContext);
    const [mode, setMode] = useState("search");
    const [open, setOpen] = useState(false);
    const [searchStr, setSearchStr] = useState("");

    const { loading, error, data } = useQuery(NOTES_QUERY, {
        variables: { email },
    });

    const { loading: ava_loading, error: ava_error, data: ava_data } = useQuery(
        AVATAR_QUERY,
        {
            variables: { id },
        }
    );
    const [avatar, setAvatar] = useState("");
    useEffect(() => {
        if (!ava_loading && !ava_error) {
            setAvatar(ava_data.userAvatar);
        }
        return () => {};
    }, [ava_loading]);

    const {
        loading: guide_loading,
        error: guide_error,
        data: guide_data,
    } = useQuery(GUIDE_QUERY);
    const [guide, setGuide] = useState("");
    useEffect(() => {
        if (!guide_loading && !guide_error) {
            setGuide(guide_data.user);
        }
        return () => {};
    }, [guide_loading]);

    const {
        usernotes,
        openFiles,
        currentOpenFile,
        setcurrentOpenFile,
        setuserNotes,
        setopenFiles,
        actions,
    } = FileActions({ usernotes: [], openFiles: [], currentOpenFile: "" });

    useEffect(() => {
        if (!loading && !error) {
            setuserNotes(data.usernotes);
        }
    }, [loading, data, error]);

    return loading || ava_loading || guide_loading ? (
        <div
            backgroundColor="blue"
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Loading type="spinningBubbles" color="ffffff" />
        </div>
    ) : (
        <React.Fragment>
            <CssBaseline />
            <Container
                maxWidth={false}
                disableGutters={true}
                className={classes.pageContainer}
            >
                <filecontext.Provider
                    value={{
                        usernotes,
                        openFiles,
                        currentOpenFile,
                        setcurrentOpenFile,
                        setuserNotes,
                        setopenFiles,
                        actions,
                    }}
                >
                    <AvatarContext.Provider value={{ avatar, setAvatar }}>
                        <Header />
                    </AvatarContext.Provider>
                    <mainContext.Provider
                        value={{
                            mode,
                            setMode,
                            open,
                            setOpen,
                            searchStr,
                            setSearchStr,
                            guide,
                        }}
                    >
                        <main
                            style={{
                                display: "flex",
                                flexGrow: 1,
                                width: "100vw",
                                alignItems: "stretch",
                            }}
                        >
                            <PersistentDrawerLeft></PersistentDrawerLeft>
                            <div
                                style={{
                                    display: "flex",
                                    flex: "1 1 0",
                                    minWidth: "0px",
                                    overflowY: "hidden",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexGrow: 1,
                                        maxWidth: "100%",
                                        minWidth: "0px",
                                        flexDirection: "column",
                                        alignItems: "stretch",
                                    }}
                                >
                                    <Main></Main>
                                    <TagBar></TagBar>
                                </div>
                            </div>
                            <PersistentDrawerRight></PersistentDrawerRight>
                        </main>
                    </mainContext.Provider>
                </filecontext.Provider>
            </Container>
        </React.Fragment>
    );
}
