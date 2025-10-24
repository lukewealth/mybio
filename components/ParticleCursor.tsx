import React, { useCallback } from 'react';
import Particles from '@tsparticles/react';
// import { loadSlim } from '@tsparticles/slim'; // Not needed if init is removed

const ParticleCursor: React.FC = () => {
  // const particlesInit = useCallback(async (engine: any) => {
  //   console.log(engine);
  //   await loadSlim(engine);
  // }, []);

  // const particlesLoaded = useCallback(async (container: any) => {
  //   await console.log(container);
  // }, []);

  return (
    <Particles
      id="tsparticles"
      // init={particlesInit} // Removed
      // loaded={particlesLoaded} // Removed
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1, // Ensure it's behind other content
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            onClick: {
              enable: true,
              mode: 'push',
            },
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
            push: {
              quantity: 4,
            },
          },
        },
        particles: {
          color: {
            value: '#0078FF', // Sapphire blue
          },
          links: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 1,
            direction: 'none',
            random: true,
            straight: false,
            outModes: {
              default: 'out',
            },
            attract: {
              enable: true,
            },
          },
          number: {
            value: 80,
            density: {
              enable: true,
            },
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleCursor;