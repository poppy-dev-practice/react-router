import React from 'react'
import { useState, useContext } from 'react';
import DataContext from './Context/DataContext';
import { useNavigate } from 'react-router-dom';
import api from './Api/posts';
import {format} from "date-fns"

const NewPost = () => {
  const [postTitle,setPostTitle]=useState('')
  const [postbody,setPostBody]=useState('')
  const {posts,setPosts} = useContext(DataContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length-1].id + 1 :1
    const datetime = format(new Date(),"MMMM dd,yyyy pp");
    const newpost = {id,title: postTitle,datetime,body:postbody}
    try {
    const response = await api.post("/posts",newpost)
    const allpost = [...posts,response.data]
    setPosts(allpost)
    setPostTitle("")
    setPostBody("")
    navigate('/')
    }catch(err){
      console.log(`Error:${err.message}`);
    }
  }








  return (
    <main className='NewPost'>
        <h2> New Post </h2>
        <form className='newPostForm' onSubmit={handleSubmit}>
                <label htmlFor='postTitle'>Title:</label>
                <input 
                id="postTitle"
                type="text"
                required
                value={postTitle}
                onChange={(e)=>setPostTitle(e.target.value)}
                />
                <label htmlFor='postBody'>Post:</label>
                <textarea 
                id="postBody"
                required
                value={postbody}
                onChange={(e)=>setPostBody(e.target.value)}
                >
                </textarea>
                <button type='submit'>Submit</button>
        </form>
    </main>

  )
}

export default NewPost