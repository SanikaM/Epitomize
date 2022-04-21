import * as React from 'react';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Cookies from 'universal-cookie';
import {
    useParams
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import Typography from '@mui/material/Typography';
import configData from "../config.json";

function Draft() {
    const baseURL = configData.BACKEND_URL
    const [data, setData] = React.useState();
    const cookies = new Cookies();

    let { id } = useParams();
    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

    React.useEffect(() => {
        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }
        axios.get(baseURL + 'draft/' + id, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                console.log(response.data)
                setData(response.data);
            });
    }, []);

    return (
        <div>
            {data !== undefined ?
                <div sx={{ display: 'flex', fontWeight: "bold", textAlign: 'left', fontFamily: "Playfair Display" }} >
                    {data.Image &&
                        <img src={require("../images/" + data.Image)} style={{ height: "300px", width: "100%" }} />
                    }
                    <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
                    <h1 sx={{ display: 'flex', fontWeight: "bold", textAlign: 'left' }} style={{ textTransform: "capitalize" }} className="font-link">{data.Title}</h1>
                    <Divider style={{ marginBottom: "20px" }} />
                    <Stack direction="row" spacing={2} style={{ textTransform: "capitalize" }}>
                        <Chip style={{fontFamily: "Playfair Display"}} label={data.Tags} color="primary" variant="outlined" />
                        <Chip style={{fontFamily: "Playfair Display"}} label={new Date(data.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)} color="success" variant="outlined" />
                    </Stack>
                    <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', fontFamily: "Playfair Display" }} >
                        Author - {data.userId}
                     </Typography>
                     <Divider style={{ marginTop: "20px", marginBottom: "20px" }} />
                    <div sx={{ textAlign: "justify", fontFamily: "Playfair Display" }}>
                        {data.Content}
                    </div>
                </div>
                :
                <h1 className="font-link">No data</h1>
            }
        </div>
    )
}

export default Draft