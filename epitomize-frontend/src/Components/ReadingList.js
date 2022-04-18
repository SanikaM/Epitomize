import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import jwt_decode from "jwt-decode";

function ReadingList() {
    const baseURL = "http://localhost:8081/"
    const cookies = new Cookies();
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }
        axios.get(baseURL + 'readinglist', { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                setData(response.data);
            });
    }, []);

    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

    function handleClick(value) {
        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }
        axios.delete(baseURL + "readinglist/" + value, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(() =>
                alert("Post successfully deleted from reading list."),
                window.location.reload()
            );
    }

    if (data && data['ReadingList'].length > 0) {

        return (

            <Stack spacing={2}>
                <h1>Reading List</h1>
                {data['ReadingList'].map(item => (
                    <Card sx={{ maxWidth: "auto", boxShadow: "5px 5px #e0e0e0" }} key={item.PostsUId}>
                        <CardActionArea>
                            <CardContent>
                                <Link to={"/post/" + item.PostsUId} key={item.PostsUId} style={{ textDecoration: 'none', color: "black" }}>
                                    <Typography sx={{ display: 'flex', fontWeight: "bold", textAlign: 'left' }} gutterBottom variant="h5" component="div">
                                        {item.Title}
                                    </Typography>
                                </Link>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex' }} >
                                    {item.Summary}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        {item.Image &&
                            <CardMedia
                                component="img"
                                height="150"
                                image={require("../images/" + item.Image)}
                                alt={item.Title}
                            />
                        }
                        <CardActions sx={{ fontSize: 11 }}>
                            <div >{new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
                            <Divider orientation="vertical" flexItem style={{ marginLeft: "10px" }} />
                            <div>
                                {item.TagList && item.TagList.length ? item.TagList.join(", ") : "No Tags"}
                            </div>

                            <div style={{ marginLeft: 'auto' }}>
                                <Button onClick={() => handleClick(item.PostsUId)} id="delete1">
                                    <DeleteIcon sx={{ color: "#cb1010", marginBottom: "0.6em" }} />
                                </Button>
                            </div>
                        </CardActions>
                    </Card>

                ))}
            </Stack>

        );

    }
    else return (
        <Stack spacing={2}>
            <h1>Reading List</h1>
            <h4>No posts in your reading list</h4>
        </Stack>
    )
}

export default ReadingList