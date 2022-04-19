import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {
  Link,
  useParams
} from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import jwt_decode from "jwt-decode";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import configData from "../config.json";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function TagsPosts() {
  const baseURL = configData.BACKEND_URL
  const cookies = new Cookies();
  const [data, setData] = React.useState(null);
  const [numLikes, setNumLikes] = React.useState(null);
  const likeFlag = false;
  let { tag } = useParams();
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
    axios.get(baseURL + 'post/tag/' + tag, { headers: { "Authorization": `Bearer ${tokenStr}` } })
      .then((response) => {
        console.log(response.data)
        setData(response.data);
      });


  }, []);

  if (!data) return null;

  const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

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

  function handleClick(value) {
    const tokenStr = cookies.get('access_token')
    let decodedToken = jwt_decode(tokenStr);
    let currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      cookies.remove("access_token", { path: '/' })
      window.location = "/"
    }

  }

  function handleLikeClick(value) {
    const tokenStr = cookies.get('access_token')
    let decodedToken = jwt_decode(tokenStr);
    let currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      cookies.remove("access_token", { path: '/' })
      window.location = "/"
    }
  }

  if (data && data['TagPosts'].length > 0)
    return (

      <Stack spacing={2}>
        <h1 className="font-link">{tag} </h1>
        {data['TagPosts'].map(item => (
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


              <div style={{ marginLeft: 'auto', fontFamily: "Playfair Display" }}>

                {likeFlag && <label style={{ color: "#b3e6ff", marginBottom: "0.6em", fontSize: 18 }}> 10 &nbsp;</label>
                }
                {likeFlag && <Button onClick={() => handleLikeClick(item.PostsUId)} id="likeId">
                  <ThumbUpOutlinedIcon sx={{ color: "#b3e6ff", marginBottom: "0.6em" }} />
                </Button>}

                {!likeFlag && <label style={{ color: "#b3e6ff", marginBottom: "0.6em", fontSize: 18 }}> 10 &nbsp;</label>
                }
                {!likeFlag && <Button onClick={() => handleLikeClick(item.PostsUId)} id="likeId">
                  <ThumbUpIcon sx={{ color: "#b3e6ff", marginBottom: "0.6em" }} />
                </Button>}
                <Button sx={{ border: "0.01em solid #3f3f3f" }} id="readinglist">
                  <Typography sx={{ color: "#3f3f3f", textTransform: "capitalize", fontFamily: "Playfair Display" }} onClick={() => handleReadingList(item.PostsUId)}>Add to Reading List</Typography>
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
      <h1 className="font-link">{tag} </h1>
      <h4 className="font-link">No posts for this tag</h4>
    </Stack>
  )
}

export default TagsPosts