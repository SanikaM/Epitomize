import React, { useState } from 'react'
import "./CreatePost.css"
import axios from "axios";
import Cookies from 'universal-cookie';
import {
    useParams
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import configData from "../config.json";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function EditPost() {

    const baseURL = configData.BACKEND_URL
    let { id } = useParams();
    const cookies = new Cookies();

    const [dataItem, setData] = useState("")
    const [myFile, setFile] = useState("")
    const [newFile, setNewFile] = useState("")

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [severity, setSeverity] = React.useState();
    const [apiResponse, setResponse] = React.useState();

    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const initialValues = {
        Title: dataItem.Title,
        Content: dataItem.Content,
        Summary: dataItem.Summary,
        Tags: dataItem.Tags,
        Type: dataItem.Type,
        myFile: dataItem.Image,
        LinkedPost: 1,
        Status: 0
    }

    const [values, setValues] = useState(initialValues);


    React.useEffect(() => {
        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }
        axios.get(baseURL + "post/" + id, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                setData(response.data);
                setValues(response.data)
                setFile(response.data.Image)
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }

        const data = new FormData();
        data.append("Title", values.Title);
        data.append("Content", values.Content);
        data.append("Summary", values.Summary);
        data.append("Tags", values.Tags);
        data.append("Type", values.Type);
        data.append("Status", 0);

        if (newFile !== "") {
            data.append("myFile", newFile);
        }
        else {
            data.append("myFile", dataItem.Image);
        }

        axios
            .put(baseURL + 'post/' + id, data, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(response => {
                setSeverity("success")
                setState({
                    open: true, ...{
                        vertical: 'top',
                        horizontal: 'center',
                    }
                });
                setResponse("Post successfully edited.")
                window.location = '/myposts';
            }).catch(error => {
                console.log(error)
            });
    }
    return (
        <div className="createpost">

            {myFile && (
                <img className="postImg" src={require("../images/" + dataItem.Image)} alt="" />
            )}
            {newFile && (
                <img className="postImg" src={URL.createObjectURL(newFile)} alt="" />
            )}
            <form className="postForm" onSubmit={handleSubmit}>
                <div className="postFromGroup">

                    <label className="addImgButton" htmlFor="fileInput">
                        Add Image
                    </label>
                    <button className="postSubmit" type="submit" id="publish">Publish</button>

                </div>
                <div className="postFromGroup">
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setNewFile(e.target.files[0])} />
                    <input type="text" className="postInput" autoFocus={true} name="Title" id="title" data-testid="title"
                        defaultValue={dataItem.Title}
                        onChange={handleInputChange}
                    />

                </div>
                <div className="postFromGroup">
                    <input type="text" placeholder="Summary" className="postSummary" autoFocus={true} id="summary"
                        defaultValue={dataItem.Summary} name="Summary" data-testid="summary"
                        onChange={handleInputChange}
                    />

                </div>
                <div className="postFromGroup">

                </div>
                <div className="postFromGroup">
                    <input type="text" placeholder="Tags" className="postTags" autoFocus={true} id="tags"
                        defaultValue={dataItem.Tags} name="Tags" disabled={true} style={{ backgroundColor: "white" }}
                        onChange={handleInputChange} data-testid="tags"
                    />
                </div>
                <div className="postFromGroup">
                    <input type="text" placeholder="Type" className="postTags" autoFocus={true} id="posttype"
                        value={dataItem.Type} name="Type" data-testid="posttype"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="postFromGroup">
                    <textarea placeholder="Tell your story.." type="text" className="postInput postText" id="content"
                        defaultValue={dataItem.Content} name="Content" data-testid="content"
                        onChange={handleInputChange}></textarea>
                </div>

            </form>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                key={vertical + horizontal}
            >
                <Alert severity={severity}>{apiResponse}</Alert>
            </Snackbar>
        </div>
    )
}