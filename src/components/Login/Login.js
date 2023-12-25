import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Divider, Toolbar, Grid, Box, Paper, Typography, Link, Checkbox, FormControlLabel, TextField, CssBaseline, Icon } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import LoginImage from "./Login.jpg"
import googleIcon from "./googleIcon.svg"
import { getAuth, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Todolist
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login(props) {
  const history = useHistory();
  console.log(history)
  const googleProvider = new GoogleAuthProvider();
  const signInWithAuth = (provider) => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Login Successfully', result.user.displayName)
        history.push("/home");
      }).catch((error) => {
        throw new Error(error)
      });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('Login successfully', user)
      })
      .catch((error) => {
        console.log('Error occurred', error)
        // this.setState({ error: error.message });
        if (error.code === 'auth/wrong-password') {
          alert('Wrong password');
        } else if (error.code === 'auth/user-not-found') {
          alert('There is no user record corresponding to this email. Please signup or Login with Social Media');
        } else {
          alert(error.message);
        }
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toolbar />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LoginImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                type='email'
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
            <Grid container>
              <Grid item xs>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    history.push("/forgetPassword")
                  }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    history.push("/signup")
                  }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2 }} flexItem>
              OR
            </Divider>
            <Grid container sx={{
              mt: 3, mb: 2,
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Grid
                item
                onClick={()=>{
                  signInWithAuth(googleProvider)
                }}
                sx={{
                  display: "flex", border: "1px solid #dadce0", borderRadius: "20px",
                  justifyContent: "center", alignItems: "center", cursor: "pointer",
                  p: 0.8
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img src={googleIcon} alt='googleIcon' height={25} width={25} />
                </Box>
                <Typography sx={{ pr: 5.2, pl: 2, color: "#3c4043", fontWeight: "500" }}>
                  Continue with Google
                </Typography>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />

          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}