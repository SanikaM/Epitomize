import * as React from 'react';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import axios from "axios";
import Stack from '@mui/material/Stack';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

function OtherPosts() {

    const baseURL = "http://localhost:8081/"
    const [followingData, setFollowingData] = React.useState(null);
    const [recommendedData, setRecommendedData] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL + 'post')
            .then((response) => {
                console.log(response.data)
                setFollowingData(response.data);
            });

        axios.get(baseURL + 'topTags')
            .then((response) => {
                setRecommendedData(response.data);
            });

    }, []);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

    function handleClick(value) {
        axios.delete(baseURL + "deleteposts/" + value.toString())
            .then(() =>
                alert("Post successfully deleted."),
                window.location.reload()
            );
    }

    if (followingData && followingData['Posts'] !== null && recommendedData) {
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
                        <Stack spacing={2}>
                            {followingData['Posts'].map(item => (
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
                                    <CardActions sx={{ fontSize: 11 }}>
                                        <div >{new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
                                        <Divider orientation="vertical" flexItem style={{ marginLeft: "10px" }} />
                                        <div>
                                            {item.TagList && item.TagList.length ? item.TagList.join(", ") : "No Tags"}
                                        </div>
                                        <div style={{ marginLeft: '80%' }}>

                                            <Link to={"/edit/" + item.PostsUId} key={item.PostsUId} style={{ textDecoration: 'none', color: "black" }} >
                                                <EditIcon sx={{ color: "#b3e6ff" }} />
                                            </Link>
                                        </div>

                                        <div style={{ marginLeft: 'auto' }}>

                                            <Button onClick={() => handleClick(item.PostsUId)} id="delete1">
                                                <DeleteIcon sx={{ color: "#cb1010" }} />
                                            </Button>
                                        </div>
                                    </CardActions>
                                </Card>

                            ))}
                        </Stack>
                    </TabPanel>
                    <TabPanel value="2">
                        <Stack spacing={2}>
                            {followingData['Posts'].map(item => (
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
                                    <CardActions sx={{ fontSize: 11 }}>
                                        <div >{new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
                                        <Divider orientation="vertical" flexItem style={{ marginLeft: "10px" }} />
                                        <div>
                                            {item.TagList && item.TagList.length ? item.TagList.join(", ") : "No Tags"}
                                        </div>
                                        <div style={{ marginLeft: '80%' }}>

                                            <Link to={"/edit/" + item.PostsUId} key={item.PostsUId} style={{ textDecoration: 'none', color: "black" }} >
                                                <EditIcon sx={{ color: "#b3e6ff" }} />
                                            </Link>
                                        </div>

                                        <div style={{ marginLeft: 'auto' }}>

                                            <Button onClick={() => handleClick(item.PostsUId)} id="delete1">
                                                <DeleteIcon sx={{ color: "#cb1010" }} />
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
                    {/* <TabPanel value="2">{recommendedData['TagList'][0]}</TabPanel> */}
                    <TabPanel vaue="2">
                        Top tags posts will be available soon..
                    </TabPanel>
                </TabContext>
            </Box>
        );
    }
}

export default OtherPosts;
