import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { initialTracks } from './tracks';

export interface Track {
  id: string;
  title: string;
  url: string;
  artwork_url?: string; // Optional artwork URL
  type: 'soundcloud' | 'local'; // Add type property
}

interface SoundCloudPlayerContextType {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  playTrack: (index: number) => void;
  togglePlayPause: () => void;
  playNextTrack: () => void;
  playPreviousTrack: () => void;
  currentTrack: Track | null;
  setTracks: React.Dispatch<React.SetStateAction<Track[]>>; // Allow setting tracks dynamically
  isChatbotOpen: boolean;
  toggleChatbot: () => void;
}

const SoundCloudPlayerContext = createContext<SoundCloudPlayerContextType | undefined>(undefined);

export const SoundCloudPlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tracks, setTracks] = useState<Track[]>(initialTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);

  const currentTrack = tracks[currentTrackIndex] || null;

  const playTrack = useCallback((index: number) => {
    if (index >= 0 && index < tracks.length) {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  }, [tracks]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const toggleChatbot = useCallback(() => {
    setIsChatbotOpen((prev) => !prev);
  }, []);

  const playNextTrack = useCallback(() => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(true);
  }, [tracks]);

  const playPreviousTrack = useCallback(() => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  }, [tracks]);

  return (
    <SoundCloudPlayerContext.Provider
      value={{
        tracks,
        currentTrackIndex,
        isPlaying,
        playTrack,
        togglePlayPause,
        playNextTrack,
        playPreviousTrack,
        currentTrack,
        setTracks,
        isChatbotOpen,
        toggleChatbot,
      }}
    >
      {children}
    </SoundCloudPlayerContext.Provider>
  );
};

export const useSoundCloudPlayer = () => {
  const context = useContext(SoundCloudPlayerContext);
  if (context === undefined) {
    throw new Error('useSoundCloudPlayer must be used within a SoundCloudPlayerProvider');
  }
  return context;
};
