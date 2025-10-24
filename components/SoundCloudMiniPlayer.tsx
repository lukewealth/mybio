'use client';
import React, { useRef, useEffect, useState } from 'react';
import { useSoundCloudPlayer } from '../context/SoundCloudPlayerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

export default function SoundCloudMiniPlayer() {
  const { currentTrack, isPlaying, togglePlayPause, playNextTrack, playPreviousTrack, tracks } = useSoundCloudPlayer();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null); // Store the widget instance
  const [isSoundCloudApiLoaded, setIsSoundCloudApiLoaded] = useState(false);
  const [trackLoaded, setTrackLoaded] = useState(false); // New state for track loading status

  // Load SoundCloud Widget API script
  useEffect(() => {
    if (!(window as any).SC) {
      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      script.onload = () => {
        setIsSoundCloudApiLoaded(true);
      };
      document.body.appendChild(script);
    } else {
      setIsSoundCloudApiLoaded(true);
    }
  }, []);

  // Initialize widget and load track when API is ready and track changes
  useEffect(() => {
    if (!isSoundCloudApiLoaded || !iframeRef.current) {
      return;
    }

    let widget: any;
    if (!widgetRef.current) {
      widget = (window as any).SC.Widget(iframeRef.current);
      widgetRef.current = widget;
    } else {
      widget = widgetRef.current;
    }

    const handleReady = () => {
      console.log("SoundCloud Widget Ready");
      if (currentTrack) {
        widget.load(currentTrack.url, { auto_play: false }); // Load without auto-playing
      }
    };

    const handlePlay = () => {
      console.log("SoundCloud Playing");
    };

    const handlePause = () => {
      console.log("SoundCloud Paused");
    };

    const handleLoadProgress = (e: any) => {
      if (e.loadedProgress === 1) {
        setTrackLoaded(true);
      }
    };

    // Bind events
    widget.bind((window as any).SC.Widget.Events.READY, handleReady);
    widget.bind((window as any).SC.Widget.Events.PLAY, handlePlay);
    widget.bind((window as any).SC.Widget.Events.PAUSE, handlePause);
    widget.bind((window as any).SC.Widget.Events.FINISH, playNextTrack);
    widget.bind((window as any).SC.Widget.Events.PLAY_PROGRESS, handleLoadProgress);

    // Cleanup function
    return () => {
      console.log("SoundCloud Widget Cleanup: Skipping unbind due to persistent errors.");
      // Removed unbind calls due to persistent TypeError. Relying on browser garbage collection.
    };
  }, [isSoundCloudApiLoaded, playNextTrack]); // Dependencies changed

  // Effect to load track when currentTrack changes
  useEffect(() => {
    if (widgetRef.current && isSoundCloudApiLoaded && currentTrack) {
      const widget = widgetRef.current;
      setTrackLoaded(false); // Reset loaded state for new track
      widget.load(currentTrack.url, { auto_play: false });
    }
  }, [currentTrack, isSoundCloudApiLoaded]);

  // Control play/pause based on isPlaying state with a delay
  useEffect(() => {
    if (widgetRef.current && isSoundCloudApiLoaded && currentTrack) {
      const widget = widgetRef.current;
      if (isPlaying) {
        // Add a small delay before playing to ensure track is loaded
        const playDelay = setTimeout(() => {
          if (trackLoaded) { // Only play if track is loaded
            widget.play();
          }
        }, 500); // 500ms delay
        return () => clearTimeout(playDelay);
      } else {
        widget.pause();
      }
    }
  }, [isPlaying, isSoundCloudApiLoaded, currentTrack, trackLoaded]);

  // Clear widgetRef.current on component unmount
  useEffect(() => {
    return () => {
      console.log("SoundCloud Widget Component Unmount");
      if (widgetRef.current) {
        widgetRef.current = null;
      }
    };
  }, []);

  if (!currentTrack) {
    return null; // Or a placeholder
  }

  const playButtonColor = trackLoaded ? 'text-red-500' : 'text-gray-500';

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
        src=""
        style={{ display: 'none' }} // Hide the iframe, control via API
      ></iframe>
    </div>
  );
}