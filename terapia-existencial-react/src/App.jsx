import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Services from "./pages/Services";
// import SelectDate from "./pages/SelectDate";
import ServiceView from "./pages/ServiceView";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import AboutMe from "./pages/AboutMe";
import Register from "./pages/Register";
import PanelAdmin from "./pages/PanelAdmin";
import CreateService from "./pages/CreateNewService";
import EditService from "./pages/EditService";
//import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/iniciar-sesion" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/servicios" element={<Services />} />
          {/* <Route path="/servicios/seleccionar-fecha" element={<SelectDate />} /> */}
          <Route path="/servicios/:serviceId" element={<ServiceView />} />
          <Route path="/panel" element={<PanelAdmin />} />
          <Route path="/create-service" element={<CreateService />} />
          <Route path="/edit-service/:serviceId" element={<EditService />} />
        </Routes>
        <Footer/>
    </div>
  );
}

 export default App;
