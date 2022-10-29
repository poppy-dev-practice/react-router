import { createContext,useState,useEffect } from "react";
import useAxiosFetch from '../Hooks/useAxiosfetch';

const DataContext = createContext({})

export const DataProvider = ({children})=>{
  const [posts,setPosts] = useState([])
  const [search,setSearch] = useState("")
  const [searchResults,setSearchResults] = useState([])
  const {data,fetchError,isloading} = useAxiosFetch('http://localhost:3500/posts');

  useEffect(()=>{
     const filteredresults = posts.filter((post)=>
        ((post.body).toLowerCase()).includes(search.toLowerCase())
     || ((post.title).toLowerCase()).includes(search.toLowerCase()) )

     setSearchResults(filteredresults.reverse())
  },[posts,search])


  useEffect(()=>{
    setPosts(data);
  },[data])

 
 

  return (
    <DataContext.Provider value = {{
      search,setSearch,searchResults,fetchError,setPosts,
      isloading,posts
    }}>
              {children}
    </DataContext.Provider>
  )
}

export default DataContext;