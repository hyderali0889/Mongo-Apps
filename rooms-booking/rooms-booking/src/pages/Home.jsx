
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
const Home = () => {

  const navigate = useNavigate();

  useEffect( () => {



    if(localStorage.getItem("userEmail") == null){
      navigate("/login")
    }

  } ,[] )

  return (
    <>
    <header>
      <h1 className='text-center'>Our Rooms</h1>
    </header>

    </>
  )
}

export default Home