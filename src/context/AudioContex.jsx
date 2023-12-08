import { createContext, useState } from "react";
import tracksList from "../assets/tracksList";

const defaultTrack = tracksList[0];

const audio = new Audio(defaultTrack.src);

export const AudioContex = createContext({});

const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(defaultTrack);
  const [isPlaying, setPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);

  const handleToggleAudio = (track) => {
    if (currentTrack.id !== track.id) {
      setCurrentTrack(track);
      setPlaying(true);
      audio.src = track.src;
      audio.currentTime = 0;
      audio.play();
      return;
    }
    if (isPlaying) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (!isMute) {
      audio.muted = true;
      setIsMute(true);
    } else {
      audio.muted = false;
      setIsMute(false);
    }
  };

  const value = {
    audio,
    currentTrack,
    isPlaying,
    isMute,
    handleToggleAudio,
    handleToggleMute,
  };

  return <AudioContex.Provider value={value}>{children}</AudioContex.Provider>;
};

export default AudioProvider;
