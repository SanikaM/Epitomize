import Button from '@mui/material/Button';
import * as React from 'react';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Cookies from 'universal-cookie';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import jwt_decode from "jwt-decode";
import configData from "../config.json";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


function AllUsers() {

    const baseURL = configData.BACKEND_URL
    const [data, setData] = React.useState(null);
    const cookies = new Cookies();

    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        return "#" + hex.toString(16);
    }

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
        axios.get(baseURL + 'userlist', { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                console.log(response.data)
                setData(response.data);
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

    if (data && data['Users'] !== null) {

        return (
            <Stack spacing={2}>
                <List sx={{ width: '100%', maxWidth: 500, marginLeft: "45%" }}>
                    <h2 className="font-link">Who to Follow: </h2>

                    {
                        data['Users'].map(item => (
                            <ListItem alignItems="flex-start" key={item.UserId}>

                                <ListItemAvatar>
                                    <Link to={"/user/" + item.UserId} style={{ textDecoration: 'none', color: "black" }}>
                                        {item.Profilepicture ?
                                            <Box>
                                                <img className="preview" src={require("../images/" + item.Profilepicture)} alt={item.Username} style={{
                                                    borderRadius: "50%",
                                                    width: 45,
                                                    height: 45
                                                }} />

                                            </Box>
                                            :
                                            <Avatar style={{
                                                backgroundColor: randomColor(),
                                                width: 45,
                                                height: 45
                                            }}>
                                                {item.Username.charAt(0).toUpperCase()}
                                            </Avatar>
                                        }
{/* 
                                        <Avatar style={{
                                            backgroundColor: randomColor()
                                        }}>
                                            {item.Username.charAt(0).toUpperCase()}

                                        </Avatar> */}
                                    </Link>
                                </ListItemAvatar>

                                <ListItemText sx={{ textTransform: 'capitalize', fontFamily: "Playfair Display" }}
                                    primary={<Typography sx={{ fontFamily: "Playfair Display" }}>{item.Username}</Typography>}
                                    secondary={
                                        <React.Fragment>
                                            <Typography sx={{ fontFamily: "Playfair Display" }}>{item.About}</Typography>
                                        </React.Fragment>
                                    }
                                />

                                {item.Follow ? (
                                    <Chip label="Unfollow" onClick={() => handleUnfollow(item.UserId)} color="default" size="medium" variant="filled" edge="end" sx={{ marginTop: "5%" }} style={{ fontFamily: "Playfair Display" }} />

                                ) : (
                                    <Chip label="Follow" onClick={() => handleFollow(item.UserId)} color="success" size="medium" variant="filled" edge="end" sx={{ marginTop: "5%" }} style={{ fontFamily: "Playfair Display" }} />
                                )
                                }
                            </ListItem>
                        ))
                    }
                </List>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    key={vertical + horizontal}
                >
                    <Alert severity={severity}>{apiResponse}</Alert>
                </Snackbar>
            </Stack>
        )
    }
    else {
        return (
            <div>
                <h2 className="font-link">Who to Follow: </h2>
                <Button sx={{ textTransform: 'none', color: "black", fontSize: 20, fontFamily: "Playfair Display" }}>
                    No active users
                </Button>
            </div>

        );
    }
}

export default AllUsers;