import Layout from './Layout';
import {Route,Routes,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import NewPost from './NewPost';
import PostPage from './PostPage';
import Missing from './Missing';
import About from './About';
import Home from './Home'
import {format} from "date-fns"
import api from './Api/posts'
import Editposts from './Editposts';
import useWindowssize from './Hooks/useWindowssize';


function App() {
  
  const [posts,setPosts] = useState([])
  const [search,setSearch] = useState("")
  const [searchResults,setSearchResults] = useState([])
  const [postTitle,setPostTitle]=useState('')
  const [postbody,setPostBody]=useState('')
  const [editTitle,setEditTitle]=useState('')
  const [editBody,setEditBody]=useState('')
  const navigate = useNavigate()
  const { width } = useWindowssize()



  useEffect(()=>{
     const filteredresults = posts.filter((post)=>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
     || ((post.title).toLowerCase()).includes(search.toLowerCase()) )

     setSearchResults(filteredresults.reverse())
  },[posts,search])


  useEffect(()=>{
    const fetchposts = async ()=>{
      try{
        const response = await api.get('/posts')
        setPosts(response.data)
      }catch (err){
          //not in 200 range
          if(err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          }else{
            console.log(`Error:${err.message}`);
          }
      }
    }
    fetchposts()
  },[])


  const handleEdit = async (id) => {
    const datetime = format(new Date(),"MMMM dd,yyyy pp");
    const updatedpost = {id,title: editTitle,datetime,body:editBody}
    try{
       const response = await api.put(`/posts/${id}`,updatedpost);
       setPosts(posts.map(post=>post.id === id ? {...response.data}:post))
       setEditTitle('')
       setEditBody('')
       navigate('/')
    }catch(err){
      console.log(`Error:${err.message}`);
    }
  }

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
    
        
  

      <Routes>
           
          <Route  path="/" element={<Layout
                          search={search}
                          setSearch={setSearch}
                          width={width}
                          />}>



                          <Route  index element = {<Home posts={searchResults}/>}/> 

                          <Route path = "edit" >
                            
                          <Route path=":id" element ={<Editposts 
                                      posts={posts}
                                      handleEdit={handleEdit}
                                      editBody={editBody}
                                      setEditBody={setEditBody}
                                      editTitle={editTitle}
                                      setEditTitle={setEditTitle}
                                    />}/>
                          </Route>

                          <Route path = "post">
                          
                                  <Route  index element ={<NewPost 
                                      handleSubmit={handleSubmit}
                                      postTitle={postTitle}
                                      setPostTitle={setPostTitle}
                                      postbody={postbody}
                                      setPostBody={setPostBody}
                                    />}/>

                                  
                                  <Route path=":id" element = {<PostPage
                                  posts={posts} 
                                  handleDelete={handleDelete}
                                  />}/>

                        </Route>
                        
                        <Route path="about" element ={<About/>}/>

                        <Route path= "*" element={<Missing/>}/>

          </Route>

      </Routes>


  

     

    
  )
}

export default App;
