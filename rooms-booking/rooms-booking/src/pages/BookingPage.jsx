import { useNavigate , useParams} from "react-router-dom";
import { useEffect , useState } from 'react';
import { addDoc , collection } from "firebase/firestore";
import {firestore} from "../utils/firebase.config";


const BookingPage = () => {

  const navigate = useNavigate();
  const params = useParams();
  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [phone , setPhone] = useState("");
  const [checkIn , setCheckIn] = useState("");
  const [checkOut , setCheckOut] = useState("");
  const [guests , setGuests] = useState("");
  const [cardName , setCardName] = useState("");
  const [cardNum , setCardNum] = useState("");
  const [cardExp , setCardExp] = useState("");
  const [cardCVC , setCardCVC] = useState("");

  useEffect( () => {



    if(localStorage.getItem("userEmail") == null){
      navigate("/login")
    }

  } ,[] )

  const submitForm =(e)=> {
    e.preventDefault();
try{
  addDoc( collection( firestore , "bookings" ) , {
    "name" : name ,
    "email":email,
    "hotelId" : params.id,
    "phone" : phone,
    "Check In" :checkIn,
    "Check Out" : checkOut,
    "Guests" : guests,
    "Name on Card" : cardName,
    "Card Number" : cardNum ,
    "Card Expiry" : cardExp ,
    "Card CVC" : cardCVC


      } ).then(() => {
        navigate("/");
      })

}catch(e){
  console.log(e);
}


  }
  return (
    <>

 <form onSubmit={submitForm} >

        <div className="form-container">

  <div className="form-column">
    <h2>Personal Information</h2>


    <label htmlFor="fullname">Full Name:</label>
    <input onChange={ (e) => setName(e.target.value) } type="text" id="fullname" name="fullname" required/>

    <label htmlFor="email">Email:</label>
    <input onChange={ (e) => setEmail(e.target.value) } type="email" id="email" name="email" required />

    <label htmlFor="phone">Phone Number:</label>
    <input onChange={ (e) => setPhone(e.target.value) } type="tel" id="phone" name="phone" required />
  </div>

  <div className="form-column">
    <h2>Booking Details</h2>
    <label htmlFor="checkin">Check-in Date:</label>
    <input onChange={ (e) => setCheckIn(e.target.value) } type="date" id="checkin" name="checkin" required />

    <label htmlFor="checkout">Check-out Date:</label>
    <input onChange={ (e) => setCheckOut(e.target.value) } type="date" id="checkout" name="checkout" required />

    <label htmlFor="guests">Number of Guests:</label>
    <input onChange={ (e) => setGuests(e.target.value) } type="number" id="guests" name="guests" min="1" max="10" required />
  </div>

  <div className="form-column">
    <h2>Payment Information</h2>
    <label htmlFor="cardname">Cardholder Name:</label>
    <input onChange={ (e) => setCardName(e.target.value) } type="text" id="cardname" name="cardname" required />

    <label htmlFor="cardnumber">Card Number:</label>
    <input onChange={ (e) => setCardNum(e.target.value) }  type="text" id="cardnumber" name="cardnumber" required />

    <label htmlFor="expiry">Expiry Date:</label>
    <input onChange={ (e) => setCardExp(e.target.value) }  type="text" id="expiry" name="expiry" placeholder="MM/YY" required />

    <label htmlFor="cvv">CVV:</label>
    <input onChange={ (e) => setCardCVC(e.target.value) }  type="text" id="cvv" name="cvv" required />
  </div>

</div>

<div className="d-flex w-100 justify-content-center">

<input type="submit" value={"Submit Data"} className="btn mt-2 btn-outline-success w-50 " />

</div>

  </form>

    </>

  )
}

export default BookingPage