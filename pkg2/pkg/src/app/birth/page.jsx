"use client"
import { useState } from 'react';
import React from 'react'
import styles from './page.module.css'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import not from "../../components/Others/showNotification";


const BirthForm = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [selectGender, setSelectGender] = useState('male')
  const [date, setDate] = useState('')
  const [birth, setBirth] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [town, setTown] = useState('')
  const [mother, setMother] = useState('')
  const [father, setFather] = useState('')
  const [motherCnic, setmotherCnic] = useState('')
  const [fatherCnic, setfatherCnic] = useState('')
  const [needTrans, setNeedTrans] = useState(false)
  const [transId, setTransId] = useState("")



  const router = useRouter();

  useEffect(() => {
    var token = localStorage.getItem("token");

    if (token == null) {

      router.push("/login");

    }

  });

  function addMonthToDate(s) {
    var b = s.split(/\D/);


    return new Date(b[0], parseInt(b[1]) + 5, b[2]);
  }

  // Handle submi function .........

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      // process the form...
      const options = {
        headers: { "Content-Type": "application/json" }
      };

      await axios.post("http://localhost/birth/addBirth", {
        "fullName": name,
        "email": email,
        "fatherFullName": father,
        "fatherCNIC": fatherCnic,
        "motherFullName": mother,
        "motherCNIC": motherCnic,
        "sex": selectGender,
        "DOB": date,
        "placeOfBirth": birth,
        "town": town,
        "transactionId": transId

      }, options);
      setIsLoading(false);
      router.push("/");

    } catch (err) {
      setIsLoading(false);
      console.log(err);
      not(`${err}`, "error", 5000)

    }





  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Request for a Birth Certificate</h1>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label >Enter Full Name</label>
          <input type="text" required placeholder='Enter Your Name' className={styles.input } value={name} onChange={(e) => setName(e.target.value)} />
          <label >Enter Email Address</label>

          <input type="text" required placeholder='Enter Your Email' className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />



          <label htmlFor="">Full Name of Father</label>
          <input type="text" required placeholder='Enter Full Name' className={styles.input} value={father} onChange={(e) => setFather(e.target.value)} />


          <label htmlFor="">Father&apos;s CNIC</label>
          <input type="number" required placeholder='Enter CNIC' className={styles.input} value={fatherCnic} onChange={(e) => setfatherCnic(e.target.value)} />


          <label htmlFor="">Full Name of Mother</label>
          <input type="text" required placeholder='Enter Full Name' className={styles.input} value={mother} onChange={(e) => setMother(e.target.value)} />

          <label htmlFor="">Mother&apos;s CNIC</label>
          <input type="number" required placeholder='Enter CNIC' className={styles.input} value={motherCnic} onChange={(e) => setmotherCnic(e.target.value)} />

          <label htmlFor="">sex</label>

          <select name="" required className={styles.input} value={selectGender} onChange={(e) => setSelectGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>



          </select>
          <label >Date of Birth</label>
          <input type="date" required placeholder=' Enter Your Date of Birth' className={styles.input} value={date} onChange={(e) => {

            var dateNow = new Date()
            var newDate = addMonthToDate(e.target.value);
            if (newDate < dateNow) {
              setNeedTrans(true);
            } else {
              setNeedTrans(false);
            }
            setDate(e.target.value)
          }} />



          <label htmlFor="">Place Of Birth</label>
          <input type="text" required placeholder='Enter Your PLace of BIrth' className={styles.input} value={birth} onChange={(e) => setBirth(e.target.value)} />


          <label htmlFor="">Town/village</label>
          <input type="text" required placeholder='Enter Your Town/Village' className={styles.input} value={town} onChange={(e) => setTown(e.target.value)} />

          <label >Transaction Id (Not Required for request less then 6 months old )</label>
          <input type="text" required={needTrans} placeholder='Enter Your Id' className={styles.input} value={transId} onChange={(e) => setTransId(e.target.value)} />

          <div className={styles.btn}>
            <input type='submit' className={isLoading ? styles.buttonDead : styles.button} value={isLoading ? "Loading..." : "Submit Form"} />


          </div>
        </form>




      </div>




    </div>
  )
}

export default BirthForm