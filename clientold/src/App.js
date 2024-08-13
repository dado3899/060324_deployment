import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from 'react'
import AllBlogs from './Component/allBlog';

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [sLI, setSLI] = useState(false)

  useEffect(()=>{
    fetch('/checksessions')
    .then(r=>{
      if (r.ok){
        return r.json()
      }
      else{
        throw new Error
      }
    })
    .then(data => {
      setUser(data)
    })
    .catch(()=>{})
  },[])

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username:username, stayLoggedIn: sLI,password:password}),
      }
    )
    .then(r=>{
      if (r.ok) { return r.json()}
      else {throw new Error}
    })
    .then(data=>{
      setUser(data)
    })
    .catch(data=>{
      alert("Not valid username/password")
    })
  }
  function handleLogout(){
    fetch('/logout',{method:"DELETE"})
    .then(r=>r.json())
    .then(data => setUser(undefined))
  }

  function handleNewUser(e) {
    e.preventDefault();
    fetch("/signup",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username:e.target.user.value,password:e.target.password.value}),
      }
    )
    .then(r=>r.json())
    .then(data=>setUser(data))
  }

  if (user) {
    return (
      <div className="App">
        <header className="App-header">  
          <h2>Welcome, {user.username}!</h2>
          <button onClick={handleLogout}> Logout </button>
          <AllBlogs/>
        </header>
      </div>
  )
  } else {
    return (
      <div className="App">
      <header className="App-header">  
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <button type="submit">Login</button>
          <input type='checkbox' name='stayLoggedIn' value={sLI} onChange={e=>setSLI(!sLI)}/>
        </form>
        <header>New User Form</header>
        <form onSubmit={handleNewUser}>
          <input
            type="text"
            name = "user"
            />
            <input
            type="text"
            name = 'password'
            />
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}
}

export default App;


{/* <button onClick={()=>{
        fetch('/session')
      }}>Check Session</button>
      <form onSubmit={(e)=>{
        e.preventDefault()
        fetch('/session',
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({data: e.target.trashcan.value}),
          }
        )
      }}>
        <input placeholder="trashcan" name="trashcan"/>
      </form> */}