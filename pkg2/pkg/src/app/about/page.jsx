"use client"

import React from 'react'
import styles from './page.module.css'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Products from '../../components/About/About';
const About = () => {
  const router = useRouter();

    useEffect( ()=> {
 var token = localStorage.getItem("token");

  if(token == null){

    router.push("/login");

  }

    } );
  return (
    <div className={styles.container}> <Products/> </div>
  )
}

export default About;