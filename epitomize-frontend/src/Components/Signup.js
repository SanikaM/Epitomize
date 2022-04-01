import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

const baseURL = "http://localhost:8081/user"

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const data = ({
        Emailid: formdata.get('Emailid'),
        Password: formdata.get('Password'),
        Username: formdata.get('Username'),
	    Profilepicture: formdata.get('Profilepicture'),
	    About: formdata.get('About')
      });
    console.log(data);
   

    axios
        .post(baseURL, data)
        .then(response => {
            console.log(response.data);
            //cookies.set('access_token', response.data['Access_Token'], { path: '/' });
            window.location = '/signin';

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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <img src="/favicon.ico" alt="logo" style={{ maxWidth: 50 }} />
          </Avatar>
          <Typography component="h1" variant="h4">
            Epitomize
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="Username"
                  name="Username"
                  required
                  fullWidth
                  id="Username"
                  data-testid="Username"
                  label="Username"
                  autoFocus
                />
              </Grid>

             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Emailid"
                  label="Email Address"
                  name="Emailid"
                  data-testid="Emailid"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="about"
                  name="About"
                  required
                  fullWidth
                  id="About"
                  label="About"
                  data-testid="About"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="password"
                  id="Password"
                  data-testid="Password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="profilepic"
                  name="Profilepicture"
                  required
                  fullWidth
                  id="Profilepicture"
                  label="Profile Picture"
                  autoFocus
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              id="signup_submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}