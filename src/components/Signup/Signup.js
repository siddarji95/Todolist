import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Notification from '../Notification';
import { useHistory } from 'react-router-dom';
import { getAuth, updateProfile, createUserWithEmailAndPassword } from '@firebase/auth';
import { connect } from 'react-redux'
import { updateAppState } from '../../actions'

const Signup = () => {
  const history = useHistory();
  const [message, setMessage] = React.useState('');
  const [openNotification, setOpenNotification] = React.useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('name');
    const email = data.get('email');
    const password = data.get('password')
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log('Signup successfully', userCredential, name)
      setOpenNotification(true)
      setMessage('Signup successfully.')
      setTimeout(() => {history.push("/")}, 3000)
      return updateProfile(auth.currentUser, {
        displayName: name,
      }).then(() => {
        console.log('user profile updated', this.state.name)
        this.props.dispatch(updateAppState({
          user: auth.currentUser,
        }))
      }).catch((error) => {
        // throw new Error(error)
      });
    })
      .catch((error) => {
        console.log(error)
        if(error.code === 'auth/email-already-in-use'){
          setOpenNotification(true)
          setMessage('The email already in use.')
        }
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='email'
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                inputProps={{ minLength: 6 }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  history.push("/login")
                }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Notification message={message} openNotification={openNotification} setOpenNotification={setOpenNotification} />
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);