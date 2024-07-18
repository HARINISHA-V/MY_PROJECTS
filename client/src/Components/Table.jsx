import React, { useEffect, useState } from 'react'
import axios from 'axios'




const Table = () => {
  const [res, setRes] = useState([])
  const[data,setData]=useState('')
    const [lock, setLock] = useState('')
  const[edit,setEdit]=useState(false)

  useEffect(() => {
    getData();
  }, [])
  // 
  let email = sessionStorage.getItem('email')
  let token = sessionStorage.getItem('token')
  // 
  let getData = async () => {
    try {
      const response = await axios.get(`http://localhost:3100/getdata/${email}`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })
      setRes(response.data.data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  // 

  let deleteData = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3100/deldata/${id}`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })
      getData()
    } catch (error) {
      console.log(error);
    }
  }

  // 
  let updateData = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3100/updatedata/${id}`,{notes:data}, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } })
      getData()
    } catch (error) {
      console.log(error);
    }
  }
  // 


  return <>

      <div className='tablediv'>
        {res.map((item, key) => (
          <ul key={key} >
            <li> 

              {lock == item._id ? (<input value={data}  onChange={(e)=>setData(e.target.value)} ></input>) : (<>{item.notes}</>)}
              {!edit ? ( <i className="fa-solid fa-pencil"onClick={(e) => {setEdit(true);setLock(item._id);setData(item.notes)}}></i>
            ) : (
              <>
            
               <i className="fa-solid fa-check" onClick={()=>{updateData(item._id);setEdit(false);setLock("")}} ></i>
               <i className="fa-solid fa-xmark" onClick={() => {setEdit(false); setLock("")}}></i>
         
              </>
            )}
             <i className="fa-solid fa-trash"  onClick={() => (deleteData(item._id))} ></i>
           
            </li>
           
    
          </ul>
        ))}
</div>

  </>
}

export default Table


