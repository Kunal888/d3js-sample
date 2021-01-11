import React, { useState } from 'react'
import User1 from './components/User1'
import User2 from './components/User2'
import LoginForm from './components/LoginForm'
import './App.css'

function App() {
  
  const user1 = {
    username: "John",
    password: "12345"
  }
  const user2 = {
    username: "Micky",
    password: "98765"
  }

  const [user, setUser] = useState({username: "", password: ""})
  const [error, setError] = useState("")
  
  const Login = details => {
    console.log(details)

    if(details.username===user1.username && details.password===user1.password) {
      setUser({username: details.username, password: details.password})
      setError("")
      console.log("User1 logged in!")
    }
    else if(details.username===user2.username && details.password===user2.password) {
      setUser({username: details.username, password: details.password})
      setError("")
      console.log("User2 logged in!")
    }
    else {
      setError("Details do not match!")
      console.log("Details do not match!")
    }
  }

  const Logout = () => {
    setUser({username: "", password: ""})
  }

  return (
    <div className="App">
      {
        (user.username===user1.username && user.password===user1.password) ? (
          <>
            <button id="logout-btn" onClick={Logout}>Logout</button>
            <User1 />
          </>
        ) : 
        (user.username===user2.username && user.password===user2.password) ? (
          <>
            <button id="logout-btn" onClick={Logout}>Logout</button>
            <User2 />
          </>
        ) : 
        <LoginForm Login={Login} error={error} />
      }
    </div>
  )
}

export default App
