"use client"
import React from 'react'
import styles from './Admin.LogIn.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import not from "../Others/showNotification";
import axios from "axios";
import { useEffect } from 'react';

const AdminLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("")
  const [isLoading , setIsLoading] = useState(false);
  const router = useRouter();

  useEffect( ()=> {
    var token = localStorage.getItem("admintoken");
    if(token != null){
      router.push("/admin/birthforms");
    }
      });

 var Login = async(e) => {
  try {
    setIsLoading(true);
    e.preventDefault();
    const options = {
      headers: { "Content-Type":"application/json"}
    };

    const token = await axios.post( "http://localhost/admin/Login" , {
      "email":email,
      "password":password
    } , options);

    router.push("/admin/birthforms");

    localStorage.setItem("admintoken" , token.data.token)

    setIsLoading(false);

  } catch (err) {
    console.log(err);
    setIsLoading(false);
    not(`${err.response.data["error"]}` , "error" , 5000)

  }
 }

  return (
    <div className={styles.container} >

      <div className={styles.mainHead}>Admin Login</div>

<form action="" onSubmit={Login}  className={styles.form}>

      <label htmlFor="">Email</label>
      <input type="text" required placeholder='Enter your Email' className={styles.input}
       onChange={(e)=>setEmail(e.target.value)}
      />
      <label htmlFor="">Password</label>
      <input type="password" required placeholder='Enter your Password' className={styles.input}
       onChange={(e)=>setPassword(e.target.value)}
      />
         <div className={styles.btn}>
      <input type='submit'  className={ isLoading? styles.buttonDead : styles.button} value={isLoading ? "Loading..." : "Log In"} />
      </div>
      </form>




    </div>
  )
}

export default AdminLogin