import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListItemIcon from '@mui/material/ListItemIcon';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import DraftsIcon from '@mui/icons-material/Drafts';
import Typography from '@mui/material/Typography';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import IconButton from '@mui/material/IconButton';
import configData from "../config.json";

export default function Notifications() {
    const baseURL = configData.BACKEND_URL
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
                console.log(response.data)
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

    function handleAllRead() {
        const tokenStr = cookies.get('access_token')
        axios.get(baseURL + 'allnotification', { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                window.location.reload()
            });
    }

    function handleDeleteNotification(nid) {
        const tokenStr = cookies.get('access_token')
        axios.delete(baseURL + 'notification/' + nid, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                window.location.reload()
            });
    }

    if (data && data['AllNotifications'].length > 0)
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <h1 className="font-link">Notifications</h1>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="subtitle1" sx={{ marginTop: '30px', marginLeft: "50px", fontFamily: "Playfair Display" }} onClick={() => handleAllRead()}>
                            Mark All Read <DraftsIcon style={{ verticalAlign: "middle" }} />
                        </Typography>
                    </Grid>
                </Grid>

                <List sx={{ width: '100%', }}>
                    {data && data['AllNotifications'].map(item => (
                        <>
                            <React.Fragment key={item.NId}>
                                {item.Read ?

                                    <ListItem sx={{ bgcolor: 'background.paper', fontFamily: "Playfair Display" }} key={item.NId}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteSweepIcon onClick={() => handleDeleteNotification(item.NId)} id="delete" />
                                            </IconButton>
                                        }>
                                        <ListItemIcon>
                                            <NotificationsIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={<Typography sx={{ fontFamily: "Playfair Display" }}>{item.Message}</Typography>}
                                            secondary={<Typography sx={{ fontFamily: "Playfair Display" }}>{new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</Typography>} />

                                    </ListItem>
                                    :
                                    <ListItem sx={{ bgcolor: '#88b4e5' }} key={item.NId}
                                        secondaryAction={
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteNotification(item.NId)} id="delete" >
                                                <DeleteSweepIcon />
                                            </IconButton>
                                        }>
                                        <ListItemIcon>
                                            <NotificationsIcon />
                                        </ListItemIcon>
                                        <ListItemText onClick={() => handleNotificationRead(item.NId, item.Path)} id="read"
                                            primary={<Typography sx={{ fontFamily: "Playfair Display" }}>{item.Message}</Typography>}
                                            secondary={<Typography sx={{ fontFamily: "Playfair Display" }}>{new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</Typography>} />

                                    </ListItem>
                                }
                            </React.Fragment>
                        </>
                    ))

                    }
                </List>
            </div>
        );

    else return (
        <Stack spacing={2}>
            <h1 className="font-link">Notifications</h1>
            <h4 className="font-link">No notifications</h4>
        </Stack>
    )
}