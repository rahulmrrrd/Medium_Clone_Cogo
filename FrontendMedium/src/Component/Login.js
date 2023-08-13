import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [show, setShow] = useState(false);
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      localStorage.clear();
      const response = await axios.post('http://127.0.0.1:8000/author/login', formData);
      // Assuming the API responds with a success message or user data
      console.log('Sign-up successful:', response.data);
      // Reset the form after successful sign-up
      setFormData({
        email: '',
        password: '',
      });
      const jwtToken = response.data.token;
      localStorage.setItem('jwtToken', jwtToken);
      navigate('/');
    } catch (error) {
      // Handle any errors that occur during sign-up
      console.error('Sign-up failed:', error);
    }
  };

  return (
    

<div className="login">
<form className="login__container" onSubmit={handleSubmit}>
  <h2 className='login__signin'>Login</h2>
  <div className='login__label'>Email:</div>
  {/* <input type="text"  name='email' value={formData.email} onChange={handleChange} /> */}
    
<input
type="email"
id="email"
name="email"
value={formData.email}
onChange={handleInputChange}
required
/>
     
  <div className='login_label login_password'>
    <span>Password</span>
     <span onClick={()=>setShow(p=>!p)}>{show ? 'hide': 'show'}</span>
  </div>
  {/* <input type={show ? 'text' : 'password'}  name='password' value={formData.password} onChange={handleChange} /> */}
<input
// type="password"
type={show ? 'text' : 'password'}
id="password"
name="password"
value={formData.password}
onChange={handleInputChange}
required
/>
   {/* <div className="login__error">{error && error.message}</div> */}

  <button type="submit">Login</button>


 </form>
</div>
  );
};
export default Login;