import { useState } from "react"
import { firestore } from "../utils/firebase.config";
import {collection , addDoc} from "firebase/firestore"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Register = () => {
  const navigate = useNavigate();
  useEffect( () => {
    if(localStorage.getItem("userEmail") != null){
      navigate("/")
    }
  } ,[] )
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
try{
   addDoc( collection(firestore , "Users") , {
    "name":name,
    "email" : email,
    "password":password
   }).then(() => {
    navigate("/")
   });

}catch(e){
  console.log(e);
}
}
  return (
    <div className='contaner'>
   <form className='form' onSubmit={submitForm } >
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
    <input required type="text" className="form-control" onChange={ (e)=>{ setName(e.target.value)}} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword" className="form-label">Email</label>
    <input required type="email"  onChange={(e) => {  setEmail(e.target.value) }} className="form-control" id="exampleInputPassword"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input required type="password"  onChange={(e) => {setPassword(e.target.value)}}  className="form-control" id="exampleInputPassword1"/>
  </div>
  <input value={"Register"} type="submit" className="btn btn-primary"/>
</form>

   </div>
  )
}

export default Register