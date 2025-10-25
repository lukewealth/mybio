'use client';
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { Howl } from 'howler';
import { useSoundCloudPlayer } from '../context/SoundCloudPlayerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward, faCommentDots } from '@fortawesome/free-solid-svg-icons';

export default function SoundCloudMiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    playNextTrack,
    playPreviousTrack,
    toggleChatbot,
    setDuration,
    setCurrentTime,
    setTrackLoadingStatus,
    trackLoadingStatus,
    tracks,
  } = useSoundCloudPlayer();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);
  const localAudioRef = useRef<Howl | null>(null);
  const [isSoundCloudApiLoaded, setIsSoundCloudApiLoaded] = useState(false);
  const [trackLoaded, setTrackLoaded] = useState(false);
  const allSoundCloudWidgetsRef = useRef<Map<string, any>>(new Map());
  const allLocalHowlsRef = useRef<Map<string, Howl>>(new Map());

  // Load SoundCloud API script once
  useEffect(() => {
    if (!(window as any).SC) {
      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      script.onload = () => setIsSoundCloudApiLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsSoundCloudApiLoaded(true);
    }
  }, []);

  // Pre-load all tracks
  useEffect(() => {
    if (!isSoundCloudApiLoaded || tracks.length === 0) {
      return;
    }

    tracks.forEach((track) => {
      if (track.type === 'local') {
        if (!allLocalHowlsRef.current.has(track.id)) {
          const localSound = new Howl({
            src: [track.url],
            html5: true,
            volume: 0.5,
            onload: () => {
              setTrackLoadingStatus((prev) => ({ ...prev, [track.id]: true }));
            },
            onloaderror: (id, error) => {
              console.error(`Error loading local track ${track.id}:`, error);
              setTrackLoadingStatus((prev) => ({ ...prev, [track.id]: false }));
            },
          });
          allLocalHowlsRef.current.set(track.id, localSound);
        }
      } else if (track.type === 'soundcloud') {
        if (!allSoundCloudWidgetsRef.current.has(track.id)) {
          // Create a hidden iframe for each SoundCloud track
          const iframe = document.createElement('iframe');
          iframe.width = '0';
          iframe.height = '0';
          iframe.scrolling = 'no';
          iframe.frameBorder = 'no';
          iframe.allow = 'autoplay';
          iframe.src = `https://w.soundcloud.com/player/?url=${track.url}`;
          iframe.style.display = 'none';
          document.body.appendChild(iframe);

          const widget = (window as any).SC.Widget(iframe);
          allSoundCloudWidgetsRef.current.set(track.id, widget);

          widget.bind((window as any).SC.Widget.Events.READY, () => {
            setTrackLoadingStatus((prev) => ({ ...prev, [track.id]: true }));
          });
          widget.bind((window as any).SC.Widget.Events.ERROR, (error: any) => {
            console.error(`Error loading SoundCloud track ${track.id}:`, error);
            setTrackLoadingStatus((prev) => ({ ...prev, [track.id]: false }));
          });
        }
      }
    });

    return () => {
      // Cleanup for local Howls
      allLocalHowlsRef.current.forEach((howl) => howl.unload());
      allLocalHowlsRef.current.clear();

      // Cleanup for SoundCloud widgets (if necessary, though they are hidden)
      allSoundCloudWidgetsRef.current.forEach((widget) => {
        widget.unbind((window as any).SC.Widget.Events.READY);
        // You might want to destroy the iframe here too if it causes issues
      });
      allSoundCloudWidgetsRef.current.clear();
    };
  }, [isSoundCloudApiLoaded, tracks, setTrackLoadingStatus, playNextTrack]);

  useEffect(() => {
    if (!currentTrack) {
      return;
    }

    // Existing logic for currentTrack, now using pre-loaded instances
    if (currentTrack.type === 'local') {
      const localSound = allLocalHowlsRef.current.get(currentTrack.id);
      if (localSound) {
        localSound.on('end', playNextTrack);
        if (isPlaying) {
          try {
            localSound.play();
            const interval = setInterval(() => {
              setCurrentTime(localSound.seek() as number);
            }, 1000);
            return () => {
              clearInterval(interval);
              localSound.off('end', playNextTrack);
            };
          } catch (error) {
            console.error(`Error playing local track ${currentTrack.id}:`, error);
            // Optionally, set isPlaying to false or show an error message
          }
        } else {
          localSound.pause();
        }
      }
    } else if (currentTrack.type === 'soundcloud' && isSoundCloudApiLoaded) {
      const widget = allSoundCloudWidgetsRef.current.get(currentTrack.id);
      if (widget) {
        // Explicitly load the track into the widget when it becomes the current track
        widget.load(currentTrack.url, { auto_play: false });
        widget.getDuration((d: number) => setDuration(d / 1000));
        widget.bind((window as any).SC.Widget.Events.PLAY_PROGRESS, (e: any) => {
          setCurrentTime(e.currentPosition / 1000);
        });
        widget.bind((window as any).SC.Widget.Events.PLAY, () => {
          // Only update if the state is not already playing to avoid unnecessary re-renders
          if (!isPlaying) {
            togglePlayPause(); // This will set isPlaying to true
          }
        });
        widget.bind((window as any).SC.Widget.Events.PAUSE, () => {
          // Only update if the state is not already paused
          if (isPlaying) {
            togglePlayPause(); // This will set isPlaying to false
          }
        });
        if (isPlaying) {
          widget.play();
        } else {
          widget.pause();
        }
      }
    }
  }, [isPlaying, currentTrack, isSoundCloudApiLoaded, setDuration, setCurrentTime]);

  if (!currentTrack) {
    return null;
  }

  const artworkSrc = currentTrack?.artwork_url || '/artworks.jpg';

  const isCurrentTrackLoaded = trackLoadingStatus[currentTrack.id];

  return (
    <div className="fixed bottom-2 right-4 md:right-24 bg-black/60 rounded-lg p-2 shadow-lg backdrop-blur-md flex items-center space-x-2 z-51">
      <Image src={artworkSrc} alt="Track Artwork" width={40} height={40} className="rounded-md" />
      <button onClick={(e) => { e.stopPropagation(); playPreviousTrack(); }} className="text-white text-lg">
        <FontAwesomeIcon icon={faStepBackward} style={{ color: 'white', fontSize: '24px' }} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
        className={`text-lg ${isCurrentTrackLoaded ? 'text-green-500' : 'text-red-500'}`}
        disabled={!isCurrentTrackLoaded}
      >
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} style={{ color: 'white', fontSize: '24px' }} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); playNextTrack(); }} className="text-white text-lg">
        <FontAwesomeIcon icon={faStepForward} style={{ color: 'white', fontSize: '24px' }} />
      </button>
      <div className="text-white text-sm flex-grow">
        <p className="truncate">{currentTrack.title}</p>
      </div>
      <button onClick={toggleChatbot} className="text-white text-lg p-1 rounded-full hover:bg-gray-700">
        <FontAwesomeIcon icon={faCommentDots} />
      </button>

      {/* The iframe for the current track is no longer needed here as all tracks are pre-loaded */}
      {/* <iframe
        ref={iframeRef}
        width="0"
        height="0"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=${currentTrack.url}`}
        style={{ display: 'none' }}
      ></iframe> */}
    </div>
  );
}
