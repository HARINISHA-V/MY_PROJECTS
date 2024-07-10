import React, { useState ,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Table from './Table'

const Input = () => {

    const[ipdata,setIpdata]=useState('')
    const navigate = useNavigate()

    //   
    let email=sessionStorage.getItem('email')
    let token=sessionStorage.getItem('token')
    let post=async ()=>{
        
        try {
            const res=await axios.post('http://localhost:3100/postdata',{"notes":ipdata,"email":email},{headers: {'Content-Type': 'application/json','Authorization':`Bearer ${token}`}})
            // console.log(ipdata) 
            // navigate('/getdata')
            if(post.data.statuscode==200){
                navigate('/op')
            }
        } catch (error) {
            console(error)
        }
    }

    // 
    const logout=()=>{
        sessionStorage.clear()
        navigate('/')
    }

  return <><div className='container-fluid title'>
   <center><h1>TASK MANAGER</h1></center>  
   <button id='titlebtn' type='button' onClick={()=>logout()}>log out</button>
   </div>
  <div className='container main taskip'>

  <form >
  <input type="text" className='taskipbox' onChange={(e)=>setIpdata(e.target.value)}/>
  <button className='btn  btn-outline-success' onClick={post}>ADD</button>
 
  </form>
  <br />
  <Table/>
  </div>
  </>
  
}



export default Input


