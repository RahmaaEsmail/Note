import React from 'react';
import styles from './Register.module.css'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useState } from 'react';
import axios from 'axios';
import joi from 'joi'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
};    


let [user,setUser]=useState({
    first_name:'',
    last_name:'',
    age:'',
    email:'',
    password:''
})
let [erroeMsg,setErrorMsg]=useState();
let navigate=useNavigate();
let [btnLoading,setBtnLoading]=useState(false);
let [validError,setValidError]=useState([])

function goToLogin()
{
    navigate('/login')
}

 async function submitForm(e)
 {
    e.preventDefault();
    setBtnLoading(true);
    let validateResponse=validInputs();
    if(validateResponse.error)
    {
      setValidError(validateResponse.error.details)
    }
    else{
        let{data}=await axios.post('https://route-egypt-api.herokuapp.com/signup',user);
    console.log(data);
    if(data.message=='success')
    {
        goToLogin()
    }
    else{
        setErrorMsg(data.message)
    }
    }
    setBtnLoading(false)
 }


  
 function getInputValue(e)
 {
    setValidError([])
   let myUser={...user};
   myUser[e.target.name]=e.target.value;
   setUser(myUser);
 }


 function validInputs()
 {
    const schema=joi.object({
        first_name:joi.string().alphanum().required().min(3).max(10).pattern(new RegExp(/^[A-Z]/)),
        last_name:joi.string().alphanum().required().min(3).max(10).pattern(new RegExp(/^[A-Z]/)),
        age:joi.number().required().min(15).max(85),
        email:joi.string().required().email({tlds:{allow:['com','net']}}),
        password:joi.string().required().min(5)
    })
    return schema.validate(user,{abortEarly:false})
 }

 function setError(key)
 {
    for(const error of validError)
    {
        if(error.context.key===key)
        {
            return error.message
        }
    }
    return ''
 }

  return (
    <>

<div className="App">

<Particles
     
      id="tsparticles"
      init={particlesInit}
      options={{
        
            "fullScreen": {
                "enable": true,
                "zIndex": -1
            },
            "fpsLimit": 120,
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#fff",
                    "animation": {
                        "enable": true,
                        "speed": 10,
                        "sync": true
                    }
                },
                "opacity": {
                    "value": 0.5
                },
                "size": {
                    "value": {
                        "min": 0.1,
                        "max": 3
                    }
                },
                "links": {
                    "enable": true,
                    "distance": 100,
                    "color": "#fff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "none",
                    "outModes": {
                        "default": "out"
                    }
                }
            },
            "interactivity": {
                "events": {
                    "onHover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onClick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "repulse": {
                        "distance": 200
                    },
                    "push": {
                        "quantity": 4
                    }
                }
            },
            "detectRetina": true,
            "background": {
                "color": "#343a40"
            }
        
      }}
/>

    </div>
{/*onSubmit={submitForm} 
onChange={getInputValue}
onChange={getInputValue}
onChange={getInputValue}
onChange={getInputValue}
onChange={getInputValue} */}
    <div className='w-50 m-auto mt-5'>
        <h1 className='text-white my-4 text-center'>Registartion Form</h1>
        {erroeMsg?<div className="alert alert-danger my-3 ">{erroeMsg}</div>:''}
        <form onSubmit={submitForm} >
        <div className="input-gp my-4">
                <input onChange={getInputValue} type="text" name='first_name' className='form-control' placeholder='Enter Your First Name'/>
                 {setError("first_name")?<div className='text-danger mt-3'>{setError('first_name')}</div>:''}
            </div>
            <div className="input-gp my-4">
                <input onChange={getInputValue} type="text" name='last_name' className='form-control' placeholder='Enter Your Last Name'/>
                {setError("last_name")?<div className='text-danger mt-3'>{setError('last_name')}</div>:''}
            </div>
            <div className="input-gp my-4">
                <input onChange={getInputValue}  type="number" name='age' className='form-control'placeholder='Enter Your Age' />
                {setError("age")?<div className='text-danger mt-3'>{setError('age')}</div>:''}
            </div>
            <div className="input-gp my-4">
                <input onChange={getInputValue} type="email" name='email' className='form-control' placeholder='Enter Your Email' />
                {setError("email")?<div className='text-danger mt-3'>{setError('email')}</div>:''}
            </div>
            <div className="input-gp my-4">
                <input onChange={getInputValue} type="password" name='password' className='form-control' placeholder='Enter Your Password                    ' />
                {setError("password")?<div className='text-danger mt-3'>{setError('password')}</div>:''}
            </div>
            <div className="input-gp my-4">
               <button className={`${styles.btnStyle} btn text-white w-100`}>{btnLoading?<span>Waiting <i className='fa fa-spinner fa-spin'></i></span>:'Register'}</button>
            </div>
        </form>
    </div>
   
    </>
  )
}
