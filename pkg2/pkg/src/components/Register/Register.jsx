"use client"
import React from 'react'
import styles from './Register.module.css'
import { useState } from 'react';
import Link  from 'next/link';
import { useRouter } from 'next/navigation';

import not from "../Others/showNotification";


import axios from "axios";
import { useEffect } from 'react';


const Register = () => {

    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("")
  const [isLoading , setIsLoading] = useState(false);
  const router = useRouter();

  useEffect( ()=> {
    var token = localStorage.getItem("token");

    if(token != null){

      router.push("/");

    }

      } );




  let RegisterUser = async(e) => {

    e.preventDefault();
    const options = {
      headers: { "Content-Type":"application/json"}
    };

    setIsLoading(true);

 axios.post("http://localhost/User/Register" ,{
      "name":name,
      "email" : email,
      "password" :password
    } , options ).then((res)=>{
      setIsLoading(false);
      console.log(res);
      router.push("/Otp");
    }).catch( (err)=>{
      console.log(err);
      setIsLoading(false);
      not(`${err.response.data["error"]}` , "error" , 5000)
    } );


  }
  return (
    <div className={styles.container} >

      <div className={styles.mainHead}>Register</div>

<form action="" onSubmit={ isLoading? null : RegisterUser} className={styles.form}>
      <label htmlFor="">Name</label>
      <input type="text" required placeholder='Enter your Name' className={styles.input}
      onChange={(e)=>setName(e.target.value)}


      />
      <label htmlFor="">Email</label>
      <input type="text" required placeholder='Enter your Email' className={styles.input}
       onChange={(e)=>setEmail(e.target.value)}
      />
      <label htmlFor="">Password</label>
      <input type="password" required placeholder='Enter your Password' className={styles.input}
       onChange={(e)=>setPassword(e.target.value)}
      />
      <div className={styles.btn} >
      <input type='submit' className={ isLoading ? styles.buttonDead : styles.buttonx}  value={ isLoading? "Loading..": "Register"}  />
    </div>
      </form>

      <Link href="/" className={styles.links}> Login </Link>

    </div>
  )
}

export default Register