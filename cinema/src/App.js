import './App.css';

import Seat from "@src/components/Seat";
import SeatGroup from './components/SeatGroup';

function App() {
  return (
    <>
      <h1>선택도구</h1>
      <SeatGroup row={5} col={5}/>
    </>
  );
}

export default App;
