import { useContext } from "react";
import { AudioContex } from "../../context/AudioContex";
import style from "./Track.module.scss";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";
import cn from "classnames";

const Track = (track) => {
  const { id, preview, title, artists, duration } = track;

  const { handleToggleAudio, currentTrack, isPlaying } =
    useContext(AudioContex);

  const isCurrentTrack = currentTrack.id === track.id;

  const formattedDuration = secondsToMMSS(duration);

  return (
    <div className={cn(style.track, isCurrentTrack && style.playing)}>
      <IconButton onClick={() => handleToggleAudio(track)}>
        {isPlaying && isCurrentTrack ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img className={style.preview} src={preview} alt={title}></img>
      <div className={style.credits}>
        <b>{title}</b>
        <p>{artists}</p>
      </div>
      <p>{formattedDuration}</p>
    </div>
  );
};
export default Track;
