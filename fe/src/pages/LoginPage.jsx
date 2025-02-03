import React, { useRef, useState } from 'react';
import axios from "axios";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import bg from '../assets/bg.mp4';
import { BACKEN_URL_V1 } from '../lib/config';
import { userSchema } from '../lib/schema';
import { errorNotify, succesNotify } from '../lib/toast';

function LoginPage() {
  const emailRef = useRef();
  const nameRef = useRef();
  const passRef = useRef();

  const emailRefSignup = useRef();
  const nameRefSignup  = useRef();
  const passRefSignup  = useRef();
  const cpassRefSignup  = useRef();

  const navigate = useNavigate()
  const [showSignUp,setShowSignUp]=useState(false)

  function handleSignup(){
    setShowSignUp(!showSignUp)
  }


  const handleSubmitSignUP = async ()=>{
    
      const email = emailRefSignup.current?.value.trim()
      const name = nameRefSignup.current?.value.trim()
      const password = passRefSignup.current?.value.trim()
      const cpassword = cpassRefSignup.current?.value.trim()
      if(password===cpassword){  
        try {
          const response = await axios.post(`${BACKEN_URL_V1}/auth/signup`,{
            name: name,
            email: email,
            password: cpassword
          }, { withCredentials: true });
          if(response){
            succesNotify("You have successfully Signup!")
            navigate("/menu")
          }
        } catch (e) {
          console.log(e)
          errorNotify(e.response.data.message)
        }
    }
    else{
      errorNotify('password not matching')
    }
  }

  const handleSubmitlogin = async ()=>{
    try {
      const email = emailRef.current?.value.trim()
      const name = nameRef.current?.value.trim()
      const password = passRef.current?.value.trim()
  
      const inputData = userSchema.safeParse({ email, name, password })
  
    
      if (!inputData.success) {
        errorNotify(inputData.error.errors[0].message); 
        return; 
      }
  
      const response = await axios.post(`${BACKEN_URL_V1}/auth/login`, {
        email: email,
        name: name,
        password: password
      },  { withCredentials: true })
  
      
      if (response.status === 201) {
        succesNotify("Login successfully!"); 
        navigate('/menu');
      }
    } catch (error) {
      errorNotify(error.response.data.message)
    }
  }

  return (
    <div className="relative flex justify-center items-center min-h-screen   bg-gray-100 px-4 overflow-hidden ">
      {/* Background Video */}
      <video 
        src={bg} 
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      {showSignUp && 
        <>
      <div className="absolute w-11/12 md:w-full  max-w-md bg-white p-8 rounded-2xl shadow-lg backdrop-blur-md bg-opacity-80">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Login</h2>

        
        <form className="md:mt-6" >
          
          <div>
            <label className="block text-gray-600">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full md:mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={emailRef} 
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">Password</label> 
            <input 
              type="password"
              ref={passRef} 
              placeholder="Enter your password" 
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div> 

            <button 
              type="button" 
              onClick={handleSubmitlogin}
              className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition active:bg-blue-400"
            >
              Login
            </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?<button onClick={()=>handleSignup()}><a href="#" className="text-blue-500">Sign up</a></button> 
        </p>
        
      </div>
      </>
        }


        {/* signup */}

        {!showSignUp && 
        <>
      <div className="absolute  w-11/12 md:w-full max-w-md bg-white px-6 py-4 rounded-2xl shadow-lg backdrop-blur-md bg-opacity-50">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">signUp</h2>

        
        <form className="md:mt-6 mt-3" >
          <div>
            <label className="block text-gray-600">Name</label>
            <input 
              type="name" 
              placeholder="Enter your name" 
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={nameRefSignup} 
              required
            />
          </div>

          <div>
            <label className="block text-gray-600">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={emailRefSignup} 
              required
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-600">Password</label> 
            <input 
              type="password"
              ref={passRefSignup} 
              placeholder="Enter your password" 
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div> 

          <div className="mt-4">
            <label className="block text-gray-600">confirm Password</label> 
            <input 
              type="password"
              ref={cpassRefSignup} 
              placeholder="confirm your password" 
              className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
            />
          </div> 

            <button 
              type="button" 
              onClick={handleSubmitSignUP}
              className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition active:bg-blue-400"
            >
              SignUp
            </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?<button onClick={()=>handleSignup()}><a href="#" className="text-blue-500">login</a></button> 
        </p>
        
      </div>
      </>
        }
    </div>
  );
}

export default LoginPage;