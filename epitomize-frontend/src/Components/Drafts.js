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
import Publish from '@mui/icons-material/Publish';
import jwt_decode from 'jwt-decode';
import configData from "../config.json";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Drafts() {
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
        axios.get(baseURL + 'draft', { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                setData(response.data);
                console.log(data)
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
        axios.delete(baseURL + "deleteposts/" + value.toString(), { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(() =>
                setSeverity("success"),
                setState({
                    open: true, ...{
                        vertical: 'top',
                        horizontal: 'center',
                    }
                }),
                setResponse("Draft successfully deleted."),
                window.location.reload()
            );
    }

    function handlePublish(value) {
        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }
        axios.get(baseURL + "toPost/" + value.toString(), { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(() =>
                setSeverity("success"),
                setState({
                    open: true, ...{
                        vertical: 'top',
                        horizontal: 'center',
                    }
                }),
                setResponse("Draft successfully published."),
                window.location = '/myposts'
            );
    }


    if (data && data['Posts'].length > 0)
        return (

            <Stack spacing={2}>
                <h1 className="font-link">My Drafts</h1>

                {data['Posts'].map(item => (
                    <Card sx={{ maxWidth: "auto", boxShadow: "5px 5px #e0e0e0" }} key={item.PostsUId}>
                        <CardActionArea>
                            <CardContent>
                                <Link to={"/draft/" + item.PostsUId} key={item.PostsUId} style={{ textDecoration: 'none', color: "black" }}>
                                    <Typography sx={{ display: 'flex', fontWeight: "bold", textAlign: 'left', fontFamily: "Playfair Display" }} gutterBottom variant="h5" component="div">
                                        {item.Title}
                                    </Typography>
                                </Link>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', fontFamily: "Playfair Display" }} >
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
                            <div className="font-link">{new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
                            <Divider orientation="vertical" flexItem style={{ marginLeft: "10px" }} />
                            <div className="font-link">
                                {item.TagList && item.TagList.length ? item.TagList.join(", ") : "No Tags"}
                            </div>

                            <div style={{ marginLeft: 'auto' }}>
                                <Button onClick={() => handlePublish(item.PostsUId)} id={"publish" + item.PostsUId}>
                                    <Publish sx={{ color: "#2ea1da" }} />
                                </Button>

                                <Button onClick={() => handleClick(item.PostsUId)} id={"delete" + item.PostsUId}>
                                    <DeleteIcon sx={{ color: "#cb1010" }} />
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

    else return (
        <Stack spacing={2}>
            <h1 className="font-link">My Drafts</h1>
            <h4 className="font-link">No drafts</h4>
        </Stack>
    )
}

export default Drafts