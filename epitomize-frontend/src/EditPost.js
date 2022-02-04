import React, { useState } from 'react'
import "./CreatePost.css"
import axios from "axios";

export default function EditPost(){

    const baseURL = "http://localhost:8081/post"

    const data = {
        "Posts": [
          {
            "CreatedAt": "2022-02-02T13:11:52.722628-05:00",
            "UpdatedAt": "2022-02-02T13:11:52.722628-05:00",
            "DeletedAt": null,
            "ID": 1,
            "Type": "Tech",
            "Title": "Why every software engineer should use vim",
            "Summary": "Conquer the quitting vim fear and give it a go",
            "Content": "Kuch bhi",
            "Linked_Post": 0,
            "Status": "Draft",
            "Tags" : "Blog"
    }]}

    const dataItem = data.Posts[0];

    const [Title,setTitle]=useState("")
    const [Content,setContent]=useState("")
    const [Summary,setSummary]=useState("")
    const [Type,setType]=useState("")
    const [Tags,setTags]=useState("")
    const[file,setFile]=useState(null)
    let Status = "Draft"
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const newPost = {
            Title,
            Content,
            Summary,
            Tags,
            Type,
            Status,
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            //newPost.photo=filename;
            
        }
        console.log('Hi '+JSON.stringify(newPost));

             axios
            .post(baseURL, newPost)
            .then(response => {
            console.log(response.data);
            }).catch(error => {
            console.log(error)
            }); 
    }
    return(
        <div className="createpost">         
           
            {file && (
                <img className="postImg" src={URL.createObjectURL(file)} alt="" />
            )}
            <form className="postForm" onSubmit={handleSubmit}>
                <div className="postFromGroup">
                    
                    <label className="addImgButton" htmlFor="fileInput">
                    Add Image
                    </label>
                    <button className="postSubmit" type="submit" >Publish</button>
                    
                </div>
                    <div className="postFromGroup">
                    <input type="file" id="fileInput" style={{display:"none"}}  onChange={(e) => setFile(e.target.files[0])}/>
                    <input type="text"  className="postInput" autoFocus={true}
                     defaultValue={dataItem.Title} onChange={e=>setTitle(e.target.value)}/>
                   
                </div>
                <div className="postFromGroup">
                <input type="text" placeholder="Summary" className="postSummary" autoFocus={true}
                     defaultValue={dataItem.Summary} onChange={e=>setSummary(e.target.value)}/>
                     
                </div>
                <div className="postFromGroup">
                
                </div>
                <div className="postFromGroup">
                <input type="text" placeholder="Tags" className="postTags" autoFocus={true}
                     defaultValue={dataItem.Tags} onChange={e=>setTags(e.target.value)}/>
                </div>
                <div className="postFromGroup">
                <input type="text" placeholder="Type" className="postTags" autoFocus={true}
                     value={dataItem.Type} onChange={e=>setType(e.target.value)}/>
                </div>
                <div className="postFromGroup">
                
                    <textarea placeholder="Tell your story.." type="text" className="postInput postText"
                     defaultValue={dataItem.Content} onChange={e=>setContent(e.target.value)}></textarea>
                </div>
                
            </form>
        </div>
    )
 }