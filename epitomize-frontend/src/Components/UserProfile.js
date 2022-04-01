import * as React from 'react';
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

const theme = createTheme();

export default function UserProfile() {

  const cookies = new Cookies();
  const baseURL = "http://localhost:8081/"

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const tokenStr = cookies.get('access_token')
    axios.get(baseURL + 'user', { headers: { "Authorization": `Bearer ${tokenStr}` } })
      .then((response) => {
        setData(response.data);
      });
  }, []);

  if (!data) return null;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ marginLeft: "50%" }}>
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
    </ThemeProvider>
  );
}