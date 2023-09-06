import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ8jVvJ-Rz7KWTKa4JPuR_wnRNTyo_oVM",
  authDomain: "test-94528.firebaseapp.com",
  projectId: "test-94528",
  storageBucket: "test-94528.appspot.com",
  messagingSenderId: "943220928759",
  appId: "1:943220928759:web:a894590c6fe868fbc0a3f2"
};
 const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
 export {app  ,firestore };