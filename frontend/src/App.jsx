// // import LoginRegister from './Components/Login_Register/LoginRegister';
// import { Routes, Route } from 'react-router-dom';
// import Login from './Components/Login_Register/Login';
// import LandingPage from './Components/LandingPage/LandingPage';

// import ForgotPassword from './Components/Login_Register/ForgotPassword';
// import Register from './Components/Login_Register/Register';
// import MentorSkillSwap from './Components/Mentor/MentorSkillSwap';
// import MentoredCourses from './Components/SkillSwapper/MentoredCourses';
// import SwapSkillsLandingPage from './Components/SkillSwapper/SwapSkillsLandingPage';
// import CreateCourse from './Components/Mentor/createCourse';
// import CreateSwap from './Components/SkillSwapper/createSwap';
// import JoinSwap from './Components/SkillSwapper/joinSwap';
// import UserProfile from './Components/SkillSwapper/userProfile';
// import MentorProfile from './Components/Mentor/mentorProfile';
// import ViewMySwaps from './Components/SkillSwapper/viewMySwaps';
// import { useAuthContext } from './context/AuthContext';
// import { Toaster } from 'react-hot-toast';
// import MyCourses from './Components/Mentor/myCourses';
// function App() {
//   const { authUser } = useAuthContext();
//   console.log(authUser);

//   return (
//     <div>
//       <Routes>
//         <Route path='/' element={<LandingPage />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/forgot-password' element={<ForgotPassword />} />
//         <Route path='/mentor-skill-swap' element={<MentorSkillSwap />} />
//         <Route path='/skillSwap' element={<SwapSkillsLandingPage />} />
//         <Route path='/mentored-courses' element={<MentoredCourses />} />
//         <Route path='/create-courses' element={<CreateCourse />} />
//         <Route path='/create-swap' element={<CreateSwap />} />
//         <Route path='/join-swap' element={<JoinSwap />} />
//         <Route path='/user-profile' element={<UserProfile />} />
//         <Route path='/mentor-profile' element={<MentorProfile />} />
//         <Route path='/view-swap' element={<ViewMySwaps />} />
//         <Route path='/my-courses' element={<MyCourses />} />
//       </Routes>
      
//       <Toaster />
//     </div>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

// Auth Pages
import Login from './Components/Login_Register/Login';
import Register from './Components/Login_Register/Register';
import ForgotPassword from './Components/Login_Register/ForgotPassword';

// Landing Page
import LandingPage from './Components/LandingPage/LandingPage';

// Mentor Components
import MentorSkillSwap from './Components/Mentor/MentorSkillSwap';
import CreateCourse from './Components/Mentor/createCourse';
import MentorProfile from './Components/Mentor/mentorProfile';
import MyCourses from './Components/Mentor/myCourses';

// SkillSwapper Components
import SwapSkillsLandingPage from './Components/SkillSwapper/SwapSkillsLandingPage';
import MentoredCourses from './Components/SkillSwapper/MentoredCourses';
import CreateSwap from './Components/SkillSwapper/createSwap';
import JoinSwap from './Components/SkillSwapper/joinSwap';
import UserProfile from './Components/SkillSwapper/userProfile';
import ViewMySwaps from './Components/SkillSwapper/viewMySwaps';

// ProtectedRoute Wrapper
const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  return authUser ? children : <Navigate to="/" />;
};

function App() {
  const { authUser } = useAuthContext();
  console.log(authUser); // For debugging purposes

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/mentor-skill-swap"
          element={
            <ProtectedRoute>
              <MentorSkillSwap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/skillSwap"
          element={
            <ProtectedRoute>
              <SwapSkillsLandingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentored-courses"
          element={
            <ProtectedRoute>
              <MentoredCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-course"
          element={
            <ProtectedRoute>
              <CreateCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-swap"
          element={
            <ProtectedRoute>
              <CreateSwap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/join-swap"
          element={
            <ProtectedRoute>
              <JoinSwap />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor-profile"
          element={
            <ProtectedRoute>
              <MentorProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-swap"
          element={
            <ProtectedRoute>
              <ViewMySwaps />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
