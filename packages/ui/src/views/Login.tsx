import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {useNavigate} from "react-router-dom";

const Copyright = () => 
  <Typography variant="body2" color="textSecondary" align="center">
    {"Copyright © "}
    <Link color="inherit" href="https://material-ui.com/">
      Your Website
    </Link>
    {" "}
    {new Date().getFullYear()}
    .
  </Typography>
;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    textDecoration: "none",
  },
  facebook: {
    margin: theme.spacing(0, 0, 2),
    backgroundColor: "#3b5998",
  },
  google: {
    margin: theme.spacing(0, 0, 2),
    backgroundColor: "#de5246",
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  React.useEffect(() => {
    const {searchParams} = new URL(document.location.toString());

    const token = searchParams.get("token") ?? false;
    const maxAge = searchParams.get("maxAge") ?? 3600;

    if (token) {
      const cookie = [
        `Token=${token}`,
        "SameSite=Strict",
        `Max-Age=${maxAge}`,
      ];
      if (process.env.NODE_ENV === "production") {
        cookie.push("Secure");
        cookie.push("HttpOnly");
      }
      document.cookie = cookie.join("; ");
      navigate("/");
    }
  });

  return (
    <Container component="main" maxWidth="xs">

      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} noValidate>
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          or

          <a className={classes.link} href="/api/v1/login/facebook">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.facebook}
            >
              Facebook
            </Button>
          </a>

          <a className={classes.link} rel="noopener noreferrer" href="/api/v1/login/google">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.google}
            >
              Google
            </Button>
          </a>

          <Grid container>
            <Grid item xs>
              <Link href="/password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
