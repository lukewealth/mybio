'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useSoundCloudPlayer } from '../context/SoundCloudPlayerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

export default function SoundCloudMiniPlayer() {
  console.log('SoundCloudMiniPlayer: Component Render');
  const { currentTrack, isPlaying, togglePlayPause, playNextTrack, playPreviousTrack, tracks } = useSoundCloudPlayer();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null); // Store the widget instance
  const [isSoundCloudApiLoaded, setIsSoundCloudApiLoaded] = useState(false);
  const [trackLoaded, setTrackLoaded] = useState(false); // New state for track loading status

  // Load SoundCloud Widget API script
  useEffect(() => {
    console.log('SoundCloudMiniPlayer: useEffect - Load API Script');
    if (!(window as any).SC) {
      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      script.onload = () => {
        console.log('SoundCloudMiniPlayer: SoundCloud API Script Loaded');
        setIsSoundCloudApiLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      console.log('SoundCloudMiniPlayer: SoundCloud API Script Already Loaded');
      setIsSoundCloudApiLoaded(true);
    }
    return () => {
      console.log('SoundCloudMiniPlayer: useEffect Cleanup - Load API Script');
    };
  }, []);

  // Initialize widget and load track when API is ready and track changes
  useEffect(() => {
    console.log('SoundCloudMiniPlayer: useEffect - Init Widget & Load Track');
    if (!isSoundCloudApiLoaded) {
      console.log('SoundCloudMiniPlayer: Init Widget - API not loaded');
      return;
    }

    if (!iframeRef.current) {
      console.log('SoundCloudMiniPlayer: Init Widget - iframe not ready');
      return;
    }

    let widget: any;
    if (!widgetRef.current) {
      console.log('SoundCloudMiniPlayer: Init Widget - Creating new widget instance');
      widget = (window as any).SC.Widget(iframeRef.current);
      widgetRef.current = widget;
    } else {
      console.log('SoundCloudMiniPlayer: Init Widget - Using existing widget instance');
      widget = widgetRef.current;
    }

    const handleReady = () => {
      console.log("SoundCloudMiniPlayer: SoundCloud Widget Ready");
      if (currentTrack) {
        console.log(`SoundCloudMiniPlayer: Widget Ready - Loading track: ${currentTrack.url}`);
        widget.load(currentTrack.url, { auto_play: false }); // Load without auto-playing
      }
    };

    const handlePlay = () => {
      console.log("SoundCloudMiniPlayer: SoundCloud Playing");
    };

    const handlePause = () => {
      console.log("SoundCloudMiniPlayer: SoundCloud Paused");
    };

    const handleLoadProgress = (e: any) => {
      // console.log(`SoundCloudMiniPlayer: Load Progress - ${e.loadedProgress}`);
      if (e.loadedProgress === 1) {
        console.log('SoundCloudMiniPlayer: Track Fully Loaded');
        setTrackLoaded(true);
      }
    };

    // Bind events
    console.log('SoundCloudMiniPlayer: Binding Widget Events');
    widget.bind((window as any).SC.Widget.Events.READY, handleReady);
    widget.bind((window as any).SC.Widget.Events.PLAY, handlePlay);
    widget.bind((window as any).SC.Widget.Events.PAUSE, handlePause);
    widget.bind((window as any).SC.Widget.Events.FINISH, playNextTrack);
    widget.bind((window as any).SC.Widget.Events.PLAY_PROGRESS, handleLoadProgress);

    // Cleanup function: Clear ref
    return () => {
      console.log('SoundCloudMiniPlayer: useEffect Cleanup - Init Widget & Load Track');
      if (widgetRef.current) {
        console.log('SoundCloudMiniPlayer: Clearing widgetRef.current');
        widgetRef.current = null; // Clear the ref
      }
    };
  }, [isSoundCloudApiLoaded, playNextTrack]); // Dependencies changed

  // Effect to load track when currentTrack changes
  useEffect(() => {
    console.log('SoundCloudMiniPlayer: useEffect - currentTrack changed');
    if (widgetRef.current && isSoundCloudApiLoaded && currentTrack) {
      const widget = widgetRef.current;
      console.log(`SoundCloudMiniPlayer: currentTrack changed - Loading track: ${currentTrack.url}`);
      setTrackLoaded(false); // Reset loaded state for new track
      widget.load(currentTrack.url, { auto_play: false });
    }
    return () => {
      console.log('SoundCloudMiniPlayer: useEffect Cleanup - currentTrack changed');
    };
  }, [currentTrack, isSoundCloudApiLoaded]);

  // Control play/pause based on isPlaying state with a delay
  useEffect(() => {
    console.log('SoundCloudMiniPlayer: useEffect - isPlaying/trackLoaded changed');
    if (widgetRef.current && isSoundCloudApiLoaded && currentTrack) {
      const widget = widgetRef.current;
      if (isPlaying) {
        console.log('SoundCloudMiniPlayer: isPlaying is true - attempting to play');
        // Add a small delay before playing to ensure track is loaded
        const playDelay = setTimeout(() => {
          if (trackLoaded) { // Only play if track is loaded
            console.log('SoundCloudMiniPlayer: Playing widget');
            widget.play();
          } else {
            console.log('SoundCloudMiniPlayer: Track not loaded yet, delaying play');
          }
        }, 500); // 500ms delay
        return () => {
          console.log('SoundCloudMiniPlayer: Clearing playDelay timeout');
          clearTimeout(playDelay);
        };
      } else {
        console.log('SoundCloudMiniPlayer: isPlaying is false - pausing widget');
        widget.pause();
      }
    }
    return () => {
      console.log('SoundCloudMiniPlayer: useEffect Cleanup - isPlaying/trackLoaded changed');
    };
  }, [isPlaying, isSoundCloudApiLoaded, currentTrack, trackLoaded]);

  

  if (!currentTrack) {
    console.log('SoundCloudMiniPlayer: No currentTrack, returning null');
    return null; // Or a placeholder
  }

  const playButtonColor = trackLoaded ? 'text-red-500' : 'text-gray-500';
  console.log('SoundCloudMiniPlayer: Rendering JSX');

  return (
    <div className="fixed bottom-2 right-24 bg-black/60 rounded-lg p-2 shadow-lg backdrop-blur-md flex items-center space-x-2">
      {currentTrack.artwork_url && (
        <img src={currentTrack.artwork_url} alt="Track Artwork" className="w-10 h-10 rounded-md" />
      )}
      <button onClick={playPreviousTrack} className="text-white text-lg">
        <FontAwesomeIcon icon={faStepBackward} />
      </button>
      <button onClick={togglePlayPause} className={`text-lg ${playButtonColor}`}>
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
      </button>
      <button onClick={playNextTrack} className="text-white text-lg">
        <FontAwesomeIcon icon={faStepForward} />
      </button>
      <div className="text-white text-sm flex-grow">
        <p className="truncate">{currentTrack.title}</p>
      </div>
      <iframe
        ref={iframeRef}
        width="0"
        height="0"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/293" // Default placeholder track
        style={{ display: 'none' }} // Hide the iframe, control via API
      ></iframe>
    </div>
  );
}