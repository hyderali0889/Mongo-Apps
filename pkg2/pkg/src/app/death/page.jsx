"use client"
import React from 'react'
import styles from './page.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';

import not from "../../components/Others/showNotification";

const DeathForm = () => {
  const [fullName, setfullName] = useState('')
  const [selectGender, setSelectGender] = useState('male')
  const [date, setDate] = useState('')
  const [deathPlace, setDeathPlace] = useState('')
  const [town, setTown] = useState('')
  const [desCnic, setDesCnic] = useState('')
  const [cnic, setCnic] = useState('')
  const [causeDeath, setCauseDeath] = useState('')
  const [needTrans, setNeedTrans] = useState(false)
  const [transId, setTransId] = useState("")
  const [isLoading , setIsLoading] = useState(false);
  const [email, setEmail] = useState('')
  const [NOK, setNOK] = useState('')

  const router = useRouter();

  useEffect(() => {
    var token = localStorage.getItem("token");

    if (token == null) {

      router.push("/login");

    }

  });



  function addMonthToDate(s) {
    var b = s.split(/\D/);
    return new Date(b[0],  parseInt(b[1]) + 5, b[2]);
  }

// Handle submi function .........

const handleSubmit=async(e) =>{
try{
  e.preventDefault();
  setIsLoading(true);

  // process the form...
  const options = {
    headers: { "Content-Type":"application/json"}
  };

 await axios.post("http://localhost/death/addDeath" , {
  "fullName":fullName,
  "email" : email,
  "nextOfKinFullName" : NOK,
  "nextOfkinCNIC" : cnic,
  "DeathCNIC" : desCnic,
  "sex":selectGender,
  "DOD" : date,
  "placeOfDeath":deathPlace,
  "causeOfDeath":causeDeath,
  "town":town,
  "transactionId":transId

  } , options);
  setIsLoading(false);
  router.push("/");

}catch(err){
  setIsLoading(false);
  console.log(err);
  not(`${err}` , "error" , 5000)

}

}





  return (
    <div className={styles.container}>

      <h1 className={styles.title}> Request for a Death Certificate</h1>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label >Enter Full Name Of Deceased</label>
          <input required type="text" placeholder='Enter Your Name' className={styles.input} value={fullName} onChange={(e) => setfullName(e.target.value)} />
          <label >Enter Email Address</label>

<input type="text" required placeholder='Enter Your Email' className={styles.input} value={email} onChange={(e)=>setEmail(e.target.value)} />
<label htmlFor="">Full Name of Next of Kin</label>
          <input type="text" placeholder='Enter Full Name' className={styles.input} value={NOK} onChange={(e) => setNOK(e.target.value)} />

          <label htmlFor="">CNIC of next of Kin</label>
          <input required type="number" placeholder='Enter CNIC' className={styles.input} value={cnic} onChange={(e) => setCnic(e.target.value)} />
          <label htmlFor="">CNIC of the person Deceased</label>
          <input required type="number" placeholder='Enter CNIC' className={styles.input} value={desCnic} onChange={(e) => setDesCnic(e.target.value)} />

          <label htmlFor="">sex of Deceased</label>
          <select name="" className={styles.input} value={selectGender} onChange={(e) => setSelectGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>



          </select>

          <label >Date of Death</label>
          <input required type="date"  placeholder=' Enter Your Date of Birth' className={styles.input} value={date} onChange={(e) => {
            var dateNow = new Date()
            var newDate = addMonthToDate(e.target.value);
            if (newDate < dateNow) {
              setNeedTrans(true);
            } else {
              setNeedTrans(false);
            }
            setDate(e.target.value)
          }} />


          <label htmlFor="">Place Of Death</label>
          <input required type="text" placeholder='Enter Your PLace of BIrth' className={styles.input} value={deathPlace} onChange={(e) => setDeathPlace(e.target.value)} />
          <label htmlFor="">Town/village</label>
          <input required type="text" placeholder='Enter Your Town/Village' className={styles.input} value={town} onChange={(e) => setTown(e.target.value)} />


          <label htmlFor="">Cause Of Death</label>
          <input required type="text" placeholder='' className={styles.input} value={causeDeath} onChange={(e) => setCauseDeath(e.target.value)} />

          <label >Transaction Id (Not Required for request less then 6 months old )</label>
          <input type="text" required={needTrans} placeholder='Enter Your Id' className={styles.input} value={transId} onChange={(e) => setTransId(e.target.value)} />




          <div className={styles.btn}>
            <input type='submit' className={ isLoading ? styles.buttonDead :styles.button} value={isLoading ? "Loading.." :"Submit Form "} />


          </div>
        </form>



      </div>

    </div>
  )
}

export default DeathForm;