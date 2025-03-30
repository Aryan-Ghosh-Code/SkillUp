
import styles from './App.module.css';
import { About } from "./components/About/About";
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from "./components/Hero/Hero";

function App() {

  return (
  <div className={styles.App}>
    <Navbar/>
    <Hero />
    <About />
    </div>
    )
};

export default App;
