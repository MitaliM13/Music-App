import { useState, useEffect, useRef } from "react";
import spotifyLogo from '../src/assets/Logo.svg';

const url = "https://cms.samespace.com/items/songs";

function Player() {
    const [songs, setSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isMuted, setIsMuted] = useState(false)
    const audioRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setSongs(data.data);
                } else {
                    console.error("Failed to fetch songs");
                }
            } catch (error) {
                console.error("Error", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }
    }, [currentSongIndex]);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const playSong = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const pauseSong = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const nextSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const previousSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted)
        audioRef.current.muted = !audioRef.current.muted
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    if (!songs.length) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    const { name, artist, cover, url: songUrl, accent } = songs[currentSongIndex];

    return (
        <div style={{backgroundColor: accent}}
        className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            <img src={spotifyLogo} alt="Spotify Logo" className="w-32 mb-8" />
            <div className="flex flex-col items-center  bg-gray-800 ">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <h4 className="text-md font-light text-gray-400 ">{artist}</h4>
                <img 
                    src={`https://cms.samespace.com/assets/${cover}`} 
                    alt={name} 
                    className="w-64 h-64 object-cover"
                />
                

                <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={(currentTime / duration) * 100 || 0}
                    onChange={handleSeek}
                    className="w-full h-1 bg-gray-600 rounded-lg cursor-pointer mb-4"
                />
                <div className="flex justify-between w-full text-sm text-gray-400 mb-4">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>

                <div className="flex space-x-4">
                    <button 
                        onClick={previousSong} 
                        className="text-white bg-gray-700 hover:bg-gray-600 rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        ◀
                    </button>
                    <button 
                        onClick={isPlaying ? pauseSong : playSong} 
                        className="text-white bg-green-500 hover:bg-green-400 rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        {isPlaying ? '❚❚' : '▶'}
                    </button>
                    <button 
                        onClick={nextSong} 
                        className="text-white bg-gray-700 hover:bg-gray-600 rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        ▶
                    </button>
                    <button
                        onClick={toggleMute}
                        className="text-white bg-gray-700 hover:bg-gray-600 rounded-full w-10 h-10 flex items-center justify-center"
                    >
                        {isMuted ? '🔇' : '🔊'}
                    </button>
                </div>
                <audio ref={audioRef} id="audio" src={songUrl}></audio>
            </div>
        </div>
    );
}

export default Player;
