import * as React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import axios from "axios";
import Stack from '@mui/material/Stack';
import Cookies from 'universal-cookie';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import jwt_decode from 'jwt-decode';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import configData from "../config.json";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function OtherPosts() {

    const baseURL = configData.BACKEND_URL
    const cookies = new Cookies();
    const [followingData, setFollowingData] = React.useState(null);
    const [recommendedData, setRecommendedData] = React.useState(null);
    const [value, setValue] = React.useState('1');

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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

    React.useEffect(() => {
        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }

        axios.get(baseURL + 'user/feed', { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                console.log(response.data)
                setFollowingData(response.data);
            });

        axios.get(baseURL + 'user/recommended', { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                console.log(response.data)
                setRecommendedData(response.data);
            });

    }, []);

    function handleReadingList(postid) {
        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }
        axios.get(baseURL + "readinglist/" + postid, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                setSeverity("success")
                setState({
                    open: true, ...{
                        vertical: 'top',
                        horizontal: 'center',
                    }
                });
                setResponse("Added to reading list")
                window.location = "/myreadinglist"
            })
            .catch((error) => {
                // error response
                console.log(error)
            });
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

    if (followingData && followingData.length > 0) {

        return (
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="Posts">
                            <Tab label="Following" value="1" style={{ fontFamily: "Playfair Display" }} />
                            <Divider orientation="vertical" flexItem style={{ height: "25px", marginTop: "10px" }} />
                            <Tab label="Recommended" value="2" style={{ fontFamily: "Playfair Display" }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Stack spacing={2}>
                            {followingData.map(item => (
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
                                        <div style={{ fontFamily: "Playfair Display" }} >{new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
                                        <Divider orientation="vertical" flexItem style={{ marginLeft: "10px" }} />
                                        <div style={{ fontFamily: "Playfair Display" }}>
                                            {item.TagList && item.TagList.length ? item.TagList.join(", ") : "No Tags"}
                                        </div>
                                        <div style={{ marginLeft: 'auto' }}>

                                            <label style={{ color: "#2E86C1", fontSize: 18 }}> {item.ReactionCount} </label>

                                            {item.CurrentUserReact ? <Button onClick={() => handleUnLikeClick(item.PostsUId)} id={"unlikeId" + item.PostsUId}>
                                                <ThumbDownOffAltIcon sx={{ color: "#2E86C1", marginBottom: "0.6em" }} />
                                            </Button>
                                                :
                                                <Button onClick={() => handleLikeClick(item.PostsUId)} id={"likeId" + item.PostsUId}>
                                                    <ThumbUpIcon sx={{ color: "#2E86C1", marginBottom: "0.6em" }} />
                                                </Button>

                                            }

                                            <Button sx={{ border: "0.01em solid #3f3f3f" }} id={"readinglist" + item.PostsUId}>
                                                <Typography sx={{ color: "#3f3f3f", textTransform: "capitalize", fontFamily: "Playfair Display" }} onClick={() => handleReadingList(item.PostsUId)}>Add to Reading List</Typography>
                                            </Button>
                                        </div>
                                    </CardActions>
                                </Card>

                            ))}
                        </Stack>
                    </TabPanel>
                    <TabPanel value="2">
                        <Stack spacing={2}>
                            {recommendedData && recommendedData.map(item => (
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
                                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex' }} >
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
                                        <div >{new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
                                        <Divider orientation="vertical" flexItem style={{ marginLeft: "10px" }} />
                                        <div>
                                            {item.TagList && item.TagList.length ? item.TagList.join(", ") : "No Tags"}
                                        </div>
                                        <div style={{ marginLeft: 'auto' }}>

                                            <label style={{ color: "#2E86C1", fontSize: 18 }}> {item.ReactionCount} </label>

                                            {item.CurrentUserReact ? <Button onClick={() => handleUnLikeClick(item.PostsUId)} id="lunikeId">
                                                <ThumbDownOffAltIcon sx={{ color: "#2E86C1", marginBottom: "0.6em" }} />
                                            </Button>
                                                :
                                                <Button onClick={() => handleLikeClick(item.PostsUId)} id="likeId">
                                                    <ThumbUpIcon sx={{ color: "#2E86C1", marginBottom: "0.6em" }} />
                                                </Button>

                                            }
                                            <Button sx={{ border: "0.01em solid #3f3f3f" }} id="readinglist">
                                                <Typography sx={{ color: "#3f3f3f", textTransform: "capitalize", fontFamily: "Raleway" }} onClick={() => handleReadingList(item.PostsUId)}>Add to Reading List</Typography>
                                            </Button>
                                        </div>
                                    </CardActions>
                                </Card>

                            ))}
                        </Stack>
                    </TabPanel>
                </TabContext>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    key={vertical + horizontal}
                >
                    <Alert severity={severity}>{apiResponse}</Alert>
                </Snackbar>
            </Box>

        );
    }
    else {
        return (
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="Posts">
                            <Tab label="Following" value="1" style={{ fontFamily: "Playfair Display" }} />
                            <Tab label="Recommended" value="2" style={{ fontFamily: "Playfair Display" }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1" style={{ fontFamily: "Playfair Display" }}>
                        Follow people to see their posts...

                    </TabPanel>
                    <TabPanel vaue="2" style={{ fontFamily: "Playfair Display" }}>
                        Recommended tags posts will be available soon..
                    </TabPanel>
                </TabContext>
            </Box>
        );
    }
}

export default OtherPosts;
