import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import  CourseRecommendations  from './Components/MentorDash/CourseRecommendations';
import  ActivitySections  from './Components/MentorDash/ActivitySections';
import  MentorDash  from './Components/MentorDash/MentorDash';
import  Notifications  from './Components/MentorDash/Notifications';
import  ProfileSection from './Components/MentorDash/ProfileSection';
import  Sidebar  from './Components/MentorDash/Sidebar';
import  SkillsSection from './Components/MentorDash/SkillsSection';
function App() {
  return (
    <div className="App">
      <CourseRecommendations/>
      <ActivitySections/>
      <MentorDash/>
      <Notifications/>
      <ProfileSection/>
      <Sidebar/>
      <SkillsSection/>
    </div>
  )
};

export default App;
