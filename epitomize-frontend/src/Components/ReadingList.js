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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import configData from "../config.json";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function ReadingList() {
    const baseURL = configData.BACKEND_URL
    const cookies = new Cookies();
    const [data, setData] = React.useState(null);

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
                setSeverity("success"),
                setState({
                    open: true, ...{
                        vertical: 'top',
                        horizontal: 'center',
                    }
                }),
                setResponse("Post successfully deleted from reading list."),
                window.location.reload()
            );
    }

    function handleLikeClick(value) {
        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }

        axios.get(baseURL + "react/" + value, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(() =>
                setSeverity("success"),
                setState({
                    open: true, ...{
                        vertical: 'top',
                        horizontal: 'center',
                    }
                }),
                setResponse("Post liked"),
                window.location.reload()
            );
    }

    function handleUnLikeClick(value) {
        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }

        axios.delete(baseURL + "react/" + value, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(() =>
                setSeverity("success"),
                setState({
                    open: true, ...{
                        vertical: 'top',
                        horizontal: 'center',
                    }
                }),
                setResponse("Post unliked"),
                window.location.reload()
            );
    }

    if (data && data['ReadingList'].length > 0) {

        return (

            <Stack spacing={2}>
                <h1 className="font-link">My Reading List</h1>
                {data['ReadingList'].map(item => (
                    <Card sx={{ maxWidth: "auto", boxShadow: "5px 5px #e0e0e0" }} key={item.PostsUId}>
                        <CardActionArea>
                            <CardContent>
                                <Link to={"/post/" + item.PostsUId} key={item.PostsUId} style={{ textDecoration: 'none', color: "black" }}>
                                    <Typography sx={{ display: 'flex', fontWeight: "bold", textAlign: 'left', fontFamily: "Playfair Display" }} gutterBottom variant="h5" component="div">
                                        {item.Title}
                                    </Typography>
                                </Link>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', fontFamily: "Playfair Display" }} >
                                    {item.Summary}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', fontFamily: "Playfair Display" }} >
                                    Author - {item.Username}
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
                            <div style={{ fontFamily: "Playfair Display" }}>{new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
                            <Divider orientation="vertical" flexItem style={{ marginLeft: "10px" }} />
                            <div style={{ fontFamily: "Playfair Display" }}>
                                {item.TagList && item.TagList.length ? item.TagList.join(", ") : "No Tags"}
                            </div>

                            <div style={{ marginLeft: 'auto' }}>
                                <label style={{ color: "#2E86C1", fontSize: 18 }}> {item.ReactionCount} </label>

                                {item.CurrentUserReact ? <Button onClick={() => handleUnLikeClick(item.PostsUId)} id="unlikeId">
                                    <ThumbDownOffAltIcon sx={{ color: "#2E86C1", marginBottom: "0.6em" }} />
                                </Button>
                                    :
                                    <Button onClick={() => handleLikeClick(item.PostsUId)} id="likeId">
                                        <ThumbUpIcon sx={{ color: "#2E86C1", marginBottom: "0.6em" }} />
                                    </Button>

                                }

                                <Button onClick={() => handleClick(item.PostsUId)} id="delete1">
                                    <DeleteIcon sx={{ color: "#cb1010", marginBottom: "0.6em" }} />
                                </Button>
                            </div>
                        </CardActions>
                    </Card>

                ))}
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    key={vertical + horizontal}
                >
                    <Alert severity={severity}>{apiResponse}</Alert>
                </Snackbar>
            </Stack>

        );

    }
    else return (
        <Stack spacing={2}>
            <h1 className="font-link">Reading List</h1>
            <h4 className="font-link">No posts in your reading list</h4>
        </Stack>
    )
}

export default ReadingList