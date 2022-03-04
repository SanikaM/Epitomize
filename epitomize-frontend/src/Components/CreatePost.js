import React, { useState } from 'react'
import "./CreatePost.css"
import axios from "axios";

export default function CreatePost() {

    const baseURL = "http://localhost:8081/post"

    const [Title, setTitle] = useState("")
    const [Content, setContent] = useState("")
    const [Summary, setSummary] = useState("")
    const [Type, setType] = useState("")
    const [Tags, setTags] = useState("")
    const [file, setFile] = useState(null)
    let Status = "Draft"

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            Title,
            Content,
            Summary,
            Tags,
            Type,
            Status,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            //newPost.photo=filename;
            // try {
            //     //await axios.post("/upload",data).then(res=>console.log('post created'));

            // } catch (err) {

            // }
        }
        axios
        .post(baseURL, newPost)
        .then(response => {
            console.log(response.data);
            alert( "Post successfully created." )
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
        </div>
    )
}