import { useEffect, useState } from "react";
import Seat from "./Seat";

const SeatGroup = ({
    map=[
        {no:1, row:1, col:1, price:1000, reserved:false, disabled:false},
        {no:2, row:1, col:2, price:1000, reserved:false, disabled:false},
        {no:3, row:1, col:3, price:1000, reserved:false, disabled:false},
        {no:4, row:2, col:1, price:1000, reserved:false, disabled:false},
        {no:5, row:2, col:2, price:1000, reserved:false, disabled:false},
        {no:6, row:2, col:3, price:1000, reserved:false, disabled:false},
        {no:7, row:3, col:1, price:1000, reserved:false, disabled:false},
        {no:8, row:3, col:2, price:1000, reserved:false, disabled:false},
        {no:9, row:3, col:3, price:1000, reserved:false, disabled:false},
        {no:10, row:4, col:1, price:1000, reserved:false, disabled:false},
        {no:11, row:4, col:2, price:1000, reserved:false, disabled:false},
        {no:12, row:4, col:3, price:1000, reserved:false, disabled:false},
        {no:13, row:5, col:1, price:1000, reserved:false, disabled:false},
        {no:14, row:5, col:2, price:1000, reserved:false, disabled:false},
        {no:15, row:5, col:3, price:1000, reserved:false, disabled:false},
    ]
})=>{

    const [percent, setPercent] = useState({x : 0, y : 0});
    useEffect(()=>{
        const rows = new Set();
        const cols = new Set();
        map.forEach(seat=>{
            rows.add(seat.row);
            cols.add(seat.col);
        });
        console.log(rows, cols);
        
    }, [map]);

    return (
        <div>
            {map.map(seat=>(
                <Seat row={seat.row} col={seat.col} reserved={seat.reserved} disabled={seat.disabled}></Seat>
            ))}
        </div>
    );
};

export default SeatGroup;