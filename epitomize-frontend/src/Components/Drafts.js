import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';


function Drafts() {
    const baseURL = "http://localhost:8081/"
    const cookies = new Cookies();
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const tokenStr = cookies.get('access_token')
        axios.get(baseURL + 'mydrafts', { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                setData(response.data);
            });
    }, []);

    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

    function handleClick(value) {
        const tokenStr = cookies.get('access_token')
        axios.delete(baseURL + "deleteposts/" + value.toString(), { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(() =>
                alert("Post successfully deleted."),
                window.location.reload()
            );
    }

    if (!data) return (
        <Stack spacing={2}>
            <h1>My Drafts</h1>
            <h4>No drafts</h4>
        </Stack>
    )
    else
        return (

            <Stack spacing={2}>
                {data['Posts'].map(item => (
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
                        <CardMedia
                            component="img"
                            height="150"
                            image={require('../images/Screen Shot 2022-01-17 at 9.16.48 PM.png')}
                            alt={item.Title}
                        />
                        <CardActions sx={{ fontSize: 11 }}>
                            <div >{new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
                            <Divider orientation="vertical" flexItem style={{ marginLeft: "10px" }} />
                            <div>
                                {item.TagList && item.TagList.length ? item.TagList.join(", ") : "No Tags"}
                            </div>

                            <div style={{ marginLeft: 'auto' }}>
                                <Link to={"/edit/" + item.PostsUId} key={item.PostsUId} style={{ textDecoration: 'none', color: "black" }} >
                                    <EditIcon sx={{ color: "#b3e6ff" }} />
                                </Link>

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

export default Drafts