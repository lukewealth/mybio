import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSoundCloudPlayer } from '../context/SoundCloudPlayerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
  const [input, setInput] = useState('');
  const { isPlaying, togglePlayPause, playNextTrack, playPreviousTrack, currentTrack, tracks, isChatbotOpen, toggleChatbot } = useSoundCloudPlayer();

  useEffect(() => {
    // Add initial AI message when component mounts
    setMessages([{ text: "Welcome to Luke's immersive biography experience. How can I help you?", sender: 'ai' }]);
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: 'user' }]);
      setInput('');

      // Simulate AI response
      setTimeout(() => {
        let aiResponse = `Hello! You said: "${userMessage}". I am an AI chatbot.`;

        if (userMessage.toLowerCase().includes('play music') || userMessage.toLowerCase().includes('play soundcloud')) {
          if (tracks.length > 0) {
            aiResponse = `Playing ${currentTrack?.title || 'the first track'}.`;
            togglePlayPause();
          } else {
            aiResponse = "I don't have any SoundCloud tracks loaded right now.";
          }
        } else if (userMessage.toLowerCase().includes('next track')) {
          playNextTrack();
          aiResponse = `Playing next track: ${currentTrack?.title}.`;
        } else if (userMessage.toLowerCase().includes('previous track')) {
          playPreviousTrack();
          aiResponse = `Playing previous track: ${currentTrack?.title}.`;
        } else if (userMessage.toLowerCase().includes('pause music') || userMessage.toLowerCase().includes('stop music')) {
          if (isPlaying) {
            togglePlayPause();
            aiResponse = "Music paused.";
          } else {
            aiResponse = "Music is not currently playing.";
          }
        }

        setMessages((prevMessages) => [
          ...prevMessages,
          { text: aiResponse, sender: 'ai' },
        ]);
      }, 1000);
    }
  };

  if (!isChatbotOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-4 w-full max-w-sm h-3/4 md:w-80 md:h-96 bg-gray-900 text-white rounded-lg shadow-lg flex flex-col z-50">
      <div className="flex justify-between items-center p-3 border-b border-gray-700">
        <h3 className="text-lg font-semibold">AI Chatbot</h3>
        <button onClick={toggleChatbot} className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto">
        {currentTrack?.artwork_url && (
          <div className="flex justify-center mb-4">
            <Image src={currentTrack.artwork_url} alt="Track Artwork" width={128} height={128} className="rounded-md" />
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-700 flex flex-col">
        <div className="flex justify-around mb-2">
          <button onClick={playPreviousTrack} className="text-white text-lg p-2 rounded-full hover:bg-gray-700">
            <FontAwesomeIcon icon={faStepBackward} />
          </button>
          <button onClick={togglePlayPause} className="text-white text-lg p-2 rounded-full hover:bg-gray-700">
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button onClick={playNextTrack} className="text-white text-lg p-2 rounded-full hover:bg-gray-700">
            <FontAwesomeIcon icon={faStepForward} />
          </button>
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-1 bg-gray-800 text-white border border-gray-700 rounded-l-lg p-2 focus:outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;