import React from 'react'
import Feed from './Feed'

const Home = ({posts}) => {
  return (
    <main class="Home">
        {posts.length?(
          <Feed posts={posts}/>
        ):(<p style={{marginTop:"2rem"}}>No post to display</p>)}

        {/* {isLoading && <p className='statusMsg'>Loading posts...</p>}
        {isLoading&&fetchError && <p className='statusmsg' style={{color:"red"}}>{fetchError}</p>}
        {!isLoading && !fetchError && (posts.length ? <Feed posts = {posts}/>:<p className='statusMsg'>NO posts to display</p>)} */}

    </main>

  )
}

export default Home