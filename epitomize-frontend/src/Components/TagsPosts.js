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
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import jwt_decode from "jwt-decode";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import configData from "../config.json";
import {
  useParams
} from "react-router-dom";

function TagsPosts() {
  const baseURL = configData.BACKEND_URL
  const cookies = new Cookies();
  const [data, setData] = React.useState(null);
  const [numLikes, setNumLikes] = React.useState(null);
  const likeFlag = false;
  let { tag } = useParams();

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

  if (data && data['TagPosts'].length > 0)
    return (

      <Stack spacing={2}>

        {data['TagPosts'].map(item => (
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
                  Author - {item.userId}
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


              </div>
            </CardActions>
          </Card>

        ))}
      </Stack>

    );
  else return (
    <Stack spacing={2}>
      <h4>No posts for this tag</h4>
    </Stack>
  )
}

export default TagsPosts