import login from '../assets/undraw_secure_login_pdn4.png'
import { useState } from "react"
import { firestore } from "../utils/firebase.config";
import { collection , getDocs, where, query} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

const Login = () => {

  const navigate = useNavigate();

  useEffect( () => {



    if(localStorage.getItem("userEmail") != null){
      navigate("/")
    }

  } ,[] )

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
e.preventDefault();
 const quer = query( collection(firestore , "Users") , where("email" , "==" , email) , where("password" , "==" , password)  );

    getDocs(quer ) .then( (e) => {
      if(e._snapshot.docChanges.length == 0){
        console.log("nothing Found");
  // Todo Implement No User Found Error Handler


        return;
      }


     localStorage.setItem( "userEmail" ,e._snapshot.docChanges[0].doc.data.value.mapValue.fields.email.stringValue  )
 navigate("/");
    })
  }
  return (
    <div className='contaner'>

      <div className='login-image'>
        <img src={login} className='w-100 h-100' alt="" />
      </div>

      <div className="login-form">
 <form className='form' onSubmit={submitForm } >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input required type="email"  onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" required className="form-label">Password</label>
            <input required type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
          </div>
          <input type='submit'  value={"Log In"}  className="btn btn-primary" />
 </form>
      </div>


    </div>
  )
}

export default Login