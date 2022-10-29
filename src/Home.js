import React from 'react'
import Feed from './Feed'
import { useContext } from 'react';
import DataContext from './Context/DataContext';

const Home = () => {
   
  const {searchResults,fetchError,isloading} = useContext(DataContext)
  return (
    <main class="Home">
        {/* {posts.length?(
          <Feed posts={posts}/>
        ):(<p style={{marginTop:"2rem"}}>No post to display</p>)} */}

        {isloading && <p className='statusMsg'>Loading posts...</p>}
        {!isloading&&fetchError && <p className='statusmsg' style={{color:"red"}}>{fetchError}</p>}
        {!isloading && !fetchError && (searchResults.length ? <Feed posts = {searchResults}/>:<p className='statusMsg'>NO posts to display</p>)}

    </main>

  )
}

export default Home