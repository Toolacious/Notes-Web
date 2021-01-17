import React, { useContext, useEffect, useState } from "react";
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

import Footer from "./Footer";
import post1 from "./blog-post.1.md";
import post2 from "./blog-post.2.md";
import post3 from "./blog-post.3.md";

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

const sections = [
  { title: "Technology", url: "#" },
  { title: "Design", url: "#" },
  { title: "Culture", url: "#" },
  { title: "Business", url: "#" },
  { title: "Politics", url: "#" },
  { title: "Opinion", url: "#" },
  { title: "Science", url: "#" },
  { title: "Health", url: "#" },
  { title: "Style", url: "#" },
  { title: "Travel", url: "#" },
];

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/random",
    imageText: "Image Text",
  },
];

const posts = [post1, post2, post3];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

export default function Page_1_0() {
  const classes = useStyles();
  const context = useContext(AuthContext);
  const [openFiles, setopenFiles] = useState([]);
  const [currentOpenFile, setcurrentOpenFile] = useState("");
  console.log(context);
  const { loading, error, data, subscribeToMore } = useQuery(NOTES_QUERY, {
    variables: { email: context.user.email },
  });
  const [usernotes, setuserNotes] = useState([]);
  useEffect(() => {
    if (!loading) {
      setuserNotes(data.usernotes);
    }
  }, [loading]);

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
            <PersistentDrawerLeft></PersistentDrawerLeft>
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
            <PersistentDrawerRight></PersistentDrawerRight>
          </main>
        </filecontext.Provider>
      </Container>
    </React.Fragment>
  );
}
/*
<MainFeaturedPost post={mainFeaturedPost} />
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <FeaturedPost key={post.title} post={post} />
                        ))}
                    </Grid> */
