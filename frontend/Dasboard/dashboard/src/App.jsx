
import styles from './App.module.css';
import { About } from "./components/About/About";
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from "./components/Hero/Hero";
import { Experience } from "./components/Experience/Experience";
import { Contact } from "./components/Contact/Contact";

function App() {

  return (
  <div className={styles.App}>
    <Navbar/>
    <Hero />
    <About />
    <Experience />
    <Contact />
    </div>
    )
};

export default App;
