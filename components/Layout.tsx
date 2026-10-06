import React, { ReactNode } from 'react';

interface LayoutProps { children: ReactNode; }

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#landing" className="font-semibold tracking-wide text-white">LUKE OKAGHA</a>
        <nav className="hidden md:flex gap-7 text-sm text-white/80">
          <a href="#projects">Work</a>
          <a href="#present">Capabilities</a>
          <a href="#approach">Approach</a>
          <a href="#direction">Direction</a>
          <a href="#connect">Contact</a>
        </nav>
      </div>
    </header>
    {children}
    <footer className="py-8 text-center text-white/45 text-sm">© {new Date().getFullYear()} Luke Okagha · AI Systems Engineer · Backend · Agentic Automation</footer>
  </>
);

export default Layout;
