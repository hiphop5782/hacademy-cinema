import './App.css';

import SeatGroup from './components/SeatGroup';
import { useState } from 'react';

function App() {
  const [map, setMap] = useState(
    [
      {no:1, row:1, col:1, price:1000, reserved:true, disabled:false},
      {no:2, row:1, col:2, price:1000, reserved:true, disabled:false},
      {no:3, row:1, col:3, price:1000, reserved:false, disabled:true},
      {no:4, row:2, col:1, price:1000, reserved:false, disabled:true},
      {no:5, row:2, col:2, price:1000, reserved:false, disabled:false},
      {no:6, row:2, col:3, price:1000, reserved:false, disabled:false},
      {no:7, row:3, col:1, price:1000, reserved:false, disabled:false},
      {no:8, row:3, col:2, price:1000, reserved:false, disabled:false},
      {no:9, row:3, col:3, price:1000, reserved:false, disabled:false},
      {no:10, row:4, col:1, price:1000, reserved:false, disabled:false},
      {no:11, row:4, col:2, price:1000, reserved:false, disabled:false},
      {no:12, row:4, col:4, price:1000, reserved:false, disabled:false},
      {no:13, row:5, col:1, price:1000, reserved:false, disabled:false},
      {no:14, row:5, col:2, price:1000, reserved:false, disabled:false},
      {no:15, row:5, col:3, price:1000, reserved:false, disabled:false},
    ]
  );

  return (
    <>
      <h1>선택도구</h1>
      <SeatGroup map={map} setMap={setMap}/>
    </>
  );
}

export default App;
