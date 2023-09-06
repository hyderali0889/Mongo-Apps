"use client"
import React from 'react'
import styles from './Otp.module.css'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import not from "../Others/showNotification";
import axios from "axios";
import { useEffect } from 'react';

const OTP = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  useEffect( ()=> {
    var token = localStorage.getItem("token");

    if(token != null){

      router.push("/");

    }

      } );
  var verifyOTP = async (e) => {
    e.preventDefault();



    setIsLoading(true);
    try {
      const options = {
        headers: { "Content-Type": "application/json" }
      };
      var token = await axios.get(`http://localhost/User/verifyOtp/${email}`, options);
      setIsLoading(false);
      localStorage.setItem("token", token.data.token)
      router.push("/");
    }
    catch (err) {
      setIsLoading(false);
      not(
        `${err.response.data["error"]}`,
        "error",
        5000
      )

    }
  }

  return (
    <div className={styles.container} >

      <div className={styles.mainHead}>OTP Screen</div>

      <form action="" onSubmit={isLoading ? null : verifyOTP} className={styles.form}>

        <label htmlFor="">Enter OTP</label>
        <input type="text" required placeholder='Enter your OTP Here' className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className={styles.btn}>
          <input type='submit' className={isLoading ? styles.buttonDead : styles.button} value={isLoading ? "Loading..." : "Submit Otp"} />
        </div>

      </form>
    </div>
  )
}

export default OTP