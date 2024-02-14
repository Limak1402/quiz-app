import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

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
    <div>
        <h1>Witaj w Quiz App</h1>
        <h1>Zarejestruj się</h1> 
        <form onSubmit={ handleSubmit } className='signup-form'>

            <input type="email" placeholder='Email' required value={ email }
             onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder='Hasło' required value={ password }
             onChange={(e) => setPassword(e.target.value)} />

            <button type='submit' className='signup-button'>Zarejestruj się</button>
        </form>
        <p>Masz już konto? <Link to='/login'>Zaloguj się</Link></p>
    </div>
  )
}

export default Signup