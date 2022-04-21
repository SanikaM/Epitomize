import React, { useState } from 'react'
import "./CreatePost.css"
import axios from "axios";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import configData from "../config.json";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function CreatePost() {

    const baseURL = configData.BACKEND_URL
    const cookies = new Cookies();

    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")
    const [Summary, setSummary] = useState("")
    const [Type, setType] = useState("")
    const [Tags, setTags] = useState("")
    const [myFile, setFile] = useState("")
    let Status = 0

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

    function handleSubmit(e) {
        const tokenStr = cookies.get('access_token')

        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }

        const data = new FormData();
        data.append("Title", Title);
        data.append("Content", Content);
        data.append("Summary", Summary);
        data.append("Tags", Tags);
        data.append("Type", Type);
        data.append("Status", Status);
        data.append("myFile", myFile);

        axios
            .post(baseURL + 'post', data, { headers: { "Authorization": `Bearer ${tokenStr}`, "Content-Type": "multipart/form-data" } })
            .then(response => {
                console.log(response.data);
                setSeverity("success")
                setState({
                    open: true, ...{
                        vertical: 'top',
                        horizontal: 'center',
                    }
                });
                setResponse("Post successfully created.")
                window.location = '/myposts';

            }).catch(error => {
                console.log(error)
            });
    }

    function handleDraft(e) {

        const tokenStr = cookies.get('access_token')
        let decodedToken = jwt_decode(tokenStr);
        let currentDate = new Date();
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            cookies.remove("access_token", { path: '/' })
            window.location = "/"
        }
        const data = new FormData();
        data.append("Title", Title);
        data.append("Content", Content);
        data.append("Summary", Summary);
        data.append("Tags", Tags);
        data.append("Type", Type);
        data.append("Status", 1);
        data.append("myFile", myFile);

        axios
            .post(baseURL + 'post', data, { headers: { "Authorization": `Bearer ${tokenStr}`, "Content-Type": "multipart/form-data" } })
            .then(response => {
                console.log(response.data);
                setSeverity("success")
                setState({
                    open: true, ...{
                        vertical: 'top',
                        horizontal: 'center',
                    }
                });
                setResponse("Draft successfully created.")
                window.location = '/mydrafts';

            }).catch(error => {
                console.log(error)
            });
    }

    return (
        <div className="createpost">
            {myFile && (
                <img className="postImg" src={URL.createObjectURL(myFile)} alt="" />
            )}
            <form className="postForm" >
                <div className="postFromGroup">

                    <label className="addImgButton" htmlFor="fileInput">
                        Add Image
                    </label>
                    <button className="postSubmit" type="submit" id="publish" onClick={(e) => handleSubmit()}>Publish</button>
                    <button className="postSubmit" type="submit" id="draft" onClick={(e) => handleDraft()}>Save as Draft</button>


                </div>
                <br />
                <div className="postFromGroup">
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                    <input type="text" placeholder="Title" className="postInput" autoFocus={true} id="title"
                        data-testid="title"
                        onChange={e => setTitle(e.target.value)} />

                </div>
                <div className="postFromGroup">
                    <input type="text" placeholder="Summary" className="postSummary" autoFocus={true} id="summary"
                        data-testid="summary"
                        onChange={e => setSummary(e.target.value)} />

                </div>
                <div className="postFromGroup">

                </div>
                <div className="postFromGroup">
                    <input type="text" placeholder="Tags" className="postTags" autoFocus={true} id="tags"
                        data-testid="tags"
                        onChange={e => setTags(e.target.value)} />
                </div>
                <div className="postFromGroup">
                    <input type="text" placeholder="Type" className="postTags" autoFocus={true} id="posttype"
                        data-testid="posttype"
                        onChange={e => setType(e.target.value)} />
                </div>
                <div className="postFromGroup">

                    <textarea placeholder="Tell your story.." type="text" className="postInput postText" id="content"
                        data-testid="content"
                        onChange={e => setContent(e.target.value)}></textarea>
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