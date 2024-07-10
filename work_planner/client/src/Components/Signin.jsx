import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import { ToastContainer, toast ,Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {
const nav=useNavigate()
    const[useremail,setUseremail]=useState('')
    const[userpass,setUserpass]=useState('')
    // 
    
    let signin=async ()=>{
        try {
            const res=await axios.post('http://localhost:3100/signin',{email:useremail,password:userpass})
            if(res.data.statuscode==200){
                sessionStorage.setItem("email",useremail)
                sessionStorage.setItem('token',res.data.jtoken)
                nav('/ip')
            }
        let response=res.data.pwd
        console.log(response)  
        }
    
         catch (error) {
            toast.warn('wrong password or email Id doesnot exist!')
            console.log(error)
        }
    }
  return <>
  <div className='signin d-flex row row-cols-1'>
    < div className='signin1 d-flex row row-cols-1 g-2 p-5'>
       <h1><u>Sign in</u></h1>
  {/* email ip */}
  <label htmlFor="mail">Email id</label>
  <br />
  <input id='mail' type="email"   onChange={(e)=>setUseremail(e.target.value)} />
  <br />
  {/* password ip */}
  <label htmlFor="password1">Password</label>
  <br />
  <input type="password" id='password1'   onChange={(e)=>setUserpass(e.target.value)}/>
<br />
<button className='btn btn-secondary' onClick={()=>{signin()}}>Sign in</button><br />
<Link to="/">Don't have an account?</Link><br />
<Link to="/passwordupdate">Forget Password?</Link>
</div></div>
    </>
}

export default Signin
