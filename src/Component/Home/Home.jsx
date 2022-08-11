import axios from 'axios'
import jwtDecode from 'jwt-decode';
import React, { useState } from 'react'
import { useEffect } from 'react';
import style from './Home.module.css';
import Swal from 'sweetalert2';
import $ from 'jquery'
 export default function Home() {
  let baseURL = 'https://route-egypt-api.herokuapp.com/';
  var token=localStorage.getItem('userToken');
  let decoded=jwtDecode(token);
  let userID=decoded._id;
  let [notes,setNotes]=useState([]);
  let [note ,setNote]=useState({  'title':'','desc':'',userID,token});
  let [btnLoading,setBtnLoading]=useState(false)
  async function getUserNotes()
  {
     let {data}=await axios.get(baseURL+ "getUserNotes",{
      headers:{
      Token:token,
      userID,
      }
     })
    
     if(data.message=='success')
     {
      setBtnLoading(true)
      setNotes(data.Notes);
     }
     setBtnLoading(false)
  }
   

  useEffect(() => {
    getUserNotes()
}, [])


  
 
 

  function getInputvalue(e){
      let myNote={...note};
      myNote[e.target.name]=e.target.value;
      setNote(myNote);
  }


  

  async function submitAdd(e)
  {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    e.preventDefault();
    setBtnLoading(true)
    let {data} = await axios.post(baseURL+ 'addNote' , note)
    console.log(data);
    if(data.message=='success')
    {
      document.getElementById('add-note').reset()
      getUserNotes()
    }
    setBtnLoading(false)
  }
 
  function deleteNote(NoteID)
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(baseURL + "deleteNote" ,{
          data:{
            NoteID,
            token
          }
        }).then((response)=>{
          if(response.data.message =="deleted")
          {
            getUserNotes()
           Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.data.message,
              
            })
          }
        })
      }
    })
  }

  function editNote(noteIndex)
  {
    document.querySelector('#exampleModal1 input').value=notes[noteIndex].title;
    document.querySelector('#exampleModal1 textarea').value=notes[noteIndex].desc;
    setNote({...note,'title':notes[noteIndex].title,'desc':notes[noteIndex].desc,NoteID:notes[noteIndex]._id})
  }

  async function UpdateNote(e)
  {
     e.preventDefault();
     setBtnLoading(true)
     let {data} = await axios.put(baseURL + 'updateNote' ,note);
     if(data.message=="updated")
     {
      getUserNotes();
      Swal.fire(
        'Updated!',
        'Your file has been updated.',
        'success'
      )
     }
     else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: data.message,
        
      })
     }
     setBtnLoading(false)
  }


  return (
    <>
    <div className={`${style.bg} min-vh-100`}>
    <button className='btn btn-info text-white float-end m-5' data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-file-pen"></i> Add Note</button>
    <div className="clearfix"></div>


   {/* Add Model */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <form id='add-note' onSubmit={submitAdd} >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
            <input onChange={getInputvalue}  type="text" name='title' placeholder='title' className='my-3 form-control'/>
            <textarea onChange={getInputvalue}  name="desc" id="" cols="20" rows="8" placeholder='Type Your Note' className='my-3 form-control'></textarea>  
      </div>

      <div className="modal-footer">
        <button  type='submit'  className="btn btn-info text-white" data-bs-dismiss="modal">{btnLoading?<span className='text-whait'>Waiting <i className=' fa fa-spinner fa-spin'></i></span>:'Add'}</button>
        <button  type='button' id='cancel'  className="btn btn-danger text-white">Cancel</button>
      </div>
    </div>
  </div>
  </form>
</div>


{/* Edit Modal */}
<div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <form onSubmit={UpdateNote}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        
          <div className="input-gp my-3">
            <input onChange={getInputvalue}  type="text" name='title' placeholder='title' className='form-control'/>
          </div>
          <div className="input-gp my-3">
            <textarea  onChange={getInputvalue}  name="desc" id="" cols="20" rows="8" placeholder='Type Your Note' className='form-control'></textarea>
          </div>
       
      </div>
      <div className="modal-footer">
        <button type="submit" className="btn btn-info text-white" data-bs-dismiss="modal">{btnLoading?<span className='text-whait'>Waiting <i className=' fa fa-spinner fa-spin'></i></span>:'Update'}</button>
        <button type="button" className="btn btn-danger text-white">Cancel</button>
      </div>
    </div>
  </div>
  </form>
</div>


<div className="container">
  <div className="row">
  
    {notes.length>0?
    notes.map((note,index)=>{
      return(
        <div key={index} className="col-md-3 my-3">
      <div className={`${style.text}`}>
        <div className="icons float-end m-3">
          
       <a onClick={()=>deleteNote(note._id)}><i  className="fa-solid fa-trash text-danger me-3"></i></a>
       <a onClick={()=> editNote(index)}> <i className="fa-solid fa-pen-to-square text-warning" data-bs-toggle="modal" data-bs-target="#exampleModal1"></i></a>
        </div>
        <div className="clearfix"></div>
         <div className="note text-center p-4">
         <h2>{note.title}</h2>
         <h6>{note.desc}</h6>
         </div>
      </div>
    </div>
      )
    }):<div className='min-vh-100 d-flex justify-content-center align-items-center'><i className='fa fa-spinner fa-spin fa-3x text-white'></i></div>
  }
    
    
  </div>
</div>
    </div> 
    </>
  )
 }
