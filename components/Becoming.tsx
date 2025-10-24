import React, { useState } from 'react';

const Becoming: React.FC = () => {
  const [hoveredBox, setHoveredBox] = useState<string | null>(null);
  const [clickedBox, setClickedBox] = useState<string | null>(null);

  const boxContent: { [key: string]: { title: string; description: string; quote: string; emoji: string } } = {
    "Mentorship": {
      title: "Mentorship",
      description: "Empowering the next generation of innovators by sharing knowledge, fostering critical thinking, and guiding aspiring talents to realize their full potential in tech and beyond.",
      quote: "The greatest legacy we can leave is not in code, but in the minds we ignite and the leaders we cultivate.",
      emoji: "🌱"
    },
    "Leadership": {
      title: "Leadership",
      description: "Inspiring and guiding diverse teams with empathy, strategic vision, and a commitment to collaborative growth, transforming challenges into opportunities for collective success.",
      quote: "True leadership is not about being in charge, but about taking care of those in your charge and empowering them to lead.",
      emoji: "🧭"
    },
    "Integrity": {
      title: "Integrity",
      description: "Upholding unwavering ethical standards in every project and interaction, building trust and fostering a culture where transparency and accountability are paramount.",
      quote: "Integrity is the foundation upon which all sustainable innovation and meaningful connections are built.",
      emoji: "🛡️"
    },
    "Innovation": {
      title: "Innovation",
      description: "Translating poetic insights into groundbreaking technological solutions, constantly pushing boundaries to create products that are not only functional but also deeply impactful and human-centric.",
      quote: "Innovation is the art of seeing what everyone else sees, but thinking what no one else has thought, then building it with purpose.",
      emoji: "✨"
    },
  };

  const handleBoxClick = (boxTitle: string) => {
    setClickedBox(clickedBox === boxTitle ? null : boxTitle);
  };

  return (
    <section id="becoming" className="section">
      <div className="relative max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">The Builder of People</h2>
        <p className="text-white/80 text-center max-w-3xl mx-auto mb-8">Real innovation isn’t just code—it’s connection. Every student I mentor, every mind I inspire, is a line of legacy.</p>
        <div className="grid md:grid-cols-4 gap-4">
          {Object.keys(boxContent).map((boxTitle) => (
            <div
              key={boxTitle}
              className="glass rounded-xl p-6 relative cursor-pointer"
              onMouseEnter={() => setHoveredBox(boxTitle)}
              onMouseLeave={() => setHoveredBox(null)}
              onClick={() => handleBoxClick(boxTitle)}
            >
              <span className="text-2xl">{boxContent[boxTitle].emoji}</span>
              <h3 className="font-semibold mt-2">{boxContent[boxTitle].title}</h3>
              <p className="text-white/70 text-sm">{boxContent[boxTitle].description}</p>

              {hoveredBox === boxTitle && (
                <div className="absolute top-0 left-0 w-full h-full bg-blue-900/80 flex items-center justify-center rounded-xl text-white text-sm p-2 transition-opacity duration-300 opacity-100">
                  {boxContent[boxTitle].title}
                </div>
              )}

              {clickedBox === boxTitle && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setClickedBox(null)}>
                  <div className="bg-gray-900 p-8 rounded-lg max-w-md text-center relative" onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setClickedBox(null)} className="absolute top-2 right-2 text-gray-400 hover:text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <p className="text-lg italic">"{boxContent[boxTitle].quote}"</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Becoming;