import React from 'react';

interface AIAvatarButtonProps {
  onClick: () => void;
}

const AIAvatarButton: React.FC<AIAvatarButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 w-16 h-16 rounded-full overflow-hidden shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out z-50 border-2 border-sapphire"
      aria-label="AI Avatar Chatbot"
    >
      <img src="/avatar.jpg" alt="AI Avatar" className="w-full h-full object-cover" />
    </button>
  );
};

export default AIAvatarButton;
