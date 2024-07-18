import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [userpass1, setUserpass1] = useState("");
  const [userpass2, setUserpass2] = useState("");
  const [useremail, setUseremail] = useState("");
  const navigate = useNavigate()
  let sign = async () => {
    
    try {
      if (userpass1 == userpass2) {
        const res = await axios.post("http://localhost:3100/signup", {
          email: useremail,
          username: username,
          password: userpass1,
        });
        
        if (res.data.statuscode == 200) {
        toast.success('Account Successfully Created')
          sessionStorage.setItem("email", useremail);
          sessionStorage.setItem('token',res.data.jtoken)
          navigate('/signin')
        } 
      } else {
        toast.warn("password not matching");
      }
    } catch (error) {
      toast.error('Email id already exist!')
      console.log(error);
    }
  };

  return (
    <>
    <div className="signupdiv d-flex row row-cols-1">
      <div className="m-3 signupdiv1 d-flex row row-cols-1 g-2 p-5">
        <h1>
          <u>Sign up</u>
        </h1>
        {/* email ip */}
        <label htmlFor="mail">Email Id</label>
        <br />
        <input
          id="mail"
          type="email"
          onChange={(e) => setUseremail(e.target.value)}
        />
        <br />
        {/* name*/}
        <label htmlFor="name">New Username</label>
        <br />
        <input
          id="name"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        {/* password ip */}
        <label htmlFor="password1">Password</label>
        <br />
        <div className="password">
       
        <input
          type="password"
          id="password1"
          onChange={(e) => setUserpass1(e.target.value)}
        />
         <i class="fa-solid fa-eye"></i>
        </div>
        <br />

        {/* password conformation  */}
        <label htmlFor="password2">Re-enter password</label>
        <br />
        <input
          type="password"
          id="password2"
          onChange={(e) => setUserpass2(e.target.value)}
        />
        <br />

        <button className="btn btn-outline-secondary " onClick={() => sign()}>
          Sign up
        </button>
        <br />
        <Link to="/signin">Already have an account?</Link>
      </div>
      </div>
    </>
  );
};

export default Signup;
