import { createContext, useState } from "react";
import tracksList from "../assets/tracksList";

const audio = new Audio();

export const AudioContex = createContext({});

const AudioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(tracksList[0]);
  const [isPlaying, setPlaying] = useState(false);

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
      setPlaying(false);
    }
  };

  const value = { currentTrack, isPlaying, handleToggleAudio };

  return <AudioContex.Provider value={value}>{children}</AudioContex.Provider>;
};

export default AudioProvider;
