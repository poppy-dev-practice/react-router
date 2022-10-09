import React from 'react'

const NewPost = ({handleSubmit,postTitle,setPostTitle,postbody,setPostBody}) => {
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