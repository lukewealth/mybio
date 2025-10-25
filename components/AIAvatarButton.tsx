import React from 'react';
import Image from 'next/image';
import { useSoundCloudPlayer } from '../context/SoundCloudPlayerContext';

const AIAvatarButton: React.FC = () => {
  const { toggleChatbot } = useSoundCloudPlayer();

  return (
    <button
      onClick={toggleChatbot}
      className="fixed bottom-4 right-4 w-16 h-16 rounded-full overflow-hidden shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out z-50 border-2 border-sapphire"
      aria-label="AI Avatar Chatbot"
    >
      <Image src="/avatar.jpg" alt="AI Avatar" fill style={{objectFit: "cover"}} />
    </button>
  );
};

export default AIAvatarButton;
