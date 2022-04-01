import './App.css';
import Header from './Header';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Components from './Components';
import Tags from './Components/Tags'
import SignIn from './Components/Signin';
import SignUp from './Components/Signup';
import * as React from 'react';
import Cookies from 'universal-cookie';
import Users from './Components/Users'
import Search from './Components/Search';

function App() {

  const cookies = new Cookies();
  if (cookies.get('access_token')) {
    return (

      <div className="App">
        <Header />
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" m={2} pt={3}>
          <Box gridColumn="span 8">
            <Components />
          </Box>
          {window.location.pathname !== "/alluser" && window.location.pathname !== "/searchresults" && window.location.pathname !== "/userprofile" &&
            <><Divider orientation="vertical" flexItem style={{ marginRight: "30px" }} />
              <Box gridColumn="span 3" id="sidebar">

                <Search />
                <Tags />
                <Users />
              </Box></>
          }
        </Box>
      </div>
    )
  }
  else {
    return (
      <div>
        {window.location.pathname === "/signup"  ?
          <SignUp />
        :

        <SignIn />
      }

      </div>

    )
  }

}

export default App;