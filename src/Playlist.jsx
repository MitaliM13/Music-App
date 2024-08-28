import { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";

const url = "https://cms.samespace.com/items/songs";

function Playlist() {
    const [songs, setSongs] = useState([]);

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

    return (
        <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="flex justify-between w-60 mb-4 px-4">
                <h2 className="text-white text-xl cursor-pointer hover:underline">Trending</h2>
                <h2 className="text-white text-xl cursor-pointer hover:underline">For You</h2>
            </div>
            
            <div className="relative w-60 px-4">
                <input 
                    className='bg-black text-white pl-10 pr-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500'
                    type="search" 
                    placeholder='Search Song, Artist'
                />
                <IoIosSearch className="absolute text-gray-500 left-4 top-1/2 transform -translate-y-1/2" size={20} />
            </div>
            
            <div className="mt-4 w-60">
                <ul className="text-white space-y-2">
                    {songs.map((song) => (
                        <li key={song.id} className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700">
                            <strong>{song.name}</strong> - {song.artist}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Playlist;
