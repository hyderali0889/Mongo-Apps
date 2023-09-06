import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route   } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Rooms from "./pages/Rooms";
import Home from "./pages/Home";
import RoomDetails from "./pages/RoomDetails";
import Register from "./pages/register";
import Login from "./pages/Login";
import BookingPage from "./pages/BookingPage";

function App() {


  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<RoomDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking/:id" element={<BookingPage />} />
      </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
