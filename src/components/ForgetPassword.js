import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Notification from './Notification';
import { getAuth, sendPasswordResetEmail } from '@firebase/auth';
import { useHistory } from 'react-router-dom';


export default function SignIn() {
  const history = useHistory();
  const [message, setMessage] = React.useState('');
  const [openNotification, setOpenNotification] = React.useState(false);
  const handleForgetPassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const auth = getAuth();
    sendPasswordResetEmail(auth, email).then((user) => {
      // alert('Reset password link is sent to your email')
      setOpenNotification(true);
      setMessage("Reset password link is sent to your email.")
      setTimeout(() => {history.push("/")}, 3000)
    }).catch((error) => {
      console.log('Error occurred', error)
      // this.props.dispatch(updateAppState({ error: error.message }))
      // this.setState({ error: error.message });
      setMessage("Error occurred.")
    });
  }

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
          Reset Your Password
        </Typography>
        <Box component="form" onSubmit={handleForgetPassword} sx={{ mt: 1 }}>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
      <Notification message={message} openNotification={openNotification} setOpenNotification={setOpenNotification} />
    </Container>
  );
}