import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faBrain, faBook, faCode, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Narrator from './Narrator';

const Hero: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  const handlePlayMyStoryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // For smooth scrolling, consider using a library like react-scroll or implementing it manually
    document.getElementById('past')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="landing" className="section bg-grad">
      <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative justify-self-center">
          <div className="orbit">
            <img
              src="/lukeokagha.jpg"
              alt="Luke Okagha portrait"
              className={`w-72 h-72 md:w-80 md:h-80 rounded-full ring-aura object-cover transition-all duration-300 ease-in-out ${isHovered ? 'shadow-glow-hover' : 'shadow-glow'}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            {/* floating orbit nodes */}
            {[faGamepad, faBrain, faBook, faCode, faLightbulb].map((icon, i) => (
              <div
                key={i}
                className="node orb"
              >
                <FontAwesomeIcon icon={icon} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">I Am <span className="text-emerald">Luke Okagha</span></h1>
          <p className="text-white/80 text-lg md:text-xl mb-6">From the vibrant streets of Benin to the cutting edge of technology, I am a poet who codes Africa's future. Embark on an immersive journey through my story of resilience, innovation, and vision.</p>
          <div className="flex flex-wrap gap-3">
            <a href="#past" onClick={handlePlayMyStoryClick} className="btn bg-sapphire px-6 py-3 rounded-full">Play My Story</a>
            <a href="#present" className="btn border border-white/20 px-6 py-3 rounded-full">Skip to Present</a>
            <a href="/Luke_Okagha Resume.pdf" download className="btn bg-emerald px-6 py-3 rounded-full">Download My CV</a> {/* New Download CV button */}
          </div>
          {/* <Narrator text="Welcome to Luke's immersive biography experience." /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
