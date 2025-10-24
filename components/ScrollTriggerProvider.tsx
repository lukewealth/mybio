import React, { ReactNode } from 'react';

interface ScrollTriggerProviderProps {
  children: ReactNode;
}

const ScrollTriggerProvider: React.FC<ScrollTriggerProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default ScrollTriggerProvider;