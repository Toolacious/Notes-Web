import React, { useContext, useState } from "react";
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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER_MUTATION } from "../graphql/mutations";
import { LOGIN_Mutation } from "../graphql/login";
import { setAccessToken } from "../accessToken";
import { useHistory } from "react-router-dom";
import loginImg from "../icons/signup.jpg";
import { AuthContext } from "../routes/auth";

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
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "white",
        padding: theme.spacing(2),
        borderRadius: "20px",
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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    space: {
        height: theme.spacing(8),
    },
}));

export default function SignUp() {
    const context = useContext(AuthContext);

    const validationSchema = Yup.object({
        fname: Yup.string("Enter your first name")
            .min(2, "Fist name should be of minimum 2 characters length")
            .max(50)
            .required("First name is required"),
        lname: Yup.string("Enter your last name")
            .min(2, "Fist name should be of minimum 2 characters length")
            .required("Last name is required"),
        name: Yup.string("Enter a name")
            .min(6, "Username should be of minimum 6 characters length")
            .required("Name is required"),
        email: Yup.string("Enter your email")
            .email("Enter a valid email")
            .required("Email is required"),
        password: Yup.string("")
            .min(6, "Password must contain at least 6 characters")
            .required("Enter your password"),
        confirmPassword: Yup.string("Enter your password")
            .required("Confirm your password")
            .oneOf([Yup.ref("password")], "Password does not match"),
    });

    const history = useHistory();
    const [addUser] = useMutation(CREATE_USER_MUTATION);
    const [regiErr, setRegiErr] = useState("");
    const [login, { loading }] = useMutation(LOGIN_Mutation);
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            fname: "",
            lname: "",
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            //alert(JSON.stringify(values, null, 2));
            try {
                const { fname, lname, name, email, password } = values;
                await addUser({
                    variables: {
                        fname,
                        lname,
                        name,
                        email,
                        password,
                    },
                });
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
                setRegiErr(err.message.slice(15));
            }
        },
    });

    return (
        <div
            style={{ width: "100vw", height: "100vh" }}
            className={classes.image}
        >
            <Container
                component="main"
                maxWidth="xs"
                style={{ height: "100%" }}
            >
                <CssBaseline />
                <div className={classes.space}></div>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={formik.handleSubmit}
                        noValidate
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="fname"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="fname"
                                    label="First name"
                                    autoFocus
                                    value={formik.values.fname}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.fname &&
                                        Boolean(formik.errors.fname)
                                    }
                                    helperText={
                                        formik.touched.fname &&
                                        formik.errors.fname
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lname"
                                    label="Last name"
                                    name="lname"
                                    autoComplete="lname"
                                    value={formik.values.lname}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.lname &&
                                        Boolean(formik.errors.lname)
                                    }
                                    helperText={
                                        formik.touched.lname &&
                                        formik.errors.lname
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="username"
                                    name="name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Username"
                                    autoFocus
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.name &&
                                        Boolean(formik.errors.name)
                                    }
                                    helperText={
                                        formik.touched.name &&
                                        formik.errors.name
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={
                                        (formik.touched.email &&
                                            Boolean(formik.errors.email)) ||
                                        regiErr !== ""
                                    }
                                    helperText={
                                        (formik.touched.email &&
                                            formik.errors.email) ||
                                        regiErr
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.password &&
                                        Boolean(formik.errors.password)
                                    }
                                    helperText={
                                        formik.touched.password &&
                                        formik.errors.password
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPassword"
                                    autoComplete="current-password"
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.confirmPassword &&
                                        Boolean(formik.errors.confirmPassword)
                                    }
                                    helperText={
                                        formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={formik.isSubmitting}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item xs>
                                <Link to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        </div>
    );
}
