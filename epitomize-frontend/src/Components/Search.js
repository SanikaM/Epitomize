import React from 'react';
import { Box, TextField, InputAdornment, CardActionArea } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@material-ui/core/styles";
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import jwt_decode from "jwt-decode";
import configData from "../config.json";

const useStyles = makeStyles({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "#b0bec5",
            borderWidth: "2px"
        },
        "& .MuiOutlinedInput-input": {
            color: "#263238"
        },
        "& .MuiInputLabel-outlined": {
            color: "#000"
        }
    }
});

const handleRouteChange = (post_id) => {
    window.location = "/post/" + post_id;
}

const baseURL = configData.BACKEND_URL
const cookies = new Cookies();

function Search() {
    const [data, setData] = React.useState(null);

    const searchTags = (event) => {
        if (!(event.target.value)) {
            setData(null);
        }
        else {
            const tokenStr = cookies.get('access_token')
            let decodedToken = jwt_decode(tokenStr);
            let currentDate = new Date();
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                cookies.remove("access_token", { path: '/' })
                window.location = "/"
            }
            let body = {
                "Text": event.target.value
            }
            axios.post(baseURL + 'search', body, { headers: { "Authorization": `Bearer ${tokenStr}` } })
                .then((response) => {
                    setData(response.data);
                })
                .catch((error) => {
                    // error response
                    console.log(error)
                });
        }

    }

    const classes = useStyles();

    return (
        <div maxWidth="auto">
            <h2 className="font-link">Search: </h2>
            <Box
                display="flex"
            >
                <TextField fullWidth label="Search" id="outlined-search" type="search" onChange={searchTags}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "#000", fontSize: "medium" }} />
                            </InputAdornment>
                        )
                    }}
                    className={classes.root}
                />
            </Box>

            {data && data['Posts'] &&
                data['Posts'].map(item => (
                    <Card sx={{ maxWidth: "auto", marginTop: "5px" }} key={item.PostsUId}>
                        <CardActionArea>
                            <CardContent>
                                <Typography sx={{ display: 'flex', fontWeight: "bold", textAlign: 'left', fontSize: "16px", fontFamily: "Playfair Display" }} gutterBottom variant="h6" component="div" onClick={() => handleRouteChange(item.PostsUId)}>
                                    {item.Title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', fontSize: "14px", fontFamily: "Playfair Display" }} >
                                    {item.Summary}
                                </Typography>
                                <Typography sx={{ marginTop: "5px" }}>
                                    {
                                        item.TagList.map(tag => (
                                            <Chip style={{fontFamily: "Playfair Display"}} label={tag} size="small" variant="outlined" key={tag} color="info" sx={{ marginRight: "5px" }} />
                                        ))
                                    }

                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                ))

            }

        </div>
    )

}

export default Search