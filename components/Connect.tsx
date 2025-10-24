import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faMedium, faInstagram, faXTwitter, faLinkedinIn, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm'; // Import ContactForm

const Connect: React.FC = () => {
  const [socialIconsActive, setSocialIconsActive] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleReplayExperience = () => {
    document.getElementById('landing')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleConnectWithLuke = () => {
    setSocialIconsActive((prev) => !prev);
  };

  const handleJoinTheVision = () => {
    setShowContactForm(true);
  };

  const handleCloseContactForm = () => {
    setShowContactForm(false);
  };

  return (
    <motion.section
      id="connect"
      className="section"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Connect with Luke</h2>
        <p className="text-white/80 mb-8">My journey is ongoing, and I invite you to be a part of it. Connect with me across platforms, share your insights, and let's collaborate to build a future where technology and humanity thrive together.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap mb-8 transition-all duration-500">
          <a className={`orb w-14 h-14 rounded-full grid place-items-center ${socialIconsActive ? 'scale-110' : ''}`} href="https://github.com/lukewealth" target="_blank" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a>
          <a className={`orb w-14 h-14 rounded-full grid place-items-center ${socialIconsActive ? 'scale-110' : ''}`} href="https://medium.com/@lukeokagha" target="_blank" aria-label="Medium"><FontAwesomeIcon icon={faMedium} /></a>
          <a className={`orb w-14 h-14 rounded-full grid place-items-center ${socialIconsActive ? 'scale-110' : ''}`} href="https://instagram.com/lukewealth" target="_blank" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
          <a className={`orb w-14 h-14 rounded-full grid place-items-center ${socialIconsActive ? 'scale-110' : ''}`} href="https://x.com/lukewealth" target="_blank" aria-label="X"><FontAwesomeIcon icon={faXTwitter} /></a>
          <a className={`orb w-14 h-14 rounded-full grid place-items-center ${socialIconsActive ? 'scale-110' : ''}`} href="https://linkedin.com/in/luke-okagha" target="_blank" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedinIn} /></a>
          <a className={`orb w-14 h-14 rounded-full grid place-items-center ${socialIconsActive ? 'scale-110' : ''}`} href="https://facebook.com/luke.okagha" target="_blank" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={handleReplayExperience} className="btn bg-sapphire px-6 py-3 rounded-full">
            Replay Experience
          </button>
          <button onClick={handleConnectWithLuke} className="btn border border-white/20 px-6 py-3 rounded-full">
            Connect with Luke
          </button>
          <button onClick={handleJoinTheVision} className="btn bg-emerald px-6 py-3 rounded-full">
            Join the Vision
          </button>
        </div>
        <p className="text-white/60 text-sm mt-10">“I write code like poetry — from the heart.”</p>
      </div>
      {showContactForm && <ContactForm onClose={handleCloseContactForm} />}
    </motion.section>
  );
};

export default Connect;