import * as React from 'react';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Cookies from 'universal-cookie';
import {
    useParams
  } from "react-router-dom";

function Post() {
    const baseURL = "http://localhost:8081/";
    const [data, setData] = React.useState();
    const cookies = new Cookies();

    let { id } = useParams();
    const DATE_OPTIONS = { year: 'numeric', month: 'short', day: 'numeric' };

    React.useEffect(() => {
        const tokenStr = cookies.get('access_token')

        axios.get(baseURL + 'post/' + id, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                setData(response.data);
            });
    }, []);

    return (
        <div>
            {data !== undefined ?
            <div sx={{ display: 'flex', fontWeight: "bold", textAlign: 'left' }} >
            <h1 sx={{ display: 'flex', fontWeight: "bold", textAlign: 'left'}} style={{ textTransform: "capitalize"}}>{data.Title}</h1>
            <Divider style={{ marginBottom: "20px"}} />
            <Stack direction="row" spacing={2} style={{ textTransform: "capitalize"}}>
                <Chip label={data.Tags} color="primary" variant="outlined" />
                <Chip label={new Date(data.CreatedAt.split('-').join('/').split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)} color="success" variant="outlined" />
            </Stack>
            <Divider style={{marginTop: "20px",  marginBottom: "20px"}}/>
            <div sx={{textAlign: "justify"}}>
            {data.Content}
            </div>
            </div>
            : 
            <h1>No data</h1>
            }
        </div>
    )
}

export default Post