import React from 'react';
import { motion } from 'framer-motion';

const capabilities = [
  ['AI systems', 'LLMs, agents, RAG, tool calling, MCP and workflow orchestration'],
  ['Backend engineering', 'Python, TypeScript, Node.js, APIs, databases and integrations'],
  ['Architecture', 'System design, reliability, modular services and production trade-offs'],
  ['Cloud & infrastructure', 'Docker, Kubernetes, CI/CD, AWS/GCP and scalable deployment patterns'],
  ['Debugging', 'Root-cause analysis across application, data, AI and infrastructure layers'],
  ['AI-native engineering', 'Using AI as an engineering multiplier while owning validation and quality']
];

const Present: React.FC = () => (
  <motion.section id="present" className="section bg-grad" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}}>
    <div className="max-w-6xl mx-auto px-6 py-24 w-full">
      <p className="text-emerald font-semibold mb-3">WHAT I DO</p>
      <h2 className="text-3xl md:text-5xl font-bold mb-4">Engineering for reliable AI systems</h2>
      <p className="text-white/65 max-w-3xl mb-10">My advantage is not just using AI. It is combining AI with software architecture, backend engineering, debugging and product reasoning.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {capabilities.map(([title, description]) => (
          <div key={title} className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-white/60 text-sm leading-6 mt-2">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default Present;
