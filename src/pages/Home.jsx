import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase';
import { useNavigate } from "react-router";
import { Boxes } from "../components/Boxes";
import Colors from '../components/Colors.jsx';
import { BOXES_TABLE } from "../data.js";
import { Link } from 'react-router-dom';
import Greeting from '../components/Greeting.jsx';
import '../style/buttons.css'
import '../style/home.css'

const Home = () => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut(auth);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login");
    }

    const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
        <Greeting user={user} />
        <Colors />
        <Link to="countries"><Boxes {...BOXES_TABLE[0]}/></Link> {/*operator rozprzestrzeniania*/}
        <Link to="football"><Boxes {...BOXES_TABLE[1]}/></Link>
        <Link to="flags"><Boxes {...BOXES_TABLE[2]}/></Link>
        <Link to="animals"><Boxes {...BOXES_TABLE[3]}/></Link>
        <Link to="cars"><Boxes {...BOXES_TABLE[4]}/></Link>
        <div><button onClick={ handleLogout } className='Logout'>Wyloguj</button></div>
    </div>
  )
}

export default Home