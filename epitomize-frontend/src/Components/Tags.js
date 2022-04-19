import Button from '@mui/material/Button';
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import configData from "../config.json";


function Tags() {

    const baseURL = configData.BACKEND_URL
    const cookies = new Cookies();
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }
        axios.get(baseURL + 'topTags', { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                setData(response.data);
            });
    }, []);

    

   const chipFilter = (item) => {
    window.location = "/tagsposts/" + item 
  };

    if (data && data['TagList'] !== null) {

        return (
            <div>
                <h2 className="font-link">Recommended Topics: </h2>
                <Stack direction="row" spacing={1}>
                    {
                                          
                        data['TagList'].map(item => (
                            <Chip label={item} size="medium" variant="filled" key={item} clickable={true} style={{fontFamily: "Playfair Display"}}
                            onClick={() => chipFilter(item)}/>
                        ))
                        
                    }
                </Stack>
            </div>
        )
    }
    else {
        return (
            <div>
                <h2 className="font-link">Recommended Topics: </h2>
                <Button sx={{ textTransform: 'none', color: "black", fontSize: 20, fontFamily: "Playfair Display" }}>
                    No tags
                </Button>
            </div>

        );
    }
}

export default Tags;