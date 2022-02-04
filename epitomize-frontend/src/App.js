import './App.css';
import Header from './Header';
import Posts from './Posts'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CreatePost from './CreatePost.js';
import EditPost from './EditPost';

function App() {
  return (
    <div className="App">
      <Header />
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)"  m={2} pt={3}>
        <Box gridColumn="span 8">
          <Posts />
          <CreatePost />
          <EditPost />
        </Box>
        <Divider orientation="vertical" flexItem style={{marginRight:"30px"}} />
        <Box gridColumn="span 3">
          <h2>Recommended Topics: </h2>
          <Button sx={{ textTransform: 'none', color: "black", fontFamily: 'Segoe UI', fontSize: 20}}>
            Tech
          </Button>
          <Button sx={{ textTransform: 'none', color: "black", fontFamily: 'Segoe UI', fontSize: 20 }}>
            Gadgets
          </Button>
          <Button sx={{ textTransform: 'none', color: "black", fontFamily: 'Segoe UI', fontSize: 20}}>
            Space
          </Button>
          <Button sx={{ textTransform: 'none', color: "black", fontFamily: 'Segoe UI', fontSize: 20}}>
            Cybersecurity
          </Button>
          <Button sx={{ textTransform: 'none', color: "black", fontFamily: 'Segoe UI', fontSize: 20 }}>
            Languages
          </Button>
          <Button sx={{ textTransform: 'none', color: "black", fontFamily: 'Segoe UI', fontSize: 20}}>
            Startup
          </Button>
          <Button sx={{ textTransform: 'none', color: "black", fontFamily: 'Segoe UI', fontSize: 20 }}>
            Software Engineering
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default App;