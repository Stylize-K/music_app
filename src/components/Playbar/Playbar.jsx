import { useContext, useState, useEffect } from "react";
import { AudioContex } from "../../context/AudioContex";
import style from "./playbar.module.scss";
import { Slider, IconButton } from "@mui/material";
import { PlayArrow, Pause, VolumeOff, VolumeUp } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";

const TimeControls = () => {
  const { audio, currentTrack } = useContext(AudioContex);

  const { duration } = currentTrack;
  const [currentTime, setCurrentTime] = useState(0);
  const formattedCurrentTime = secondsToMMSS(currentTime);

  const sliderCurrenttime = Math.round((currentTime / duration) * 100);
  const handleChangeCurrentTime = (_, value) => {
    const time = Math.round((value / 100) * duration);
    setCurrentTime(time);
    audio.currentTime = time;
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 1000);
    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <>
      <p>{formattedCurrentTime}</p>
      <Slider
        step={1}
        min={0}
        max={100}
        value={sliderCurrenttime}
        onChange={handleChangeCurrentTime}
      />
    </>
  );
};

const VolumeControls = () => {
  const { audio, handleVolumeOff, handleVolumeOn } = useContext(AudioContex);

  const [currentVolume, setCurrentVolume] = useState(1);

  const sliderCurrentVolume = Math.round(audio.volume * 100);
  const handleChangeCurrentTime = (_, value) => {
    const volume = value / 100;
    setCurrentVolume(volume);
    audio.volume = volume;
  };

  useEffect(() => {
    console.log(currentVolume);
    if (currentVolume === 0) {
      handleVolumeOff();
    } else {
      handleVolumeOn();
    }
  }, [currentVolume]);

  return (
    <div className={style.volumeslider}>
      <Slider
        step={1}
        min={0}
        max={100}
        value={sliderCurrentVolume}
        onChange={handleChangeCurrentTime}
      />
      <p>{`${sliderCurrentVolume}%`}</p>
    </div>
  );
};

const Playbar = () => {
  const {
    currentTrack,
    isPlaying,
    isMute,
    handleToggleAudio,
    handleToggleMute,
  } = useContext(AudioContex);

  const { title, artists, preview, duration } = currentTrack;

  const formattedDuration = secondsToMMSS(duration);

  return (
    <div className={style.playbar}>
      <img className={style.preview} src={preview} alt={title} />
      <IconButton onClick={() => handleToggleAudio(currentTrack)}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <IconButton onClick={() => handleToggleMute()}>
        {isMute ? <VolumeOff /> : <VolumeUp />}
      </IconButton>
      <VolumeControls />
      <div className={style.credits}>
        <h4>{title}</h4>
        <p>{artists}</p>
      </div>
      <div className={style.slider}>
        <TimeControls />
        <p>{formattedDuration}</p>
      </div>
    </div>
  );
};

export default Playbar;
