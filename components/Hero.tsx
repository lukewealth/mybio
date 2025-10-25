import Image from 'next/image';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faBrain, faBook, faCode, faLightbulb, faMicrophone, faGlobe, faRobot, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import Narrator from './Narrator';
import LukeokaghaImage from '../public/Lukeokagha.jpg';

interface IconData {
  icon: any;
  key: string;
  text: string;
}

const iconData: IconData[] = [
  { icon: faGamepad, key: 'games', text: "Building immersive gaming experiences." },
  { icon: faBrain, key: 'ai-products', text: "Crafting intelligent AI-powered solutions." },
  { icon: faBook, key: 'poetry', text: "Expressing vision through the art of poetry." },
  { icon: faCode, key: 'coding', text: "Developing robust and scalable software." },
  { icon: faLightbulb, key: 'innovation', text: "Innovating for a brighter, tech-driven future." },
  { icon: faMicrophone, key: 'spoken-word', text: "Sharing stories and insights through spoken word." },
  { icon: faGlobe, key: 'global-impact', text: "Creating products with a global reach and impact." },
  { icon: faRobot, key: 'robotics', text: "Exploring the frontiers of robotics and automation." },
  { icon: faCodeBranch, key: 'open-source', text: "Contributing to and leveraging open-source projects." },
];

const Hero: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false); // State for hover effect
  const [hoveredIconKey, setHoveredIconKey] = useState<string | null>(null); // State for icon hover

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
            <Image
              src={LukeokaghaImage}
              alt="Luke Okagha portrait"
              width={288}
              height={288}
              priority
              className={`rounded-full ring-aura object-cover transition-all duration-300 ease-in-out ${isHovered ? 'shadow-glow-hover' : 'shadow-glow'}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            {/* floating orbit nodes */}
            {iconData.map((data, i) => (
              <div
                key={data.key}
                className="node orb"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${10 + i * 1}s`,
                  animation: `${i % 2 === 0 ? 'rotate' : 'rotate-alt'} ${10 + i * 1}s linear infinite, ${i % 2 === 0 ? 'float' : 'float-alt'} 3s ease-in-out infinite`,
                }}
                onMouseEnter={() => setHoveredIconKey(data.key)}
                onMouseLeave={() => setHoveredIconKey(null)}
              >
                <FontAwesomeIcon icon={data.icon} />
                {hoveredIconKey === data.key && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-700 text-white rounded-lg shadow-lg whitespace-nowrap opacity-0 animate-fade-in popup-text-lg">
                    {data.text}
                  </div>
                )}
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
            <a href="/Lukeoresume.pdf" download className="btn bg-emerald px-6 py-3 rounded-full">Download My CV</a> {/* New Download CV button */}
          </div>
          {/* <Narrator text="Welcome to Luke's immersive biography experience." /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
