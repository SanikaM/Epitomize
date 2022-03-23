import './App.css';
import Header from './Header';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Components from './Components';
import Tags from './Components/Tags'
import SignIn from './Components/Signin';
import * as React from 'react';
import Cookies from 'universal-cookie';


function App() {
  const cookies = new Cookies();

  if (cookies.get('user') === "Authorized") {
    return (

      <div className="App">
        <Header />
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" m={2} pt={3}>
          <Box gridColumn="span 8">
            <Components />
          </Box>
          <Divider orientation="vertical" flexItem style={{ marginRight: "30px" }} />
          <Box gridColumn="span 3">
            <Tags />
          </Box>
        </Box>
      </div>
    )
  }
  else {
    return (
      <SignIn />
    )
  }

}

export default App;