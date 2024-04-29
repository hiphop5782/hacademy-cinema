import "./SeatGroup.css";

import { useCallback, useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";
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
        {no:12, row:4, col:4, price:1000, reserved:false, disabled:false},
        {no:13, row:5, col:1, price:1000, reserved:false, disabled:false},
        {no:14, row:5, col:2, price:1000, reserved:false, disabled:false},
        {no:15, row:5, col:3, price:1000, reserved:false, disabled:false},
    ],
    setMap,
    className
})=>{

    const [rowList, setRowList] = useState([]);
    const [colList, setColList] = useState([]);
    useEffect(()=>{
        const rows = new Set();
        const cols = new Set();
        map.forEach(seat=>{
            rows.add(seat.row);
            cols.add(seat.col);
        });
        setRowList(Array.from(rows));
        setColList(Array.from(cols));
    }, []);

    const wrapper = useRef();
    const [size, setSize] = useState(0);
    const [unitSize, setUnitSize] = useState(16);
    useEffect(()=>{
        setUnitSize(size / (colList.length || 1));//NaN 방지
    }, [size, colList]);
    
    const calculate = useCallback(throttle(e=>{
        const width = parseInt(wrapper.current.getBoundingClientRect().width);
        setSize(width);
    }, 50), [wrapper]);
    useEffect(calculate, [])

    useEffect(()=>{
        window.addEventListener("resize", calculate);
        return ()=>window.removeEventListener("resize", calculate);
    });

    const checkSeat = useCallback((e, target)=>{
        setMap(map.map(seat=>{
            if(seat.no === target.no) {
                return {...seat, checked:e.target.checked};
            }
            return {...seat};
        }));
    }, [map]);

    // const checkAllSeat = useCallback(()=>{
    //     setMap(seat=>{
    //         if(seat.disabled || seat.reserved) return {...seat};
    //         return {...seat, checked:true};
    //     });
    // }, [map]);

    return (
        <div ref={wrapper} className={`hacademy-cinema-seat-group ${className}`}>
            {map.map(seat=>(
                <Seat key={seat.no} row={seat.row} col={seat.col} 
                    reserved={seat.reserved} disabled={seat.disabled} 
                    direction={seat.direction}
                    size={unitSize} 
                    x={colList.indexOf(seat.col) * unitSize} 
                    y={rowList.indexOf(seat.row) * unitSize}
                    onChange={e=>checkSeat(e, seat)}></Seat>
            ))}
        </div>
    );
};

export default SeatGroup;