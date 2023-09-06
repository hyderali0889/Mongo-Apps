"use client"
import React from 'react'
import styles from './LogIn.module.css'
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import not from "../Others/showNotification";
import axios from "axios";
import { useEffect } from 'react';

const LogIn = () => {
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

  let LoginUser = async(e) => {

    e.preventDefault();
    const options = {
      headers: { "Content-Type":"application/json"}
    };

    setIsLoading(true);

 axios.post("http://localhost/User/Login" ,{

      "email" : email,
      "password" :password
    } , options ).then((res)=>{
      setIsLoading(false);

      localStorage.setItem("token", res.data.token)
      router.push("/");
    }).catch( (err)=>{
      console.log(err.response.data["error"]);
      setIsLoading(false);
      not(`${err.response.data["error"]}` , "error" , 5000)
    } );


  }


  return (
    <div className={styles.container} >

      <div className={styles.mainHead}>Login</div>

<form action="" onSubmit={isLoading ? null : LoginUser}  className={styles.form}>

      <label htmlFor="">Email</label>
      <input type="text" required placeholder='Enter your Email' className={styles.input}
       onChange={(e)=>setEmail(e.target.value)}
      />
      <label htmlFor="">Password</label>
      <input type="password" required placeholder='Enter your Password' className={styles.input}
       onChange={(e)=>setPassword(e.target.value)}
      />
      <div className={styles.btn}>
      <input type='submit' className={ isLoading? styles.buttonDead : styles.butto} value={isLoading ? "Loading..." : "Login"} />
      </div>
      </form>


      <Link href="/register" className={styles.links}> Register Yourself </Link>
    </div>
  )
}

export default LogIn