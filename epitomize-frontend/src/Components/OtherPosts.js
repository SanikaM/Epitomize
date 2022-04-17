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
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

var likeFlag = true;

function OtherPosts() {

    const baseURL = "http://localhost:8081/"
    const cookies = new Cookies();
    const [followingData, setFollowingData] = React.useState(null);
    const [recommendedData, setRecommendedData] = React.useState(null);

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

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

    function handleLikeClick(value) {
        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          cookies.remove("access_token", { path: '/' })
          window.location = "/"
        }
       /* if(likeFlag == true) {
        axios.post(baseURL + "likepost/" + value.toString(), { headers: { "Authorization": `Bearer ${tokenStr}` } })
          .then(() =>
            alert("this item is liked"),
          );
        }
        else
        {
          axios.delete(baseURL + "likepost/" + value.toString(), { headers: { "Authorization": `Bearer ${tokenStr}` } })
          .then(() =>
            alert("this item is unliked"),
           
          );
        } */
    
          //  this.data.likeFlag = !this.data.likeFlag;
      }

    // if (followingData && followingData !== "undefined" && recommendedData && recommendedData !== "undefined") {
    if (followingData && followingData.length > 0) {

        return (
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="Posts">
                            <Tab label="Following" value="1" />
                            <Divider orientation="vertical" flexItem style={{ height: "25px", marginTop: "10px" }} />
                            <Tab label="Recommended" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Stack spacing={2}>
                            {followingData.map(item => (
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

                                            {likeFlag && <label style={{color: "#2E86C1", fontSize: 18}}> 10 &nbsp;</label>
                                            }
                                            {likeFlag && <Button onClick={() => handleLikeClick(item.PostsUId)} id="likeId">
                                            <ThumbUpOutlinedIcon sx={{ color: "#2E86C1", marginBottom: "0.6em"}} />
                                            </Button>}

                                            {!likeFlag && <label style={{color: "#2E86C1", fontSize: 18}}> 10 &nbsp;</label>
                                            }
                                            {!likeFlag && <Button onClick={() => handleLikeClick(item.PostsUId)} id="likeId">
                                            <ThumbUpIcon sx={{ color: "#2E86C1", marginBottom: "0.6em" }} />
                                            </Button>}

                                            <Button sx={{ border: "0.01em solid #3f3f3f" }} id="readinglist">
                                                <Typography sx={{ color: "#3f3f3f", textTransform: "capitalize", fontFamily: "Raleway" }}>Add to Reading List</Typography>
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

                                         {likeFlag && <label style={{color: "#2E86C1", fontSize: 18}}> 10 &nbsp;</label>
                                            }
                                            {likeFlag && <Button onClick={() => handleLikeClick(item.PostsUId)} id="likeId">
                                            <ThumbUpOutlinedIcon sx={{ color: "#2E86C1", marginBottom: "0.6em"}} />
                                            </Button>}

                                            {!likeFlag && <label style={{color: "#2E86C1", fontSize: 18}}> 10 &nbsp;</label>
                                            }
                                            {!likeFlag && <Button onClick={() => handleLikeClick(item.PostsUId)} id="likeId">
                                            <ThumbUpIcon sx={{ color: "#2E86C1", marginBottom: "0.6em" }} />
                                            </Button>}

                                            <Button sx={{ border: "0.01em solid #3f3f3f" }} id="readinglist">
                                                <Typography sx={{ color: "#3f3f3f", textTransform: "capitalize", fontFamily: "Raleway" }}>Add to Reading List</Typography>
                                            </Button>
                                        </div>
                                    </CardActions>
                                </Card>

                            ))}
                        </Stack>
                    </TabPanel>
                </TabContext>
            </Box>
        );
    }
    else {
        return (
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="Posts">
                            <Tab label="Following" value="1" />
                            <Tab label="Recommended" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        Follow people to see their posts...

                    </TabPanel>
                    <TabPanel vaue="2">
                        Recommended tags posts will be available soon..
                    </TabPanel>
                </TabContext>
            </Box>
        );
    }
}

export default OtherPosts;
