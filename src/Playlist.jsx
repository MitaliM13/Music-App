import { useRef, useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";

const url = "https://cms.samespace.com/items/songs";

function Playlist() {
    const [songs, setSongs] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const audioRefs = useRef([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setSongs(data.data);
                    setFilteredSongs(data.data); // Initialize filtered songs
                } else {
                    console.error("Failed to fetch songs");
                }
            } catch (error) {
                console.error("Error", error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        const result = songs.filter(song =>
            song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredSongs(result);
    };

    const handleLoadedMetadata = (index) => {
        const updatedSongs = [...filteredSongs];
        updatedSongs[index].duration = audioRefs.current[index].duration;
        setFilteredSongs(updatedSongs);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="flex justify-between w-60 mb-4 px-4">
                <h2 className="text-white text-xl cursor-pointer hover:underline">Trending</h2>
                <h2 className="text-white text-xl cursor-pointer hover:underline">For You</h2>
            </div>
            
            <div className="relative w-60 px-4 flex items-center">
                <input 
                    className='bg-black text-white pl-4 pr-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500'
                    type="search" 
                    placeholder='Search Song, Artist'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key press
                />
                <IoIosSearch 
                    className="text-gray-500 ml-2 cursor-pointer" 
                    size={20} 
                    onClick={handleSearch} // Trigger search on click
                />
            </div>
            
            <div className="mt-4 w-80">
                <ul className="text-white space-y-2">
                    {filteredSongs.map((song, index) => (
                        <li key={song.id} className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 flex  items-center space-x-4">
                            <audio 
                                ref={el => audioRefs.current[index] = el} 
                                src={song.url} 
                                onLoadedMetadata={() => handleLoadedMetadata(index)} 
                                className="hidden"
                            />
                            <img 
                                src={`https://cms.samespace.com/assets/${song.cover}`} 
                                alt={song.name}
                                className='w-10 h-10 object-cover' 
                            />
                            <div>
                                <strong>{song.name}</strong> - {song.artist}
                                <span className="block text-gray-400">
                                    {song.duration ? `${Math.floor(song.duration / 60)}:${Math.floor(song.duration % 60).toString().padStart(2, '0')}` : 'Loading...'}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Playlist;
