import React, { useState } from 'react'
import "./CreatePost.css"
import axios from "axios";
import Cookies from 'universal-cookie';
import {
    useParams
} from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function EditPost() {

    const baseURL = "http://localhost:8081/post/"
    let { id } = useParams();
    const cookies = new Cookies();

    const [dataItem, setData] = useState("")
    const [file, setFile] = useState("")

    const initialValues = {
        Title: dataItem.Title,
        Content: dataItem.Content,
        Summary: dataItem.Summary,
        Tags: dataItem.Tags,
        Type: dataItem.Type,
        File: dataItem.Image,
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
        axios.get(baseURL + id,  { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then((response) => {
                setData(response.data);
                console.log(response.data)
                setValues(response.data)
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

        const newPost = values
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            //newPost.photo=filename;

        }
        axios
            .put(baseURL + id, newPost, { headers: { "Authorization": `Bearer ${tokenStr}` } })
            .then(response => {
                alert("Post successfully edited.")
                window.location = '/';
            }).catch(error => {
                console.log(error)
            });
    }
    return (
        <div className="createpost">

            {file && (
                <img className="postImg" src={URL.createObjectURL(file)} alt="" />
            )}
            <form className="postForm" onSubmit={handleSubmit}>
                <div className="postFromGroup">

                    <label className="addImgButton" htmlFor="fileInput">
                        Add Image
                    </label>
                    <button className="postSubmit" type="submit" id="publish">Publish</button>

                </div>
                <div className="postFromGroup">
                    {/* <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} /> */}
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
                        defaultValue={dataItem.Tags} name="Tags" disabled={true} style={{backgroundColor: "white"}}
                        onChange={handleInputChange} data-testid="tags"
                        />
                </div>
                <div className="postFromGroup">
                    <input type="text" placeholder="Type" className="postTags" autoFocus={true}  id="posttype"
                        value={dataItem.Type} name="Type" data-testid="posttype"
                        onChange={handleInputChange}
                         />
                </div>
                <div className="postFromGroup">
                    <textarea placeholder="Tell your story.." type="text" className="postInput postText"  id="content"
                        defaultValue={dataItem.Content} name="Content" data-testid="content"
                        onChange={handleInputChange}></textarea>
                </div>

            </form>
        </div>
    )
}