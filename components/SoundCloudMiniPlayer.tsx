'use client';
import React from 'react';

export default function SoundCloudMiniPlayer() {
  return (
    <div className="fixed bottom-2 right-24 bg-black/60 rounded-lg p-2 shadow-lg backdrop-blur-md">
      <iframe
        width="250"
        height="90"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/lukewealth/lukewealth_use_ya_head%3Fin%3Dlukewealth/sets/black-lips-poem%26utm_source%3Dclipboard%26utm_medium%3Dtext%26utm_campaign%3Dsocial_sharing&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
      ></iframe>
    </div>
  );
}