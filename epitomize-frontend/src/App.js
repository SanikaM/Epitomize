import './App.css';
import Header from './Header';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Components from './Components';
import * as React from 'react';
import axios from 'axios';

function App() {
 
  const baseURL = "http://localhost:8081/"

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL + 'topTags')
      .then((response) => {
        console.log(response.data)
        setData(response.data);
      });
  }, []);

  if (data && data['TagList'] !== null ) {

  return (
    <>
   

    <div className="App">
      <Header />
      
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)"  m={2} pt={3}>
        <Box gridColumn="span 8">
          <Components />
        </Box>
        <Divider orientation="vertical" flexItem style={{marginRight:"30px"}} />
        <Box gridColumn="span 3">
          <h2>Recommended Topics: </h2>
          
            
            {data['TagList'].map(item => (
              <Button sx={{ textTransform: 'none', color: "black", fontFamily: 'Segoe UI', fontSize: 20}}>
                {item}
              </Button>
               ))}
          
          
        </Box>
        
      </Box>
     
    </div>
     
     </>
  );
    }
    else {
    return(
      <div className="App">
      <Header />
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)"  m={2} pt={3}>
        <Box gridColumn="span 8">
          <Components />
        </Box>
        <Divider orientation="vertical" flexItem style={{marginRight:"30px"}} />
        <Box gridColumn="span 3">
          <h2>Recommended Topics: </h2>
          <Button sx={{ textTransform: 'none', color: "black", fontFamily: 'Segoe UI', fontSize: 20}}>
            No tags
          </Button>
          
        </Box>
        
      </Box>
    </div>

    );
    }
}

export default App;