import Layout from './Layout';
import {Route,Routes} from 'react-router-dom'
import NewPost from './NewPost';
import PostPage from './PostPage';
import Missing from './Missing';
import About from './About';
import Home from './Home'
import Editposts from './Editposts';
import {DataProvider} from './Context/DataContext'
function App() {
  
  
  return (
    <DataProvider> 

      <Routes>
           
          <Route  path="/" element={<Layout/>}>


              <Route  index element = {<Home/>}/> 

              <Route path = "edit" >
                
              <Route path=":id" element ={<Editposts/>}/>
              </Route>

              <Route path = "post">
              
                      <Route  index element ={<NewPost/>}/>
                      <Route path=":id" element = {<PostPage/>}/>

            </Route>
            
            <Route path="about" element ={<About/>}/>

            <Route path= "*" element={<Missing/>}/>

          </Route>

      </Routes>

    </DataProvider>

  

     

    
  )
}

export default App;
