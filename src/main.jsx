import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Player from './Player'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Player/>
  </StrictMode>,
)
