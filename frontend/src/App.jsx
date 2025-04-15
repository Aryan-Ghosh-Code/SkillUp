// import LoginRegister from './Components/Login_Register/LoginRegister';
import {Routes, Route} from 'react-router-dom';
import Login from './Components/Login_Register/Login'; 
import LandingPage from './Components/LandingPage/LandingPage'; 

import ForgotPassword from './Components/Login_Register/ForgotPassword'; 

import Register from './Components/Login_Register/Register'; 
import MentorSkillSwap  from './Components/Mentor/MentorSkillSwap';
import Options from './Components/Mentor/Options';
import MentoredCourses from './Components/SkillSwapper/MentoredCourses';
import SwapSkillsLandingPage from './Components/SkillSwapper/SwapSkillsLandingPage';


function App() {
  return (
    <div>
      <Routes>
      <Route path = '/' element = {<LandingPage/>  } />
        <Route path = '/login' element = {<Login/>  } />
        <Route path = '/register' element = {<Register/>  } />
        <Route path = '/forgot-password' element = {<ForgotPassword/>  } />
        <Route path = '/mentor-skill-swap' element = {<MentorSkillSwap/> } /> 
        <Route path = '/options' element = {<Options/> } />
        <Route path = '/skillSwap' element = {<SwapSkillsLandingPage/>  } />
        <Route path = '/mentored-courses' element = {<MentoredCourses/>} />
      </Routes>

  </div>
  );
}

export default App;
