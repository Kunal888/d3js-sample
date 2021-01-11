import React, { useState } from 'react'
import '../App.css'

function LoginForm({ Login, error }) {

    const [details, setDetails] = useState({username: "", password: ""})

    function handleSubmit(e) {
        e.preventDefault()
        setDetails({username: "", password: ""})
        Login(details)
    }

    return (
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error!=="" ? <div>{error}</div> : ""}
        <input type="text" id="name" placeholder="username" 
            onChange={e => setDetails({...details, username: e.target.value})} value={details.username} required />
        <input type="password" id="password" placeholder="password" 
            onChange={e => setDetails({...details, password: e.target.value})} value={details.password} required />
        <input type="submit" id="submit" placeholder="submit" />
      </form>
    )
}

export default LoginForm
