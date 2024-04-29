import './App.css';

import SeatGroup from './components/SeatGroup';
import { useCallback, useEffect, useState } from 'react';

function App() {
  const [maps, setMap] = useState(
    [
      {seatNo:1, seatRow:'A', seatCol:1, seatPrice:1000, seatGrade:'VIP', seatReserved:true, seatDisabled:false},
      {seatNo:2, seatRow:'A', seatCol:2, seatPrice:1000, seatGrade:'VIP', seatReserved:true, seatDisabled:false},
      {seatNo:3, seatRow:'A', seatCol:3, seatPrice:1000, seatGrade:'VIP', seatReserved:false, seatDisabled:true},
      {seatNo:4, seatRow:'A', seatCol:4, seatPrice:1000, seatGrade:'VIP', seatReserved:false, seatDisabled:true},
      {seatNo:5, seatRow:'A', seatCol:5, seatPrice:1000, seatGrade:'VIP', seatReserved:false, seatDisabled:false},
      {seatNo:6, seatRow:'A', seatCol:6, seatPrice:1000, seatGrade:'VIP', seatReserved:false, seatDisabled:false},
      {seatNo:7, seatRow:'A', seatCol:7, seatPrice:1000, seatGrade:'VIP', seatReserved:false, seatDisabled:false},
      {seatNo:8, seatRow:'A', seatCol:8, seatPrice:1000, seatGrade:'VIP', seatReserved:false, seatDisabled:false},
      {seatNo:9, seatRow:'A', seatCol:9, seatPrice:1000, seatGrade:'VIP', seatReserved:false, seatDisabled:false},
      {seatNo:10, seatRow:'A', seatCol:10, seatPrice:1000, seatGrade:'VIP', seatReserved:false, seatDisabled:false},
      {seatNo:11, seatRow:'B', seatCol:1, seatPrice:1000, seatGrade:'일반', seatReserved:false, seatDisabled:false},
      {seatNo:12, seatRow:'B', seatCol:2, seatPrice:1000, seatGrade:'일반', seatReserved:false, seatDisabled:false},
      {seatNo:13, seatRow:'B', seatCol:3, seatPrice:1000, seatGrade:'일반', seatReserved:false, seatDisabled:false},
      {seatNo:14, seatRow:'B', seatCol:4, seatPrice:1000, seatGrade:'일반', seatReserved:false, seatDisabled:false},
      {seatNo:15, seatRow:'B', seatCol:5, seatPrice:1000, seatGrade:'일반', seatReserved:false, seatDisabled:false},
      {seatNo:16, seatRow:'B', seatCol:6, seatPrice:1000, seatGrade:'일반', seatReserved:false, seatDisabled:false},
      {seatNo:17, seatRow:'B', seatCol:7, seatPrice:1000, seatGrade:'일반', seatReserved:false, seatDisabled:false},
      {seatNo:18, seatRow:'B', seatCol:8, seatPrice:1000, seatGrade:'일반', seatReserved:false, seatDisabled:false},
      {seatNo:19, seatRow:'B', seatCol:9, seatPrice:1000, seatGrade:'일반', seatReserved:false, seatDisabled:false},
      {seatNo:20, seatRow:'B', seatCol:10, seatPrice:1000, seatGrade:'일반', seatReserved:false, seatDisabled:false},
      {seatNo:21, seatRow:'C', seatCol:1, seatPrice:1000, seatGrade:'일반', seatReserved:false, seatDisabled:false},
      {seatNo:22, seatRow:'C', seatCol:5, seatPrice:1000, seatGrade:'일반', seatReserved:false, seatDisabled:false},
      {seatNo:23, seatRow:'C', seatCol:10, seatPrice:1000, seatGrade:'일반', seatReserved:false, seatDisabled:false},
    ]
  );

  const onChange = useCallback((data, filterData)=>{
    //console.log("onChange", data, filterData);
  }, [maps]);

  return (
    <div>
      <h1>선택도구</h1>
      <SeatGroup maps={maps} onChange={onChange}
        fields={{
          no:'seatNo', 
          row:'seatRow', 
          col:'seatCol', 
          price:'seatPrice', 
          grade:'seatGrade',
          reserved:'seatReserved', 
          disabled:'seatDisabled',
        }}
        rows={['A', 'B', 'C', 'D', 'E', 'F', 'G']}
        cols={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        showNames
      />
    </div>
  );
}

export default App;
