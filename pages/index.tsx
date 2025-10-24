import React from 'react';
import Landing from '../components/Landing';
import Past from '../components/Past';
import Present from '../components/Present';
import Becoming from '../components/Becoming';
import Future from '../components/Future';
import Connect from '../components/Connect';

const Home: React.FC = () => {
  return (
    <>
      <Landing />
      <Past />
      <Present />
      <Becoming />
      <Future />
      <Connect />
    </>
  );
};

export default Home;
