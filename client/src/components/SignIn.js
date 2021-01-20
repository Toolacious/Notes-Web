import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
//import Link from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "../icons/icon.jpg";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_Mutation } from "../graphql/login";
import { AuthContext } from "../routes/auth";
import { setAccessToken } from "../accessToken";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import loginImg from "../icons/login.jpg";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" to="https://material-ui.com/">
                Abyss Notes
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: `url(${loginImg})`,
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "light"
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const context = useContext(AuthContext);
    const classes = useStyles();
    const [login, { loading, error }] = useMutation(LOGIN_Mutation);
    const [loginErr, setloginErr] = useState("");
    const history = useHistory();
    const validationSchema = Yup.object({
        email: Yup.string("Enter your email")
            .email("Enter a valid email")
            .required("Email is required"),
        password: Yup.string("")
            .min(6, "Password must contain at least 6 characters")
            .required("Enter your password"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const { email, password } = values;
                const response = await login({
                    variables: {
                        email,
                        password,
                    },
                });
                if (response && response.data) {
                    setAccessToken(response.data.login.accessToken);
                }
                context.login(response.data.login);
                history.push("/dashboard");
            } catch (err) {
                console.log(err.message);
                setloginErr(err.message.slice(15));
            }
        },
    });

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar
                        className={classes.avatar}
                        src={LockOutlinedIcon}
                    ></Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={formik.handleSubmit}
                        noValidate
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={
                                (formik.touched.email &&
                                    Boolean(formik.errors.email)) ||
                                loginErr[0] === "E" ||
                                loginErr[1] === "e"
                            }
                            helperText={
                                (formik.touched.email && formik.errors.email) ||
                                (loginErr[0] === "E" || loginErr[1] === "e"
                                    ? loginErr
                                    : null)
                            }
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={formik.handleChange}
                            error={
                                (formik.touched.password &&
                                    Boolean(formik.errors.password)) ||
                                loginErr[0] === "P"
                            }
                            helperText={
                                (formik.touched.password &&
                                    formik.errors.password) ||
                                (loginErr[0] === "P" ? loginErr : null)
                            }
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={formik.isSubmitting}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
