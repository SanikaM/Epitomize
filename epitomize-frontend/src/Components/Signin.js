import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'universal-cookie';
import axios from "axios";

const theme = createTheme();
const cookies = new Cookies();
const baseURL = "http://localhost:8081/login"

// const changeRouteHome = () => {
//   window.location = '/';
// }

function SignIn({ auth }) {

  const handleSubmit = (event) => {

    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const data = ({
      Emailid: formdata.get('email'),
      Password: formdata.get('password'),
    });
    axios
        .post(baseURL, data)
        .then(response => {
            console.log(response.data);
            cookies.set('access_token', response.data['Access_Token'], { path: '/' });
            window.location = '/';

        }).catch(error => {
            console.log(error)
        });
    
    
  };

  return (
    <ThemeProvider theme={theme}>
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
          <img src="/favicon.ico" alt="logo" style={{ maxWidth: 50 }} />

          <Typography component="h1" variant="h4">
            Epitomize
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            <Button
              type="submit"
              fullWidth
              id="signin"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={changeRouteHome}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;