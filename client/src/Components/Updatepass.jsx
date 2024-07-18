import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Updatepass = () => {
    
    const[userpass1,setUserpass1]=useState('')
    const[userpass2,setUserpass2]=useState('')
    const[useremail,setUseremail]=useState('')
    const nav=useNavigate()
    let token=sessionStorage.getItem('token')
    
    let update=async ()=>{
        try{
        if(userpass1==userpass2){
            const res=await axios.put(`http://localhost:3100/passupdate`,{email:useremail,password:userpass1},{headers: {'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
            console.log("success")}
            else{
                toast.warn('password not matching')
            }
        }

         catch (error) {
            console.log(error)
        }
    }


  return<>
  <div className='updatepass d-flex row row-cols-1'>
<div className='updatepass1 d-flex row row-cols-1 g-2 p-5'>
    <h1><u>Change Password</u></h1>
  <label htmlFor="mail">Email Id</label>
  <br />
  <input id='mail' type="email" required onChange={(e)=>setUseremail(e.target.value)} />
  <br />
  {/*  */}
   {/* password ip */}
   <label htmlFor="password1">Password</label>
  <br />
  <input type="password" id='password1' onChange={(e)=>setUserpass1(e.target.value)} />
  <br />
  {/* password conformation  */}
 <label htmlFor="password2" >Re-enter password</label>
<br />
<input type="password" id='password2' onChange={(e)=>setUserpass2(e.target.value)}/>
<br />
  <button className='btn btn-outline ' onClick={()=>update()}>Update Password</button><br />
  <Link to="/signin">Already have an account?</Link>
  </div></div>
   {/* password ip */}
   {/* <label htmlFor="password1">Password</label>
  <br />
  <input type="password" id='password1' onChange={(e)=>setUserpass(e.target.value)} />
  <br /> */}
  </>
}

export default Updatepass
