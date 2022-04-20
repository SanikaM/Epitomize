import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Cookies from 'universal-cookie';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import jwt_decode from "jwt-decode";
import configData from "../config.json";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {
  useParams
} from "react-router-dom";

const theme = createTheme();
const initialState = { alt: "", src: "" };

export default function OtherUserProfile() {

  const cookies = new Cookies();
  const baseURL = configData.BACKEND_URL
  let { id } = useParams();

  const [data, setData] = React.useState(null);
  const [{ alt, src }, setPreview] = useState(initialState);

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

  React.useEffect(() => {
    const tokenStr = cookies.get('access_token')

    let decodedToken = jwt_decode(tokenStr);
    let currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      cookies.remove("access_token", { path: '/' })
      window.location = "/"
    }

    axios.get(baseURL + 'user/profile/' + id, { headers: { "Authorization": `Bearer ${tokenStr}` } })
      .then((response) => {
        setData(response.data);
        setPreview(
          response.data.Profilepicture
            ? {
              src: require(response.data.Profilepicture),
              alt: response.data.Username
            }
            : initialState
        )
        console.log(src)
      });
  }, []);

  function handleFollow(value) {
    const tokenStr = cookies.get('access_token')
    let decodedToken = jwt_decode(tokenStr);
    let currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      cookies.remove("access_token", { path: '/' })
      window.location = "/"
    }
    axios.get(baseURL + "follow/" + value, { headers: { "Authorization": `Bearer ${tokenStr}` } })
      .then((response) =>
        setSeverity("success"),
        setState({
          open: true, ...{
            vertical: 'top',
            horizontal: 'center',
          }
        }),
        setResponse("Successfully followed the user."),
        window.location.reload()
      );
  }

  function handleUnfollow(value) {
    const tokenStr = cookies.get('access_token')
    let decodedToken = jwt_decode(tokenStr);
    let currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      cookies.remove("access_token", { path: '/' })
      window.location = "/"
    }
    axios.get(baseURL + "unfollow/" + value, { headers: { "Authorization": `Bearer ${tokenStr}` } })
      .then((response) =>
        setSeverity("success"),
        setState({
          open: true, ...{
            vertical: 'top',
            horizontal: 'center',
          }
        }),
        setResponse("Successfully unfollowed the user."),
        window.location.reload()
      );
  }

  if (!data) return null;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ marginLeft: "35%" }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {data.Profilepicture ?
            <Box>
              <img className="preview" src={require("../images/" + data.Profilepicture)} alt={alt} style={{
                borderRadius: "50%",
                width: 100,
                height: 100
              }} />

            </Box>
            :
            <Avatar style={{
              backgroundColor: "gray",
              width: 65,
              height: 65
            }}>{data.Username.charAt(0).toUpperCase()}</Avatar>
          }

          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <Box component="form" noValidate
            sx={{
              mt: 3,
              display: 'flex',
            }}>

            <Card>
              <Divider />

              <CardContent>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid item
                    md={12}
                    xs={12}>
                    <TextField
                      fullWidth
                      id="Username"
                      label="Username"
                      name="Username"
                      data-testid="Username"
                      value={data.Username}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  <Grid item
                    md={12}
                    xs={12}>
                    <TextField
                      fullWidth
                      id="Emailid"
                      label="Email"
                      name="Emailid"
                      data-testid="Emailid"
                      value={data.Emailid}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>


                  <Grid item
                    md={12}
                    xs={12}>
                    <TextField
                      fullWidth
                      id="About"
                      label="About"
                      name="About"
                      data-testid="About"
                      value={data.About}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>

                  <Grid item
                    md={12}
                    xs={12}>
                    <TextField
                      fullWidth
                      id="Preferred Tags"
                      label="Preferred Tags"
                      name="Preferred Tags"
                      data-testid="Preferred Tags"
                      value={data.Tags}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item
                    md={12}
                    xs={12}>
                    {data.Follow ? (
                      <Chip label="Unfollow" onClick={() => handleUnfollow(data.UserId)} color="default" size="medium" variant="filled" edge="end" sx={{ marginTop: "5%" }} style={{ fontFamily: "Playfair Display" }} />

                    ) : (
                      <Chip label="Follow" onClick={() => handleFollow(data.UserId)} color="success" size="medium" variant="filled" edge="end" sx={{ marginTop: "5%" }} style={{ fontFamily: "Playfair Display" }} />
                    )
                    }
                  </Grid>
                </Grid>
              </CardContent>

            </Card>
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