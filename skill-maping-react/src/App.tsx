import Login from './Componenets/Login';
import Registration from './Componenets/Registration';
import { Route,Routes, useLocation } from 'react-router-dom';
import RegistrationConfirm from './Componenets/RegistrationConfirm';
import Home from './Componenets/Home';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Componenets/Navbar';
import RegisterUserInformation from './Componenets/RegisterUserInformation';
import ChangePasswordModel from './Componenets/ChangePasswordModel';
function App() {
  const location = useLocation();
  return (
    <div className="App">
      <ToastContainer />
      {location.pathname === '/' || location.pathname === '/registration' || location.pathname.includes('/confirmRegister/') || location.pathname.includes('/changePassword') ? null : <Navbar />}
      <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/" element={<Login />} />
      <Route path="/confirmRegister/:userId" element={<RegistrationConfirm />} />
      <Route  path="/home" element={<Home/>}/>
      <Route  path="/userInformation" element={ <RegisterUserInformation/>}/>
      <Route  path="/changePassword" element={<ChangePasswordModel/>}/>
    </Routes>
  </div>
  );
}

export default App;