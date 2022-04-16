import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemIcon from '@mui/material/ListItemIcon';


export default function Notifications() {
    const baseURL = "http://localhost:8081/"
    const cookies = new Cookies();
    const [data, setData] = React.useState(null);
    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };


    React.useEffect(() => {
        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }
        axios.get(baseURL + 'notification', { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                setData(response.data);
            });
    }, []);

    function handleNotificationRead(nid, path) {
        const tokenStr = cookies.get('access_token')
        axios.get(baseURL + 'notification/' + nid, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                window.location = path
            });
    }


    return (
        <div>
            <h1>Notifications</h1>
            <List sx={{ width: '100%', }}>
                {data && data['Allnotifications'].map(item => (
                    <>
                        {/* <Divider /> */}
                        <React.Fragment key={item.NId}>
                            {item.Read ?

                                <ListItem sx={{ bgcolor: 'background.paper', border: "0.5px solid bloack" }} onClick={() => handleNotificationRead(item.NId, item.Path)} key={item.NId}>
                                    <ListItemIcon>
                                        <NotificationsIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.Message}
                                        secondary={new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)} />
                                    
                                </ListItem>
                                :
                                <ListItem sx={{ bgcolor: '#88b4e5', border: "0.5px solid bloack" }} onClick={() => handleNotificationRead(item.NId, item.Path)} key={item.NId}>
                                    <ListItemIcon>
                                        <NotificationsIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.Message}
                                        secondary={new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)} />

                                </ListItem>
                            }
                        </React.Fragment>
                    </>
                ))

                }
                {/* <Divider /> */}
            </List>
        </div>
    );
}
