import Button from '@mui/material/Button';
import * as React from 'react';
import Chip from '@mui/material/Chip';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Cookies from 'universal-cookie';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';


function AllUsers() {

    const baseURL = "http://localhost:8081/"
    const [data, setData] = React.useState(null);
    const cookies = new Cookies();

    function randomColor() {
        let hex = Math.floor(Math.random() * 0xFFFFFF);
        return  "#" + hex.toString(16);
    }
    
    React.useEffect(() => {
        const tokenStr = cookies.get('access_token')
        axios.get(baseURL + 'userlist', { headers: {"Authorization" : `Bearer ${tokenStr}`} })
            .then((response) => {
                console.log(response.data)
                setData(response.data);
            });
    }, []);

    if (data && data['Users'] !== null) {

        return (
            <Stack spacing={2}>
                <List sx={{ width: '100%', maxWidth: 500, marginLeft: "45%" }}>
                <h2>Who to Follow: </h2>

                    {
                        data['Users'].map(item => (
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar style={{
                                        backgroundColor: randomColor()
                                    }}>{item.Username.charAt(0).toUpperCase()}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.Username}
                                    secondary={
                                        <React.Fragment>
                                            {item.About}
                                        </React.Fragment>
                                    }
                                />
                                <Chip label="Follow" size="medium" variant="filled" color="success" edge="end" sx={{ marginTop: "3%" }} />
                            </ListItem>
                        ))
                    }
                </List>
            </Stack>
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

export default AllUsers;