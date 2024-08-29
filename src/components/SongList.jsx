/* eslint-disable react/prop-types */
import  { useState } from 'react';

const SongList = ({ songs, playSong, currentSong, currentTab, setCurrentTab }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = songs.filter(song =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full md:w-1/3 p-6 flex flex-col"
    >
      <div className="mb-8">
        <div className="flex space-x-4">
          <span 
            className={`text-white font-bold cursor-pointer ${currentTab === 'For You' ? 'text-white' : 'text-gray-400'}`}
            onClick={() => setCurrentTab('For You')}
          >
            For You
          </span>
          <span 
            className={`cursor-pointer ${currentTab === 'Top Tracks' ? 'text-white' : 'text-gray-400'}`}
            onClick={() => setCurrentTab('Top Tracks')}
          >
            Top Tracks
          </span>
        </div>
      </div>
      <input
        type="text"
        placeholder="Search Song, Artist"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400"
      />

      <ul className="flex-1 overflow-y-auto space-y-4">
        {filteredSongs.map(song => (
          <li
            key={song.id}
            onClick={() => playSong(song)}
            className={`flex items-center p-3 rounded-lg transition-colors cursor-pointer hover:bg-gray-700 ${
              song.id === currentSong?.id ? 'bg-gray-700' : 'bg-gray-800'
            }`}
          >
            <img 
              src={`https://cms.samespace.com/assets/${song.cover}`} 
              alt={song.name} 
              className="w-12 h-12 rounded-lg object-cover mr-4"
            />
            <div className="flex-1">
              <h4 className="text-white font-semibold">{song.name}</h4>
              <p className="text-sm text-gray-400">{song.artist}</p>
            </div>
            <span className="text-sm text-gray-400">{song.duration || '3:00'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;