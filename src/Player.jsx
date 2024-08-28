import { useState, useEffect } from "react"
import spotifyLogo from '../src/assets/Logo.svg'

function Player() {

    const [song, setSong] = useState([])
    const url = "https://cms.samespace.com/items/songs"

    useEffect(() => {
        const fetchSongs = async() => {
            try {
                const response = await fetch(url)
                const data = await response.json()
                setSong(data)
            }
            catch (error){
                console.error("Error fetching songs",error);
            }
        }
        fetchSongs()
    }, [])

    return (
        <>
            <img src={spotifyLogo} />
            {song.length > 0 ? (
                song.map((songs) => (
                    <div key={songs.id}>
                        <img src={songs.url} alt={songs.title} />
                        <p>{songs.title}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </>
  )
}

export default Player