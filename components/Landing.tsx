import React, { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faBrain, faBook, faCode, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import Narrator from './Narrator';

const Landing: React.FC = () => {
  const n1Ref = useRef<HTMLDivElement>(null);
  const n2Ref = useRef<HTMLDivElement>(null);
  const n3Ref = useRef<HTMLDivElement>(null);
  const n4Ref = useRef<HTMLDivElement>(null);
  const n5Ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false); // State for hover effect

  useEffect(() => {
    const nodes = [n1Ref, n2Ref, n3Ref, n4Ref, n5Ref];

    nodes.forEach((ref, i) => {
      if (ref.current) {
        gsap.set(ref.current, { left: "50%", top: "50%" });
        gsap.to(ref.current, { rotate: 360, duration: 18 + i * 2, ease: "none", repeat: -1 });
        gsap.to(ref.current, { x: (i % 2 ? 1 : -1) * 140, y: i * 10 - 80, yoyo: true, repeat: -1, duration: 3 + i, ease: "sine.inOut" });
      }
    });
  }, []);

  const handlePlayMyStoryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    gsap.to(window, { duration: 1, scrollTo: "#past", ease: "power2.inOut" });
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
            <div className="node orb" ref={n1Ref}><FontAwesomeIcon icon={faGamepad} /></div>
            <div className="node orb" ref={n2Ref}><FontAwesomeIcon icon={faBrain} /></div>
            <div className="node orb" ref={n3Ref}><FontAwesomeIcon icon={faBook} /></div>
            <div className="node orb" ref={n4Ref}><FontAwesomeIcon icon={faCode} /></div>
            <div className="node orb" ref={n5Ref}><FontAwesomeIcon icon={faLightbulb} /></div>
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

export default Landing;