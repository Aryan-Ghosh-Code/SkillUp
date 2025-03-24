// import LoginRegister from './Components/Login_Register/LoginRegister';
import {Routes, Route} from 'react-router-dom';
import Login from './Components/Login_Register/Login'; 
import LandingPage from './Components/LandingPage/LandingPage'; 

import ForgotPassword from './Components/Login_Register/ForgotPassword'; 

import Register from './Components/Login_Register/Register'; 


function App() {
  return (
    <div>
      <Routes>
        <Route path = '/' element = {<LandingPage/>  } />
        <Route path = '/login' element = {<Login/>  } />

        <Route path = '/register' element = {<Register/>  } />
        <Route path = '/forgot-password' element = {<ForgotPassword/>  } />
      </Routes>

  </div>
  );
}

export default App;
