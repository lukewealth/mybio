import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  { name: 'ColdRunners', type: 'Agentic AI systems', description: 'Multi-agent workflow architecture connecting planners, specialist agents, tools and MCP services to real execution flows.', stack: 'TypeScript · Node.js · React · MCP · LLMs' },
  { name: 'EasyReach', type: 'AI business automation', description: 'AI-powered customer outreach and CRM automation combining messaging, voice, integrations and analytics.', stack: 'Next.js · Node.js · MongoDB · AI APIs' },
  { name: 'MintJara', type: 'Platform engineering', description: 'Creator platform work spanning product architecture, payments, digital ownership and scalable application services.', stack: 'React · TypeScript · Express · SQLite · Sui' },
  { name: 'Cherokee Bank', type: 'Backend & fintech', description: 'Software engineering work focused on business workflows, APIs and financial application architecture.', stack: 'Backend · APIs · Databases · Product engineering' }
];

const Past: React.FC = () => (
  <motion.section id="projects" className="section" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}}>
    <div className="max-w-6xl mx-auto px-6 py-24 w-full">
      <p className="text-emerald font-semibold mb-3">PROOF OF WORK</p>
      <h2 className="text-3xl md:text-5xl font-bold mb-4">Systems I have built</h2>
      <p className="text-white/65 max-w-3xl mb-10">I focus on the engineering layer between AI capability and reliable product execution.</p>
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map(project => (
          <article key={project.name} className="glass rounded-2xl p-6">
            <p className="text-emerald text-sm font-semibold">{project.type}</p>
            <h3 className="text-2xl font-semibold mt-2">{project.name}</h3>
            <p className="text-white/70 mt-3 leading-7">{project.description}</p>
            <p className="text-white/45 text-sm mt-5">{project.stack}</p>
          </article>
        ))}
      </div>
      <p className="text-white/45 text-xs mt-6">Project descriptions distinguish implemented work from planned architecture; detailed repositories are available on GitHub.</p>
    </div>
  </motion.section>
);

export default Past;
