import React, { ReactNode, useEffect, useState } from 'react';
// import ThreeDBackground from './ThreeDBackground'; // Removed ThreeDBackground
import ParticleCursor from './ParticleCursor';
import AudioPlayer from './AudioPlayer';
import SoundCloudMiniPlayer from './SoundCloudMiniPlayer';
import AIChatbot from './AIChatbot';
import AIAvatarButton from './AIAvatarButton';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    document.getElementById('yr')!.textContent = new Date().getFullYear().toString();
  }, []);

  const toggleChatbot = () => {
    setShowChatbot((prev) => !prev);
  };

  return (
    <>
      {/* <ThreeDBackground /> */} {/* Removed ThreeDBackground */}
      <ParticleCursor />
      <AudioPlayer />
      <SoundCloudMiniPlayer />
      <AIAvatarButton onClick={toggleChatbot} />

      {showChatbot && <AIChatbot onClose={toggleChatbot} />}

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/tricodelogo.jpeg" alt="logo" className="w-8 h-8 rounded ring-aura" />
            <span className="font-semibold tracking-wide text-sapphire">LUKE OKAGHA</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm text-white/90">
            <a href="#landing">Home</a>
            <a href="#past">Past</a>
            <a href="#present">Present</a>
            <a href="#becoming">Becoming</a>
            <a href="#future">Future</a>
            <a href="#connect">Connect</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      {children}

      {/* Footer */}
      <footer className="py-8 text-center text-white/60 text-sm">
        © <span id="yr"></span> Luke Okagha — All Rights Reserved
      </footer>
    </>
  );
};

export default Layout;
