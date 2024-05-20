import './App.css';

import rock from "./images/rock-removebg-preview.png"
import paper from "./images/paper.png"
import scissors from "./images/scissors.png"

function App() {
  return (
    <div className="App">
      <img className='border rounded-full' src={rock} alt="" />
      <img src={paper} alt="" />
      <img src={scissors} alt="" />
    </div>
  );
}

export default App;
