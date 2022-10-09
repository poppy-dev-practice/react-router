import React from 'react'
import { useParams,Link} from 'react-router-dom'


const PostPage = ({posts,handleDelete}) => {
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id)
  return (
    <main className='PostPage'>
      <article className='post'>
         {post &&
         <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`}><button className='editbutton'>Edit post</button></Link>
            <button className="deleteButton" onClick={()=>handleDelete(post.id)}>Delete post</button>
         </>
         
         }
         {!post &&
         <>
              <h2>post not found</h2>
              <p>well,that's disappointing</p>
              <p>
                  <Link to='/'>visit our Homepage</Link>
              </p>


         </>}
         

      </article>
       
    </main>

  )
}

export default PostPage