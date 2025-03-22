// import LoginRegister from './Components/Login_Register/LoginRegister';
import {Routes, Route} from 'react-router-dom';
import Login from './Components/Login_Register/Login'; 
import Register from './Components/Login_Register/Register'; 


function App() {
  return (
    <div>
      <Routes>
        <Route path = '/login' element = {<Login/>  } />
        <Route path = '/register' element = {<Register/>  } />
      </Routes> 
  </div>
  );
}

export default App;
