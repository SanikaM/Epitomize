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
import { Link } from 'react-router-dom';


function Posts() {
  const baseURL = "http://localhost:8081/"

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL + 'post')
      .then((response) => {
        setData(response.data);
      });
  }, []);

  if (!data) return null;

  const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

  function handleClick(value) {
    axios.delete(baseURL + "deleteposts/" + value.toString())
      .then(() =>
        alert( "Post successfully deleted." ),
        window.location.reload()
      );
  }

  return (

    <Stack spacing={2}>
      <Link to="/create" style={{ textDecoration: 'none', textAlign: "center" }}>
        <Button variant="contained" sx={{ ':hover': {background: '#b3e6ff'},textTransform: 'none', color: "black", background: "white"}}>
          Create New Post
        </Button>
      </Link>
      {data['Posts'].map(item => (
        <Card sx={{ maxWidth: "auto", boxShadow: "5px 5px #e0e0e0" }} key={item.PostsUId}>
          <CardActionArea>
            <CardContent>
            <Link to={"/post/" + item.PostsUId} key={item.PostsUId} style={{ textDecoration: 'none', color: "black"}}>
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
            <div style={{ marginLeft: '75%' }}>
              
            <Link to={"/edit/" + item.PostsUId} key={item.PostsUId} style={{ textDecoration: 'none', color: "black"}} >
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

  );
}

export default Posts