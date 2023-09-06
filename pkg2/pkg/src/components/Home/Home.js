"use client"
import React from 'react';
import { useEffect } from 'react';
import InfoSection from './Components/InfoSection/InfoSection';
import { homeObjOne, homeObjThree, homeObjTwo, homeObjFour } from './Data';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    var token = localStorage.getItem("token");
    if (token == null) {
      router.push("/login");
    }
  });
  return (
    <>
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjThree} />
      <InfoSection {...homeObjTwo} />
      <InfoSection {...homeObjFour} />
    </>
  )
}

export default Home;