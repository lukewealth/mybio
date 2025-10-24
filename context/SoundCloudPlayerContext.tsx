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
    {
      id: '2019-election-black-lips-poem-10',
      title: '2019 Election Black Lips Poem 10',
      url: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/lukewealth/2019-election-black-lips-poem-10',
      artwork_url: 'https://i1.sndcdn.com/artworks-000118000000-000000-large.jpg', // Placeholder
    },
    {
      id: 'suffering-and-smiling-black-lips-poem-11',
      title: 'Suffering and Smiling Black Lips Poem 11',
      url: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/lukewealth/suffering-and-smiling-black-lips-poem-11',
      artwork_url: 'https://i1.sndcdn.com/artworks-000118000000-000000-large.jpg', // Placeholder
    },
    {
      id: 'airplane-mood',
      title: 'Airplane Mood',
      url: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/lukewealth/airplane-mood',
      artwork_url: 'https://i1.sndcdn.com/artworks-000118000000-000000-large.jpg', // Placeholder
    },
    {
      id: 'lukewealth_use_ya_head',
      title: 'Lukewealth Use Ya Head',
      url: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/lukewealth/lukewealth_use_ya_head',
      artwork_url: 'https://i1.sndcdn.com/artworks-000118000000-000000-large.jpg', // Placeholder
    },
    {
      id: 'lukewealth-human-being',
      title: 'Lukewealth Human Being',
      url: 'https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/lukewealth/lukewealth-human-being',
      artwork_url: 'https://i1.sndcdn.com/artworks-000118000000-000000-large.jpg', // Placeholder
    },
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
