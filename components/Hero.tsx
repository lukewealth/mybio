import Image from 'next/image';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import LukeokaghaImage from '../public/Lukeokagha.jpg';

const Hero: React.FC = () => (
  <section id="landing" className="section bg-grad">
    <div className="max-w-6xl mx-auto w-full px-6 py-28 grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center">
      <div>
        <p className="text-emerald font-semibold tracking-wide mb-4">AI SYSTEMS ENGINEER · BACKEND · AGENTIC AUTOMATION</p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">I build AI systems that do real work.</h1>
        <p className="text-white/75 text-lg md:text-xl max-w-2xl mb-8">I design backend services, agent workflows and automation systems that connect LLMs to APIs, data and real business processes.</p>
        <div className="flex flex-wrap gap-3">
          <a href="#projects" className="btn bg-emerald text-black px-6 py-3 rounded-full font-semibold">View engineering work <FontAwesomeIcon icon={faArrowRight} className="ml-2" /></a>
          <a href="#connect" className="btn border border-white/20 px-6 py-3 rounded-full">Work with me</a>
          <a href="/LukeO.pdf" download className="btn border border-white/20 px-6 py-3 rounded-full">CV</a>
        </div>
        <div className="flex gap-5 mt-7 text-sm text-white/60">
          <a href="https://github.com/lukewealth" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          <a href="https://linkedin.com/in/lukeokagha" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
        </div>
      </div>
      <div className="justify-self-center">
        <div className="glass rounded-3xl p-4 max-w-sm">
          <Image src={LukeokaghaImage} alt="Luke Okagha, AI Systems Engineer" priority className="rounded-2xl object-cover w-full aspect-square" />
          <div className="pt-4 px-2 pb-2">
            <p className="font-semibold">Luke Okagha</p>
            <p className="text-white/55 text-sm mt-1">Software Architect · AI Systems Engineer · Technical Product Engineer</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
