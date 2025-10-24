import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface Track {
  id: string;
  title: string;
  url: string;
  artwork_url?: string; // Optional artwork URL
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
}

const SoundCloudPlayerContext = createContext<SoundCloudPlayerContextType | undefined>(undefined);

export const SoundCloudPlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tracks, setTracks] = useState<Track[]>([
    { id: 'rfjw1KMxkOml32jhgo', title: 'Track 1', url: 'https://w.soundcloud.com/player/?url=https%3A//on.soundcloud.com/rfjw1KMxkOml32jhgo', artwork_url: 'https://i1.sndcdn.com/artworks-000118000000-000000-large.jpg' },
    { id: 'kttQ0PKhJKfLQpHUG4', title: 'Track 2', url: 'https://w.soundcloud.com/player/?url=https%3A//on.soundcloud.com/kttQ0PKhJKfLQpHUG4', artwork_url: 'https://i1.sndcdn.com/artworks-000118000000-000000-large.jpg' },
    { id: 'Gsvv7tPyllgxUqkyDZ', title: 'Track 3', url: 'https://w.soundcloud.com/player/?url=https%3A//on.soundcloud.com/Gsvv7tPyllgxUqkyDZ', artwork_url: 'https://i1.sndcdn.com/artworks-000118000000-000000-large.jpg' },
    { id: 'RIuTQYyK5bCc474n0J', title: 'Track 4', url: 'https://w.soundcloud.com/player/?url=https%3A//on.soundcloud.com/RIuTQYyK5bCc474n0J', artwork_url: 'https://i1.sndcdn.com/artworks-000118000000-000000-large.jpg' },
    { id: 'E2TjleH1dgJGYMj4ZI', title: 'Track 5', url: 'https://w.soundcloud.com/player/?url=https%3A//on.soundcloud.com/E2TjleH1dgJGYMj4ZI', artwork_url: 'https://i1.sndcdn.com/artworks-000118000000-000000-large.jpg' },
  ]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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
