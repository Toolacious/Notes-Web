import React, { useContext, useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import { filecontext } from "../../context/filetree";
import { useQuery } from "@apollo/react-hooks";
import { NOTES_QUERY } from "../../graphql/notes";
import { AuthContext } from "../../routes/auth";

import PersistentDrawerLeft from "./LeftDrawer";
import PersistentDrawerRight from "./RightDrawer";
import TagBar from "./TagBar";

import { FileActions } from "./FileActions";

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    pageContainer: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
    },
}));

export default function Page_1_0() {
    const classes = useStyles();
    const context = useContext(AuthContext);
    const ref = useRef(null);
    const handelRef = (tag) => {
        ref.current.value = "tags: " + tag;
        ref.current.focus();
    };
    //const [openFiles, setopenFiles] = useState([]);
    //const [currentOpenFile, setcurrentOpenFile] = useState("");
    console.log(context);
    const { loading, error, data, subscribeToMore } = useQuery(NOTES_QUERY, {
        variables: { email: context.user.email },
    });
    //const [usernotes, setuserNotes] = useState([]);
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

    return loading ? (
        <>loading...</>
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
                    <Header />

                    <main
                        style={{
                            display: "flex",
                            flexGrow: 1,
                            alignItems: "stretch",
                        }}
                    >
                        <PersistentDrawerLeft>{ref}</PersistentDrawerLeft>
                        <div
                            style={{
                                display: "flex",
                                flexGrow: 1,
                                flexDirection: "column",
                                alignItems: "stretch",
                            }}
                        >
                            <Main></Main>
                            <TagBar></TagBar>
                        </div>
                        <PersistentDrawerRight>
                            {handelRef}
                        </PersistentDrawerRight>
                    </main>
                </filecontext.Provider>
            </Container>
        </React.Fragment>
    );
}
