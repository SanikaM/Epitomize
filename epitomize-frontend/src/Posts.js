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
  const baseURL = "http://0.0.0.0:8081/"

  const data = {
    "Posts": [
      {
        "CreatedAt": "2022-02-02T13:11:52.722628-05:00",
        "UpdatedAt": "2022-02-02T13:11:52.722628-05:00",
        "DeletedAt": null,
        "ID": 1,
        "Type": "Tech",
        "Title": "Why every software engineer should use vim",
        "Summary": "Conquer the quitting vim fear and give it a go",
        "Content": "Kuch bhi",
        "Linked_Post": 0,
        "Status": "Draft"
      },
      {
        "CreatedAt": "2022-02-02T13:11:52.722628-05:00",
        "UpdatedAt": "2022-02-02T13:11:52.722628-05:00",
        "DeletedAt": null,
        "ID": 2,
        "Type": "Tech",
        "Title": "21 lessons I wish I’d known earlier in my software engineering career.",
        "Summary": "Learning programming is hard. I felt like quitting 6 years back when I started my web development journey.",
        "Content": "Kuch bhi",
        "Linked_Post": 0,
        "Status": "Draft2"
      },
      {
        "CreatedAt": "2022-02-02T13:11:52.722628-05:00",
        "UpdatedAt": "2022-02-02T13:11:52.722628-05:00",
        "DeletedAt": null,
        "ID": 3,
        "Type": "Tech",
        "Title": "Why every software engineer should use vim",
        "Summary": "Conquer the quitting vim fear and give it a go",
        "Content": "Kuch bhi",
        "Linked_Post": 0,
        "Status": "Draft"
      },
      {
        "CreatedAt": "2022-02-02T13:11:52.722628-05:00",
        "UpdatedAt": "2022-02-02T13:11:52.722628-05:00",
        "DeletedAt": null,
        "ID": 4,
        "Type": "Tech",
        "Title": "21 lessons I wish I’d known earlier in my software engineering career.",
        "Summary": "Learning programming is hard. I felt like quitting 6 years back when I started my web development journey.",
        "Content": "Kuch bhi",
        "Linked_Post": 0,
        "Status": "Draft2"
      },
      {
        "CreatedAt": "2022-02-02T13:11:52.722628-05:00",
        "UpdatedAt": "2022-02-02T13:11:52.722628-05:00",
        "DeletedAt": null,
        "ID": 5,
        "Type": "Tech",
        "Title": "Why every software engineer should use vim",
        "Summary": "Conquer the quitting vim fear and give it a go",
        "Content": "Kuch bhi",
        "Linked_Post": 0,
        "Status": "Draft"
      },
      {
        "CreatedAt": "2022-02-02T13:11:52.722628-05:00",
        "UpdatedAt": "2022-02-02T13:11:52.722628-05:00",
        "DeletedAt": null,
        "ID": 6,
        "Type": "Tech",
        "Title": "21 lessons I wish I’d known earlier in my software engineering career.",
        "Summary": "Learning programming is hard. I felt like quitting 6 years back when I started my web development journey.",
        "Content": "Kuch bhi",
        "Linked_Post": 0,
        "Status": "Draft2"
      },
      {
        "CreatedAt": "2022-02-02T13:11:52.722628-05:00",
        "UpdatedAt": "2022-02-02T13:11:52.722628-05:00",
        "DeletedAt": null,
        "ID": 7,
        "Type": "Tech",
        "Title": "Why every software engineer should use vim",
        "Summary": "Conquer the quitting vim fear and give it a go",
        "Content": "Kuch bhi",
        "Linked_Post": 0,
        "Status": "Draft"
      },
      {
        "CreatedAt": "2022-02-02T13:11:52.722628-05:00",
        "UpdatedAt": "2022-02-02T13:11:52.722628-05:00",
        "DeletedAt": null,
        "ID": 8,
        "Type": "Tech",
        "Title": "21 lessons I wish I’d known earlier in my software engineering career.",
        "Summary": "Learning programming is hard. I felt like quitting 6 years back when I started my web development journey.",
        "Content": "Kuch bhi",
        "Linked_Post": 0,
        "Status": "Draft2"
      },
      {
        "CreatedAt": "2022-02-02T13:11:52.722628-05:00",
        "UpdatedAt": "2022-02-02T13:11:52.722628-05:00",
        "DeletedAt": null,
        "ID": 9,
        "Type": "Tech",
        "Title": "Why every software engineer should use vim",
        "Summary": "Conquer the quitting vim fear and give it a go",
        "Content": "Kuch bhi",
        "Linked_Post": 0,
        "Status": "Draft"
      },
      {
        "CreatedAt": "2022-02-02T13:11:52.722628-05:00",
        "UpdatedAt": "2022-02-02T13:11:52.722628-05:00",
        "DeletedAt": null,
        "ID": 10,
        "Type": "Tech",
        "Title": "21 lessons I wish I’d known earlier in my software engineering career.",
        "Summary": "Learning programming is hard. I felt like quitting 6 years back when I started my web development journey.",
        "Content": "Kuch bhi",
        "Linked_Post": 0,
        "Status": "Draft2"
      }
    ]
  }

  const DATE_OPTIONS = {year: 'numeric', month: 'short', day: 'numeric' };

  function handleClick(value) {
      axios.delete(`${baseURL}deletePost/${value}`)
        .then(() => this.setState({ status: 'Delete successful' }));
  }

  return (

    <Stack spacing={2}>
      {data['Posts'].map(item => (
        <Card sx={{ maxWidth: "auto", boxShadow: "5px 5px #e0e0e0" }} key={item.ID}>
        <CardActionArea>
          <CardContent>
            <Typography sx={{ display: 'flex', fontWeight: "bold" }} gutterBottom variant="h5" component="div">
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
          <div>{item.Status}</div>
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