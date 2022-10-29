import React from 'react'
import { useParams,Link} from 'react-router-dom'
import { useContext } from 'react';
import DataContext from './Context/DataContext';
import api from './Api/posts';
import { useNavigate } from 'react-router-dom';


const PostPage = () => {
  const {posts,setPosts} = useContext(DataContext)
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id)
  const navigate = useNavigate()

  const handleDelete = async (id) =>{
    try{
      await api.delete(`/posts/${id}`)
    const postslist = posts.filter(post=>post.id !== id)
    setPosts(postslist)
    navigate('/')
    }catch(err){
      console.log(`Error:${err.message}`);
    }
  }

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