import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Future: React.FC = () => {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  const cityVisionNodes: { [key: string]: string } = {
    "Lagos": "Innovation Hub, Tech Talent Development, Startup Ecosystem.",
    "Nairobi": "Green Energy Initiatives, Digital Inclusion, Agricultural Tech.",
    "Accra": "Creative Industries, Youth Empowerment, Sustainable Urbanization.",
    "Cairo": "Historical Preservation, Cultural Exchange, Smart City Solutions.",
    "Addis Ababa": "Pan-African Unity, Diplomatic Hub, Infrastructure Development.",
  };

  const handleRevealTricode = () => {
    window.open('https://www.tricode.pro', '_blank'); // Redirect to tricode.pro
  };

  return (
    <motion.section
      id="future"
      className="section bg-grad"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">The Visionary of Africa</h2>
        <p className="text-white/80 max-w-3xl mx-auto mb-8">My vision extends to a future where Africa leads, not follows. We are not just consumers of technology, but creators of destiny. I am committed to building innovative solutions that empower our continent and showcase its boundless potential.</p>
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {Object.keys(cityVisionNodes).map((city) => (
            <div
              key={city}
              className="relative"
              onMouseEnter={() => setHoveredCity(city)}
              onMouseLeave={() => setHoveredCity(null)}
            >
              <span className="glass px-4 py-2 rounded-full cursor-pointer">{city}</span>
              {hoveredCity === city && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-700 text-white text-xs rounded-lg shadow-lg whitespace-nowrap">
                  {cityVisionNodes[city]}
                </div>
              )}
            </div>
          ))}
        </div>
        <button onClick={handleRevealTricode} className="btn bg-emerald px-6 py-3 rounded-full">
          Reveal TRICODE Emblem
        </button>
      </div>
    </motion.section>
  );
};

export default Future;