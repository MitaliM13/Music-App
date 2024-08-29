import { useState, useEffect } from "react";    
import axios from "axios";
import MusicPlayer from "./components/MusicPlayer";
import SongList from "./components/SongList";
import Header from "./components/Header";

const App = () => {

  const [songs, setSongs] = useState([])
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTab, setCurrentTab] = useState('For You')

  useEffect(() => {
    axios.get('https://cms.samespace.com/items/songs')
    .then(response => {
      const fetchedSongs = response.data.data
      setSongs(fetchedSongs)
      setCurrentSong(fetchedSongs[0])
    })
    .catch(error => console.error(error))
  }, [])

  const playSong = (song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const handleNextSong = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % songs.length
    setCurrentSong(songs[nextIndex])
  }

  const handlePrevSong = () => {
    const currentIndex = songs.findIndex(song => song.id === currentSong.id)
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length
    setCurrentSong(songs[prevIndex])
  }

  const onSongEnded = () => {
    handleNextSong()
  }

  const backgroundGradient = currentSong
    ? `linear-gradient(to bottom right, ${currentSong.accent} 0%, #000000 100%)`
    : 'linear-gradient(to bottom right, #333333 0%, #000000 100%)';
  const filteredSongs = currentTab === 'For You'
    ? songs
    : songs.filter(song => song.top_track);

  return (
    <div className="min-h-screen flex justify-center items-center" style={{ background: backgroundGradient }}>
      <div className="w-full flex flex-col md:flex-row rounded-lg shadow-xl overflow-hidden">
        <Header background={backgroundGradient} />
        <SongList 
          songs={filteredSongs} 
          playSong={playSong} 
          currentSong={currentSong} 
          background={backgroundGradient}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <MusicPlayer 
          currentSong={currentSong} 
          isPlaying={isPlaying} 
          setIsPlaying={setIsPlaying} 
          onNext={handleNextSong} 
          onPrev={handlePrevSong} 
          onEnded={onSongEnded}
          background={backgroundGradient}
        />
      </div>
    </div>
  );
}

export default App;
