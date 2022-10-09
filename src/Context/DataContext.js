import { createContext,useState,useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import {format} from "date-fns"
import api from '../Api/posts'
import useWindowssize from '../Hooks/useAxiosfetch';
import useAxiosFetch from '../Hooks/useWindowssize';

const DataContext = createContext({})


export const DataProvider = ({childern}) =>{
  const [posts,setPosts] = useState([])
  const [search,setSearch] = useState("")
  const [searchResults,setSearchResults] = useState([])
  const [postTitle,setPostTitle]=useState('')
  const [postbody,setPostBody]=useState('')
  const [editTitle,setEditTitle]=useState('')
  const [editBody,setEditBody]=useState('')
  const navigate = useNavigate()
  const { width } = useWindowssize()

  const {data,fetchError,isloading} = useAxiosFetch('http://localhost:3500/posts')


  useEffect(()=>{
    setPosts(data)
  },[data])

  useEffect(()=>{
     const filteredresults = posts.filter((post)=>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
     || ((post.title).toLowerCase()).includes(search.toLowerCase()) )

     setSearchResults(filteredresults.reverse())
  },[posts,search])


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


    return(
        <DataContext.Provider value={{width,search,setSearch}}>

            {childern}

        </DataContext.Provider>
    )
}




export default DataContext;