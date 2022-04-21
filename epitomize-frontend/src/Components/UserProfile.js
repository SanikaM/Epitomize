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
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import jwt_decode from "jwt-decode";
import EditIcon from '@mui/icons-material/Edit';
import configData from "../config.json";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const theme = createTheme();
const initialState = { alt: "", src: "" };

export default function UserProfile() {

  const cookies = new Cookies();
  const baseURL = configData.BACKEND_URL
  const [uploadFile, setUploadFile] = React.useState();

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

    axios.get(baseURL + 'user', { headers: { "Authorization": `Bearer ${tokenStr}` } })
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

  const fileHandler = event => {
    setUploadFile(event.target.files)
    const { files } = event.target;
    setPreview(
      files.length
        ? {
          src: URL.createObjectURL(files[0]),
          alt: files[0].name
        }
        : initialState
    );
    const dataImg = new FormData();
    dataImg.append("myFile", files[0]);
    const tokenStr = cookies.get('access_token')

    let decodedToken = jwt_decode(tokenStr);
    let currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      cookies.remove("access_token", { path: '/' })
      window.location = "/"
    }

    axios
      .post(baseURL + 'uploadImage', dataImg, { headers: { "Authorization": `Bearer ${tokenStr}`, "Content-Type": "multipart/form-data" } })
      .then(response => {
        setSeverity("success")
        setState({
          open: true, ...{
            vertical: 'top',
            horizontal: 'center',
          }
        });
        setResponse("Image successfully updated.")
        window.location.reload()

      }).catch(error => {
        console.log(error)
      });
  };

  if (!data) return null;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ marginLeft: "50%" }}>
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

          <label htmlFor="fileUpload" style={{
            marginLeft: "4em"
          }}><EditIcon /> </label>
          <input type="file" id="fileUpload" onChange={fileHandler} style={{ display: 'none' }} />

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

                  {/* <Grid item
                    md={12}
                    xs={12}>
                    <TextField
                      fullWidth
                      label="Profilepicture"
                      name="Profilepicture"
                      value={data.Profilepicture}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid> */}

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