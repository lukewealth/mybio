import React from 'react';
import { motion } from 'framer-motion';

const workflow = [
  ['Understand', 'Translate an ambiguous business or engineering problem into clear system requirements.'],
  ['Design', 'Choose practical architecture, data flows, APIs, models and infrastructure.'],
  ['Build', 'Use AI-assisted engineering to move quickly without outsourcing technical judgment.'],
  ['Debug', 'Trace failures, identify root causes and turn fixes into tests and durable improvements.'],
  ['Operate', 'Think about observability, security, cost, reliability and maintainability from the start.']
];

const Becoming: React.FC = () => (
  <motion.section id="approach" className="section" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}}>
    <div className="max-w-6xl mx-auto px-6 py-24 w-full">
      <p className="text-emerald font-semibold mb-3">ENGINEERING APPROACH</p>
      <h2 className="text-3xl md:text-5xl font-bold mb-4">From problem to production</h2>
      <p className="text-white/65 max-w-3xl mb-10">I treat AI systems as software systems: they need architecture, tests, failure handling, security and observability.</p>
      <div className="grid md:grid-cols-5 gap-4">
        {workflow.map(([title, description], index) => (
          <div key={title} className="glass rounded-2xl p-5">
            <span className="text-emerald text-sm font-semibold">0{index + 1}</span>
            <h3 className="font-semibold mt-3">{title}</h3>
            <p className="text-white/55 text-sm leading-6 mt-2">{description}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.section>
);

export default Becoming;
