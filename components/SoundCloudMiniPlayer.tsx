'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Howl } from 'howler';
import { useSoundCloudPlayer } from '../context/SoundCloudPlayerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';

export default function SoundCloudMiniPlayer() {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    playNextTrack,
    playPreviousTrack,
    toggleChatbot,
  } = useSoundCloudPlayer();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<any>(null);
  const localAudioRef = useRef<Howl | null>(null);
  const [isSoundCloudApiLoaded, setIsSoundCloudApiLoaded] = useState(false);
  const [trackLoaded, setTrackLoaded] = useState(false);

  useEffect(() => {
    if (currentTrack) {
      // Pre-load the first track
      if (currentTrack.type === 'local') {
        setTrackLoaded(true);
      } else if (currentTrack.type === 'soundcloud' && isSoundCloudApiLoaded) {
        // For SoundCloud, the track will be loaded when the widget is ready
      }
    }
  }, []);

  useEffect(() => {
    if (currentTrack?.type !== 'soundcloud') {
      return;
    }
    if (!(window as any).SC) {
      const script = document.createElement('script');
      script.src = 'https://w.soundcloud.com/player/api.js';
      script.async = true;
      script.onload = () => setIsSoundCloudApiLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsSoundCloudApiLoaded(true);
    }
  }, [currentTrack?.type]);

  useEffect(() => {
    if (!currentTrack) {
      return;
    }

    if (currentTrack.type === 'local') {
      if (localAudioRef.current) {
        localAudioRef.current.unload();
      }
      const localSound = new Howl({
        src: [currentTrack.url],
        html5: true,
        volume: 0.5,
        onend: playNextTrack,
      });
      localAudioRef.current = localSound;
      setTrackLoaded(true);
      return;
    }

    if (currentTrack.type === 'soundcloud' && isSoundCloudApiLoaded) {
      if (!iframeRef.current) {
        return;
      }
      if (widgetRef.current) {
        widgetRef.current.unbind((window as any).SC.Widget.Events.READY);
        widgetRef.current.unbind((window as any).SC.Widget.Events.FINISH);
      }

      const widget = (window as any).SC.Widget(iframeRef.current);
      widgetRef.current = widget;

      const onReady = () => {
        setTrackLoaded(false);
        widget.load(currentTrack.url, { auto_play: isPlaying });
        widget.bind((window as any).SC.Widget.Events.LOAD_PROGRESS, () => {
          setTrackLoaded(true);
        });
      };

      widget.bind((window as any).SC.Widget.Events.READY, onReady);
      widget.bind((window as any).SC.Widget.Events.FINISH, playNextTrack);
    }

    return () => {
      if (localAudioRef.current) {
        localAudioRef.current.unload();
        localAudioRef.current = null;
      }
    };
  }, [currentTrack, isSoundCloudApiLoaded, playNextTrack]);

  useEffect(() => {
    if (!currentTrack) return;

    if (currentTrack.type === 'local') {
      if (localAudioRef.current) {
        if (isPlaying) {
          localAudioRef.current.play();
        } else {
          localAudioRef.current.pause();
        }
      }
    } else if (currentTrack.type === 'soundcloud' && widgetRef.current && trackLoaded) {
      if (isPlaying) {
        widgetRef.current.play();
      } else {
        widgetRef.current.pause();
      }
    }
  }, [isPlaying, trackLoaded, currentTrack]);

  if (!currentTrack) {
    return null;
  }

  return (
    <button onClick={toggleChatbot} className="fixed bottom-2 right-24 bg-black/60 rounded-lg p-2 shadow-lg backdrop-blur-md flex items-center space-x-2">
      {currentTrack.artwork_url && (
        <img src={currentTrack.artwork_url} alt="Track Artwork" className="w-10 h-10 rounded-md" />
      )}
      <button onClick={(e) => { e.stopPropagation(); playPreviousTrack(); }} className="text-white text-lg">
        <FontAwesomeIcon icon={faStepBackward} style={{ color: 'white', fontSize: '24px' }} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); togglePlayPause(); }} className={`text-lg ${trackLoaded ? 'text-red-500' : 'text-gray-500'}`}>
        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} style={{ color: 'white', fontSize: '24px' }} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); playNextTrack(); }} className="text-white text-lg">
        <FontAwesomeIcon icon={faStepForward} style={{ color: 'white', fontSize: '24px' }} />
      </button>
      <div className="text-white text-sm flex-grow">
        <p className="truncate">{currentTrack.title}</p>
      </div>

      {currentTrack.type === 'soundcloud' && (
        <iframe
          ref={iframeRef}
          width="0"
          height="0"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={`https://w.soundcloud.com/player/?url=${currentTrack.url}`}
          style={{ display: 'none' }}
        ></iframe>
      )}
    </button>
  );
}
