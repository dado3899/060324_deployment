import {useEffect,useState} from 'react'
function AllBlogs(){
    const [blogs,setBlogs] = useState([])
    useEffect(()=>{
        fetch('/blogs')
        .then(r=>r.json())
        .then(data=> setBlogs(data))
    },[])
    return(
        <div>
            {blogs.map((blog)=>{
                return(
                    <div>
                        <h1>{blog.title}</h1>
                        <p>{blog.content}</p>
                    </div>
                    )
            })}
        </div>
    )
}
export default AllBlogs