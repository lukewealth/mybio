import React, { useState } from 'react';
import Narrator from './Narrator'; // Import Narrator
import { motion } from 'framer-motion';

const Past: React.FC = () => {
  const [hoveredPoem, setHoveredPoem] = useState<string | null>(null);
  const [activeNarration, setActiveNarration] = useState<string | null>(null);

  const poemDetails: { [key: string]: string } = {
    "Black Lips Poet": "A collection of raw, unfiltered verses from the streets of Benin.",
    "When Silence Speaks": "Exploring the unspoken truths and hidden narratives of a generation.",
    "The Voice That Coded": "The journey from spoken word to the structured language of programming.",
  };

  const poemNarrations: { [key: string]: string } = {
    "Black Lips Poet": "In the bustling streets of Benin, a young poet found his voice, weaving tales of struggle and hope.",
    "When Silence Speaks": "Through the quiet moments, profound truths emerged, shaping a unique perspective on life.",
    "The Voice That Coded": "The rhythm of poetry transformed into the logic of code, building new worlds with every line.",
  };

  const handlePoemClick = (poemTitle: string) => {
    if (activeNarration === poemTitle) {
      setActiveNarration(null); // Stop narration if already playing
    } else {
      setActiveNarration(poemTitle);
      // Automatically stop after 10 seconds (or when Narrator finishes)
      setTimeout(() => {
        setActiveNarration(null);
      }, 10000);
    }
  };

  return (
    <motion.section
      id="past"
      className="section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1530541930197-ff16ac917795?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center"></div>
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">The Poet’s Origin</h2>
        <p className="text-white/80 max-w-3xl mx-auto mb-8">My journey began as LukeWeaLTh, a street poet in the vibrant heart of Benin. Words were my earliest code, my survival, and my first expression of a bold vision. Here, the rhythm of verses shaped my understanding of the world.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {Object.keys(poemDetails).map((poemTitle) => (
            <div
              key={poemTitle}
              className="relative"
              onMouseEnter={() => setHoveredPoem(poemTitle)}
              onMouseLeave={() => setHoveredPoem(null)}
            >
              <button
                className="btn glass p-5 rounded-xl w-full"
                onClick={() => handlePoemClick(poemTitle)}
              >
                {poemTitle}
              </button>
              {hoveredPoem === poemTitle && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 bg-blue-900/80 text-white text-sm rounded-lg shadow-lg holographic-text">
                  {poemDetails[poemTitle]}
                </div>
              )}
            </div>
          ))}
        </div>
        {activeNarration && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
            <Narrator text={poemNarrations[activeNarration]} />
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Past;