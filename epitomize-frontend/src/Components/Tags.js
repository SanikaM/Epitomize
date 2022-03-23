import Button from '@mui/material/Button';
import * as React from 'react';
import axios from 'axios';

function Tags() {

    const baseURL = "http://localhost:8081/"

    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL + 'topTags')
            .then((response) => {
                console.log(response.data)
                setData(response.data);
            });
    }, []);

    if (data && data['TagList'] !== null) {

        return (
            <div>
                <h2>Recommended Topics: </h2>
                {
                    data['TagList'].map(item => (
                        <Button sx={{ textTransform: 'none', color: "black", fontFamily: 'Segoe UI', fontSize: 20 }}>
                            {item}
                        </Button>
                    ))
                }
            </div>
        )
    }
    else {
        return (
            <div>
                <h2>Recommended Topics: </h2>
                <Button sx={{ textTransform: 'none', color: "black", fontFamily: 'Segoe UI', fontSize: 20 }}>
                    No tags
                </Button>
            </div>

        );
    }
}

export default Tags;