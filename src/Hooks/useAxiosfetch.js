import { useState,useEffect } from "react";
import axios from "axios";


const useAxiosFetch = (dataurl)=>{
    const [data,setData] = useState([])
    const [fetchError,setFetchError]=useState(null)
    const [isloading,setIsLoading]= useState(null)

    useEffect(()=>{
        let isMounted = true;
        const source = axios.CancelToken.source();
    
        const fetchData = async (url) =>{
            setIsLoading(true)
            try{
             const response = await axios.get(url,{
                cancelToken:source.token
             });
             if (isMounted){
                setData(response.data)
                setFetchError(null)
            }
            }catch(err){
                if(isMounted){
                    setFetchError(err.message)
                    setData([])
                }
           
            }finally{
                isMounted && setIsLoading(false)
            }
        }
        fetchData(dataurl)

        const cleanup = ()=>{
    
            isMounted = false;
            source.cancel();
        }

        return cleanup;
    },[dataurl])

    return {data,fetchError,isloading}
}


export default useAxiosFetch
