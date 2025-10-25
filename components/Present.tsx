import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faShieldHalved, faDiagramProject, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faPython, faReact } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

const Present: React.FC = () => {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  const iconTooltips: { [key: string]: string } = {
    "Python": "Python taught me the elegance of data structures and algorithms.",
    "React": "React showed me how to build dynamic and interactive user interfaces.",
    "Data": "My passion for data drives insights and intelligent solutions.",
    "AI + Security": "Combining AI with security to build robust and intelligent systems.",
    "Architecture": "Designing scalable and resilient software architectures.",
    "Leadership": "Leading teams to build impactful products and foster growth.",
  };

  return (
    <motion.section
      id="present"
      className="section bg-grad"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">The Architect’s Awakening</h2>
          <p className="text-white/80 mb-6">The rhythm of creation shifted from verses to variables. I discovered a new language in code, where logic and innovation intertwine. My purpose became the compiler, building digital architectures with the same passion I once poured into poetry.</p>
          <pre className="glass rounded-xl p-4 text-emerald text-sm overflow-x-auto"><code>const purpose = faith + patience;
console.log("Build to serve humanity");</code></pre>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 relative">
          {Object.keys(iconTooltips).map((iconName) => (
            <div
              key={iconName}
              className="glass p-6 rounded-xl text-center relative"
              onMouseEnter={() => setHoveredIcon(iconName)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              {iconName === "Python" && <FontAwesomeIcon icon={faPython} className="text-3xl" />}
              {iconName === "React" && <FontAwesomeIcon icon={faReact} className="text-3xl" />}
              {iconName === "Data" && <FontAwesomeIcon icon={faDatabase} className="text-3xl" />}
              {iconName === "AI + Security" && <FontAwesomeIcon icon={faShieldHalved} className="text-3xl" />}
              {iconName === "Architecture" && <FontAwesomeIcon icon={faDiagramProject} className="text-3xl" />}
              {iconName === "Leadership" && <FontAwesomeIcon icon={faPeopleGroup} className="text-3xl" />}
              <p className="mt-2 text-sm">{iconName}</p>
              {hoveredIcon === iconName && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-700 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
                  {iconTooltips[iconName]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Present;