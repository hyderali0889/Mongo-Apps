
import { useNavigate , useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import {query , getDocs ,where, collection} from "firebase/firestore";
import {firestore} from "../utils/firebase.config";
const RoomDetails = () => {

  const navigate = useNavigate();
  const params = useParams();
  const [data,setData] = useState([]);
  const [loading , setLoading] = useState(false);

  useEffect( () => {

    console.log(params.id);
    if(localStorage.getItem("userEmail") == null){
      navigate("/login")
    }

    try{
      setLoading(true);

      console.log("started");
      const quey = query(collection(firestore,"hotels") , where("id","==" , parseInt(params.id)) );

     getDocs(quey).then( (e)=> {

       setData(e._snapshot.docChanges);
       setLoading(false);
     });




    }catch(e){
console.log(e);
setLoading(false);
    }

  } ,[] );

  return (

    <div>

      {loading ? <div> Loading.... </div> :

      data.map((e) => {

        console.log(e.doc.data.value.mapValue.fields.imageurls.arrayValue.values[0].stringValue);

        return (
          <div key={"gg"} className="room-details-container">
          <div className="room-images">
            <img src={e.doc.data.value.mapValue.fields.imageurls.arrayValue.values[0].stringValue} alt="Room Image 1"/>
            <img src={e.doc.data.value.mapValue.fields.imageurls.arrayValue.values[1].stringValue} alt="Room Image 2"/>
            <img src={e.doc.data.value.mapValue.fields.imageurls.arrayValue.values[2].stringValue} alt="Room Image 3"/>
          </div>
          <div className="room-information">
            <h1> {e.doc.data.value.mapValue.fields.name.stringValue} </h1>
            <p className="room-type">Room Type : {e.doc.data.value.mapValue.fields.type.stringValue} </p>
            <p className="room-price">Price per night: $ {e.doc.data.value.mapValue.fields.rentperday.integerValue}  </p>
            <p className="room-description">
            {e.doc.data.value.mapValue.fields.description.stringValue}
            </p>
            <h2>Amenities</h2>
            <ul className="amenities-list">
              <li>King-size bed</li>
              <li>Private bathroom</li>
              <li>Air conditioning</li>
              <li>Flat-screen TV</li>
              <li>Mini bar</li>
              <li>Free Wi-Fi</li>
            </ul>
          </div>
        </div>




        )
      })




        }









</div>



  )
}

export default RoomDetails