
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "../utils/firebase.config";


const Rooms = () => {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userEmail") == null) {
      navigate("/login")
    }

    try {

      setLoading(true);

      getDocs(collection(firestore, "hotels")).then((e) => {

        setData(e._snapshot.docChanges)
        setLoading(false);
      })
    } catch (e) {
      setLoading(false);
      console.log(e);
    }




  }, [])
  return (
    <div className='container'>


      {loading ? <div>Loading...</div> :

      data.map((e) => {


       return(<div key={e.doc.data.value.mapValue.fields.id.integerValue} className="row bs justify-content-center mt-5">
          <div className="col-md-4 p-2 m-2  ">
            <img src={e.doc.data.value.mapValue.fields.imageurls.arrayValue.values[0].stringValue}  crossOrigin='Anonymous'   alt="" className='smallimage' />
          </div>
          <div className="col-md-7 ">
            <h1 className='title'>{e.doc.data.value.mapValue.fields.name.stringValue}</h1>
            <p> Max Count : {e.doc.data.value.mapValue.fields.maxCount.integerValue}</p>
            <p>Phone Number : {e.doc.data.value.mapValue.fields.phoneNumber.integerValue}</p>
            <p>Type : {e.doc.data.value.mapValue.fields.type.stringValue}</p>
            <div style={{ float: 'right' }}>
              <Link to={`/booking/${e.doc.data.value.mapValue.fields.id.integerValue}` }>
                <button className='btn btn-primary m-3'>Book Now</button>
              </Link>
              <Link to={`/details/${e.doc.data.value.mapValue.fields.id.integerValue}`}>
                <button className='btn btn-primary m-3'>view details</button>
              </Link>
            </div>
          </div>
        </div>)
      })


      }




    </div>
  )
}

export default Rooms