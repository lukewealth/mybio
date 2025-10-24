import React, { useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';

interface ScrollTriggerProviderProps {
  children: ReactNode;
}

const ScrollTriggerProvider: React.FC<ScrollTriggerProviderProps> = ({ children }) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Section reveals (from luke-immersive.html)
    gsap.utils.toArray('.section').forEach((sec) => {
      const sectionElement = sec as HTMLElement;
      gsap.fromTo(
        sectionElement.querySelectorAll('h1,h2,p,pre,.glass,span,button,.orb'),
        { opacity: 0, y: 30 }, // From state
        {
          opacity: 1, y: 0, stagger: 0.06, duration: 0.8, // To state
          scrollTrigger: { trigger: sectionElement, start: "top 75%" }
        }
      );
    });

    // Nav active state (from luke-immersive.html)
    const navLinks = Array.from(document.querySelectorAll('nav a'));
    function setActive(id: string){
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+id));
    }
    const ids = ["landing","past","present","becoming","future","connect"];
    ids.forEach(id => {
      ScrollTrigger.create({
        trigger: '#'+id,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActive(id),
        onEnterBack: () => setActive(id)
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
};

export default ScrollTriggerProvider;