import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';
import '../style/authorisation.css'
import '../style/buttons.css'


const Signup = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
        <h1 className='signup'>Zarejestruj się</h1> 
        <form onSubmit={ handleSubmit } className='signup-form'>

            <input type="email" placeholder='Email' required value={ email }
             onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder='Hasło' required value={ password }
             onChange={(e) => setPassword(e.target.value)} />

            <button type='submit' className='signup-button'>Zarejestruj się</button>
        </form>
        <p className='text'>Masz już konto? <Link to='/login' className='xpp'>Zaloguj się</Link></p>
    </div>
  )
}

export default Signup