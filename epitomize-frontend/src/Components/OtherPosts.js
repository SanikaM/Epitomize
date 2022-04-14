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
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';

function OtherPosts() {

    const baseURL = "http://localhost:8081/"
    const cookies = new Cookies();
    const [followingData, setFollowingData] = React.useState(null);
    const [recommendedData, setRecommendedData] = React.useState(null);

    React.useEffect(() => {
        const tokenStr = cookies.get('access_token')

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

    // if (followingData && followingData !== "undefined" && recommendedData && recommendedData !== "undefined") {
        if (followingData  && followingData.length > 0 ) {

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
                                    <CardActions sx={{ fontSize: 11 }}>
                                        <div >{new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
                                        <Divider orientation="vertical" flexItem style={{ marginLeft: "10px" }} />
                                        <div>
                                            {item.TagList && item.TagList.length ? item.TagList.join(", ") : "No Tags"}
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
                                    <CardActions sx={{ fontSize: 11 }}>
                                        <div >{new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
                                        <Divider orientation="vertical" flexItem style={{ marginLeft: "10px" }} />
                                        <div>
                                            {item.TagList && item.TagList.length ? item.TagList.join(", ") : "No Tags"}
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
