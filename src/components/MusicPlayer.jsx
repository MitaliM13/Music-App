/* eslint-disable react/prop-types */
import  { useRef, useState } from 'react';
import ReactPlayer from 'react-player';

const MusicPlayer = ({ currentSong, isPlaying, setIsPlaying, onNext, onPrev, onEnded }) => {
  const playerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8); 

  const handleProgress = (state) => {
    setProgress(state.playedSeconds);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleSeek = (event) => {
    const newTime = (event.target.value / 100) * duration;
    playerRef.current.seekTo(newTime);
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value)); 
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full md:w-2/3 p-10 flex flex-col items-center text-white">
      {currentSong && (
        <>
          <div className="w-full text-left mb-6">
            <h2 className="text-2xl font-bold">{currentSong.name}</h2>
            <h3 className="text-xl text-gray-400">{currentSong.artist}</h3>
          </div>
  
          <img
            src={`https://cms.samespace.com/assets/${currentSong.cover}`}
            alt={currentSong.name}
            className="w-[500px] h-[500px] object-cover rounded-lg shadow-lg mb-8"
          />
  
          <div className="w-full flex items-center justify-center space-x-4 mb-4">
            <span className="text-sm">{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={(progress / duration) * 100 || 0}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-600 rounded-lg cursor-pointer"
            />
            <span className="text-sm">{formatTime(duration)}</span>
          </div>

          <div className="w-full flex items-center justify-center space-x-4 mb-4">
            <label className="text-sm">Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1 bg-gray-600 rounded-lg cursor-pointer"
            />
          </div>
  
          <div className="flex items-center space-x-6">
            <button 
              onClick={onPrev}
              className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 bg-green-500 rounded-full hover:bg-green-400 transition-colors"
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button 
              onClick={onNext}
              className="px-4 py-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
            >
              Next
            </button>
          </div>
  
          <ReactPlayer
            ref={playerRef}
            url={currentSong.url}
            playing={isPlaying}
            onEnded={onEnded}
            onProgress={handleProgress}
            onDuration={handleDuration}
            volume={volume} 
            controls={false}
            width="0"
            height="0"
          />
        </>
      )}
    </div>
  );
};

export default MusicPlayer;