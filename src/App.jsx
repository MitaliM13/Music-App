import Playlist from './Playlist';
import Player from './Player';    

function App() {


  return (
    <div className="flex flex-col h-screen ">
      <div className="flex flex-1">
        <div className="flex-1 bg-gray-900 p-4">
          <Playlist />
        </div>
        <div className="flex-1 bg-gray-800 p-4">
          <Player  />
        </div>
      </div>
    </div>
  );
}

export default App;
