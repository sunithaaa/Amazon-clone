import React, { useState } from 'react'
import "./Login.css"
import { Link, useHistory } from 'react-router-dom'
import { auth } from './firebase';
function Login() {
    const history=useHistory();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const signIn = e => {
        e.preventDefault();
        //Firebase login
        auth
            .signInWithEmailAndPassword(email,password)
            .then(auth=>{
                history.push("/")
            })
            .catch(error=>alert(error.message))
    }
    
    const register = e =>{
        e.preventDefault();
        //Firebase register
        auth
            .createUserWithEmailAndPassword(email,password)
            .then((auth)=>{
                //successfully created new user with email and password
                console.log(auth)
                if(auth){
                    history.push('/')
                }
            })
            .catch(error=>alert(error.message))
    }
    return (
        <div className="login">
            <Link to="/">
                <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/>
            </Link>
            <div className="login__container">
            <h1>Sign-In</h1>
                <form>
                    <h5>Email</h5>
                    <input type="text" value={email} onChange={e=>setEmail(e.target.value)} />
                    <h5>Password</h5>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    <button className="login__signinButton" onClick={signIn} type="submit">Continue</button>
                </form>
                <p>
                    By continuing, you agree to Amazon Clone's Conditions of Use and Privacy Notice.
                </p>
                <button className="login__registerButton" onClick={register}>Create New Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
