import { Outlet, Route, Routes } from "react-router-dom";

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
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/services"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        />
        <Route
          path="/services/:serviceId"
          element={
            <PrivateRoute>
              <ServiceView />
            </PrivateRoute>
          }
        />

        <Route
          path="/panel"
          element={
            <AdminPrivateRoute>
              <PanelAdmin />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/create-service"
          element={
            <AdminPrivateRoute>
              <CreateService />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/edit-service/:serviceId"
          element={
            <AdminPrivateRoute>
              <EditService />
            </AdminPrivateRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
