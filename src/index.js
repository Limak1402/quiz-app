import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import Protected from './components/Protected';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Football from './pages/Football';
import Countries from './pages/Countries';
import Flags from './pages/Flags';
import Animals from './pages/Animals';
import Cars from './pages/Cars';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="signup" element={<Signup />}/>
      <Route path="login" element={<Login />}/>
      <Route path="/" element={<Protected />}>
        <Route path="/" index element={<Home />} />
        <Route path='/countries' element={<Countries />} />
        <Route path='/football' element={<Football />} />
        <Route path='/flags' element={<Flags />} />
        <Route path='/animals' element={<Animals />} />
        <Route path='/cars' element={<Cars />} />
      </Route>
    </Route>
  )
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
