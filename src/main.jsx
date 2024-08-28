import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import Player from './Player'
// import Playlist from './Playlist'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Playlist/>
    <Player/> */}
  </StrictMode>,
)
