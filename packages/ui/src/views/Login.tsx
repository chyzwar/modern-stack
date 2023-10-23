import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {useNavigate} from "react-router-dom";

function Copyright(): React.ReactElement {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 8, mb: 4}}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


function Login(): React.ReactElement {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

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
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
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

          <a rel='noopener noreferrer' href="/api/v1/login/facebook">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{backgroundColor: "#3b5998"}}
            >
              Facebook
            </Button>
          </a>

          <a rel='noopener noreferrer' href="/api/v1/login/google">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{backgroundColor: "#de5246"}}
            >
              Google
            </Button>
          </a>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
              Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                  Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright  />
    </Container>
  );
}

export default Login;