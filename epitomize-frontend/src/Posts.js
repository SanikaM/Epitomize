import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from 'axios';

function Posts() {
  const baseURL = "http://localhost:8081/"

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL + 'sendposts')
    .then((response) => {
      console.log(response.data)
      setData(response.data);
    });
  }, []); 

  if (!data) return null;

  const DATE_OPTIONS = {year: 'numeric', month: 'short', day: 'numeric' };

  function handleClick(value) {
      axios.delete(`${baseURL}deleteposts/${value}`)
        .then(() => this.setState({ status: 'Delete successful' }));
  }

  return (

    <Stack spacing={2}>
      {data['Posts'].map(item => (
        <Card sx={{ maxWidth: "auto", boxShadow: "5px 5px #e0e0e0" }} key={item.ID}>
        <CardActionArea>
          <CardContent>
            <Typography sx={{ display: 'flex', fontWeight: "bold", textAlign: 'left' }} gutterBottom variant="h5" component="div">
              {item.Title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex'}} >
              {item.Summary}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ fontSize: 11 }}>
          <div >{new Date(item.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
          <Divider orientation="vertical" flexItem style={{marginLeft:"10px"}} />
          <div>
            {item.TagList && item.TagList.length <= 0 ? null: item.TagList.join(", ")}
          </div>
          <Button style={{  marginLeft: 'auto'  }} onClick = {() => handleClick(item.ID)}>
            <DeleteIcon sx={{ color: "#cb1010" }}/>
          </Button>
        </CardActions>
      </Card>
        
      ))}
    </Stack>

  );
}

export default Posts