import Button from '@mui/material/Button';
import * as React from 'react';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import Cookies from 'universal-cookie';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { BrowserRouter, Link } from 'react-router-dom';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import jwt_decode from "jwt-decode";
import configData from "../config.json";

function Users() {

    const baseURL = configData.BACKEND_URL
    const [data, setData] = React.useState(null);
    const cookies = new Cookies();
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
                alert("Successfully followed the user."),
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
                alert("Successfully unfollowed the user."),
                window.location.reload()
            );
    }


    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        return "#" + hex.toString(16);
    }

    if (data && data['Users'] !== null) {

        return (
            <div>
                <h2>Who to Follow: </h2>
                <List sx={{ width: '100%', maxWidth: 360, }}>
                    {
                        data['Users'].slice(0, 3).map(item => (
                            <ListItem alignItems="flex-start" key={item.UserId}>
                                <BrowserRouter>
                                <Link to={"/otheruser/" + item.UserId} key={item.UserId}  style={{ textDecoration: 'none', color: "black" }}>
                                
                                <ListItemAvatar>
                             
                                
                                    <Avatar style={{
                                        backgroundColor: randomColor()
                                    }}>{item.Username.charAt(0).toUpperCase()}</Avatar>
                                    
                                 
                                </ListItemAvatar>
                                </Link>
                                </BrowserRouter>
                                <ListItemText sx={{ textTransform: 'capitalize' }}
                                    primary={item.Username}
                                    secondary={
                                        <React.Fragment>
                                            {item.About}
                                        </React.Fragment>
                                    }
                                />
                                {item.Follow ? (
                                    <Chip label="Unfollow" onClick={() => handleUnfollow(item.UserId)} color="default" size="medium" variant="filled" id={item.UserId + "unfollow"}  edge="end" sx={{ marginTop: "5%" }} />

                                ) : (
                                    <Chip label="Follow" onClick={() => handleFollow(item.UserId)} color="success" size="medium" variant="filled" id={item.UserId + "follow"} edge="end" sx={{ marginTop: "5%" }} />
                                )
                                }
                            </ListItem>
                        ))
                    }
                </List>

                <Button href="/alluser" sx={{ ':hover': { background: '#b3e6ff' }, textTransform: 'none', marginLeft: "10px" }}>
                    See More Suggestions..
                </Button>
            </div>
        )
    }
    else {
        return (
            <div>
                <h2>Who to Follow: </h2>
                <Button sx={{ textTransform: 'none', color: "black", fontFamily: 'Segoe UI', fontSize: 20 }}>
                    No active users
                </Button>
            </div>

        );
    }
}

export default Users;