import React from 'react';
import { motion } from 'framer-motion';

const roles = ['AI Systems Engineer', 'AI Software Engineer', 'AI Platform Engineer', 'Applied AI Engineer', 'Senior Backend Engineer', 'AI Solutions Engineer'];

const Future: React.FC = () => (
  <motion.section id="direction" className="section bg-grad" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}}>
    <div className="max-w-6xl mx-auto px-6 py-24 w-full">
      <p className="text-emerald font-semibold mb-3">CURRENT DIRECTION</p>
      <h2 className="text-3xl md:text-5xl font-bold mb-4">Building toward AI Systems Engineering</h2>
      <p className="text-white/65 max-w-3xl mb-8">I am focused on global remote engineering opportunities where I can build agentic systems, backend infrastructure and AI-powered products.</p>
      <div className="flex flex-wrap gap-3 mb-10">{roles.map(role => <span key={role} className="glass px-4 py-2 rounded-full text-sm">{role}</span>)}</div>
      <div className="grid md:grid-cols-3 gap-5">
        <div className="glass rounded-2xl p-6"><h3 className="font-semibold">Primary</h3><p className="text-white/60 text-sm mt-2">Agentic AI, backend systems, LLM applications, MCP and automation.</p></div>
        <div className="glass rounded-2xl p-6"><h3 className="font-semibold">Strength</h3><p className="text-white/60 text-sm mt-2">Debugging, technical reasoning, architecture and translating business problems into systems.</p></div>
        <div className="glass rounded-2xl p-6"><h3 className="font-semibold">Goal</h3><p className="text-white/60 text-sm mt-2">Work with globally distributed teams building reliable AI products at meaningful scale.</p></div>
      </div>
    </div>
  </motion.section>
);

export default Future;
