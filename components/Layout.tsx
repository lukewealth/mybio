import Image from 'next/image';
import React, { ReactNode, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
const SoundCloudMiniPlayer = dynamic(() => import('./SoundCloudMiniPlayer'), { ssr: false });
const AIChatbot = dynamic(() => import('./AIChatbot'), { ssr: false });
import AIAvatarButton from './AIAvatarButton';

const Starfield = dynamic(() => import('./Starfield'), { ssr: false });

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('landing');

  return (
    <>
      <Starfield />
      
      <SoundCloudMiniPlayer />
      <AIAvatarButton />
      <AIChatbot />

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/tricodelogo.jpeg" alt="logo" width={32} height={32} className="rounded ring-aura" />
            <span className="font-semibold tracking-wide text-sapphire">LUKE OKAGHA</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm text-white/90">
            <a href="#landing" className={activeSection === 'landing' ? 'active' : ''}>Home</a>
            <a href="#past" className={activeSection === 'past' ? 'active' : ''}>Past</a>
            <a href="#present" className={activeSection === 'present' ? 'active' : ''}>Present</a>
            <a href="#becoming" className={activeSection === 'becoming' ? 'active' : ''}>Becoming</a>
            <a href="#future" className={activeSection === 'future' ? 'active' : ''}>Future</a>
            <a href="#connect" className={activeSection === 'connect' ? 'active' : ''}>Connect</a>
          </nav>
        </div>
      </header>

      {/* Main content */}
      {children}

      {/* Footer */}
      <footer className="py-8 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} Luke Okagha — All Rights Reserved
      </footer>
    </>
  );
};

export default Layout;
