import './App.css';
import SeatCreator from './components/SeatCreator';

import SeatGroup from './components/SeatGroup';
import { useCallback, useEffect, useState } from 'react';
import def from "./components/images/114.png";
import chk from "./components/images/116.png";
import res from "./components/images/115.png";
import dis from "./components/images/117.png";

function App() {
  const [map, setMap] = useState(
    [
      {
        "seatNo": 2,
        "seatRow": 1,
        "seatColumn": 2,
        "busNo": 4
      },
      {
        "seatNo": 3,
        "seatRow": 1,
        "seatColumn": 3,
        "busNo": 4
      },
      {
        "seatNo": 4,
        "seatRow": 1,
        "seatColumn": 4,
        "busNo": 4
      },
      {
        "seatNo": 5,
        "seatRow": 1,
        "seatColumn": 5,
        "busNo": 4
      },
      {
        "seatNo": 6,
        "seatRow": 1,
        "seatColumn": 6,
        "busNo": 4
      },
      {
        "seatNo": 7,
        "seatRow": 1,
        "seatColumn": 7,
        "busNo": 4
      },
      {
        "seatNo": 8,
        "seatRow": 2,
        "seatColumn": 1,
        "busNo": 4
      },
      {
        "seatNo": 9,
        "seatRow": 2,
        "seatColumn": 2,
        "busNo": 4
      },
      {
        "seatNo": 10,
        "seatRow": 2,
        "seatColumn": 3,
        "busNo": 4
      },
      {
        "seatNo": 11,
        "seatRow": 2,
        "seatColumn": 4,
        "busNo": 4
      },
      {
        "seatNo": 12,
        "seatRow": 2,
        "seatColumn": 5,
        "busNo": 4
      },
      {
        "seatNo": 13,
        "seatRow": 2,
        "seatColumn": 6,
        "busNo": 4
      },
      {
        "seatNo": 14,
        "seatRow": 2,
        "seatColumn": 7,
        "busNo": 4
      },
      {
        "seatNo": 15,
        "seatRow": 3,
        "seatColumn": 1,
        "busNo": 4
      },
      {
        "seatNo": 16,
        "seatRow": 3,
        "seatColumn": 2,
        "busNo": 4
      },
      {
        "seatNo": 17,
        "seatRow": 3,
        "seatColumn": 3,
        "busNo": 4
      },
      {
        "seatNo": 18,
        "seatRow": 3,
        "seatColumn": 4,
        "busNo": 4
      },
      {
        "seatNo": 19,
        "seatRow": 3,
        "seatColumn": 5,
        "busNo": 4
      },
      {
        "seatNo": 20,
        "seatRow": 3,
        "seatColumn": 6,
        "busNo": 4
      },
      {
        "seatNo": 21,
        "seatRow": 3,
        "seatColumn": 7,
        "busNo": 4
      },
      {
        "seatNo": 22,
        "seatRow": 4,
        "seatColumn": 1,
        "busNo": 4
      },
      {
        "seatNo": 23,
        "seatRow": 4,
        "seatColumn": 2,
        "busNo": 4
      },
      {
        "seatNo": 24,
        "seatRow": 4,
        "seatColumn": 3,
        "busNo": 4
      },
      {
        "seatNo": 25,
        "seatRow": 4,
        "seatColumn": 4,
        "busNo": 4
      },
      {
        "seatNo": 26,
        "seatRow": 4,
        "seatColumn": 5,
        "busNo": 4
      },
      {
        "seatNo": 27,
        "seatRow": 4,
        "seatColumn": 6,
        "busNo": 4
      },
      {
        "seatNo": 28,
        "seatRow": 4,
        "seatColumn": 7,
        "busNo": 4,
        "seatChecked": false
      },
      {
        "seatNo": 1,
        "seatRow": 1,
        "seatColumn": 1,
        "busNo": 4
      }
    ]
  );

  useEffect(()=>{
    //console.log(map);
    //console.log(map.filter(seat=>seat.seatChecked === true));
  }, [map]);

  return (
    <div style={{width:500}}>
      <h1>선택도구</h1>
      <SeatGroup map={map} setMap={setMap}
        fields={{
          no:'seatNo', 
          row:'seatColumn', 
          col:'seatRow', 
          price:'seatPrice', 
          grade:'seatGrade',
          reserved:'seatReserved', 
          disabled:'seatDisabled',
          checked:'seatChecked',
        }}
        cols={[1, 2, ' ', 3, 4]}
        showNames
        images={{default:def, checked:chk, reserved:res, disabled:dis}}
      />
    </div>
  );
}

// const App = ()=>{
//   return (
//     <div style={{width:500}}>
//       <SeatCreator rows={['A','B','C','D','E']} cols={[1,2,3,4,5]}/>      
//     </div>
//   );
// };

export default App;
