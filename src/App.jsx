//rafce

import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger, SplitText} from 'gsap/all'
import Navbar from './components/Navbar';
import Hero from './components/Hero';

gsap.registerPlugin(ScrollTrigger, SplitText); //-> INFO: registrare i plugin nell'app serve a renderli automaticamente attivi e disponibili globalmente nell'app
 
const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
    </main>
  )
}

export default App
