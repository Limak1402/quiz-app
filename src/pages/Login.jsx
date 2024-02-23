import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

const Login = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential);
        const user = userCredential.user;
        localStorage.setItem('token', user.accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        navigate("/");
    }
    catch{
        console.error("error");
    }
}

  return (
    <div className='container'>
        <h1 className='greeting'>Witaj w Quiz App</h1>
        <h1 className='login'>Zaloguj się</h1> 
        <form onSubmit={ handleSubmit } className='login-form'>

            <input type="email" placeholder='Email' required value={ email }
             onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder='Hasło' required value={ password }
             onChange={(e) => setPassword(e.target.value)} />

            <button type='submit' className='login-button'>Zaloguj się</button>
        </form>
        <p className='text'>Nie masz konta? <Link to='/signup' className='xpp'>Utwórz je</Link></p>
    </div>
  )
}

export default Login