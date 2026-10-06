import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faXTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

const Connect: React.FC = () => (
  <motion.section id="connect" className="section" initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.2}}>
    <div className="max-w-5xl mx-auto px-6 py-24 text-center">
      <p className="text-emerald font-semibold mb-3">LET'S CONNECT</p>
      <h2 className="text-3xl md:text-5xl font-bold mb-5">Building an AI system?</h2>
      <p className="text-white/65 max-w-2xl mx-auto mb-8">For engineering roles, technical collaboration or AI automation work, start with my GitHub or LinkedIn.</p>
      <div className="flex justify-center flex-wrap gap-3">
        <a className="btn bg-emerald text-black px-6 py-3 rounded-full font-semibold" href="https://github.com/lukewealth" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} className="mr-2" /> GitHub</a>
        <a className="btn border border-white/20 px-6 py-3 rounded-full" href="https://linkedin.com/in/lukeokagha" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedinIn} className="mr-2" /> LinkedIn</a>
        <a className="btn border border-white/20 px-6 py-3 rounded-full" href="mailto:contact@tricode.pro">Email</a>
      </div>
      <div className="flex justify-center gap-5 mt-7 text-white/50">
        <a href="https://x.com/lukewealth" target="_blank" rel="noreferrer" aria-label="X"><FontAwesomeIcon icon={faXTwitter} /></a>
        <a href="https://github.com/lukewealth" target="_blank" rel="noreferrer" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a>
      </div>
    </div>
  </motion.section>
);

export default Connect;
