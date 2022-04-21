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
import configData from "../config.json";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const theme = createTheme();
const cookies = new Cookies();
const baseURL = configData.BACKEND_URL

function SignIn({ auth }) {

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [severity, setSeverity] = React.useState();
  const [apiResponse, setResponse] = React.useState();

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleSubmit = (event) => {

    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    const data = ({
      Emailid: formdata.get('email'),
      Password: formdata.get('password'),
    });
    axios
      .post(baseURL + "login", data)
      .then(response => {
        cookies.set('access_token', response.data['Access_Token'], { path: '/' });
        window.location = '/';

      }).catch(error => {
        setSeverity("error")
        setState({
          open: true, ...{
            vertical: 'top',
            horizontal: 'center',
          }
        });
        setResponse("Please check your login credentials. ")
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
              data-testid="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              data-testid="password"
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
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity={severity}>{apiResponse}</Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default SignIn;