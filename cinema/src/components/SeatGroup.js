import "./SeatGroup.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import throttle from "lodash/throttle";
import PropTypes from "prop-types";
import Seat from "./Seat";

const SeatGroup = ({
    map = [],
    setMap,
    fields={
        no:'no', 
        row:'row', 
        col:'col', 
        price:'price', 
        grade:'grade',
        reserved:'reserved', 
        disabled:'disabled', 
        direction:'direction',
        checked:'checked',
    },
    className,
    rows=[],
    cols=[],
    showNames=true,
    showGrade,
    controls=false,
    popup=true,
    images,
})=>{
    const [rowList, setRowList] = useState(rows);
    const [colList, setColList] = useState(cols);
    
    const calculateRowAndCols = useCallback(()=>{
        if(rows.length > 0) {
            setRowList(rows);
        }
        else {
            const row = new Set();
            map.forEach(seat=>{
                row.add(seat[fields.row]);
            });
            setRowList(Array.from(row));
        }
        if(cols.length > 0) {
            setColList(cols);
        }
        else {
            const col = new Set();
            map.forEach(seat=>{
                col.add(seat[fields.col]);
            });
            setColList(Array.from(col));
        }
    }, [rows, cols, map]);
    useEffect(()=>{
        calculateRowAndCols();
    }, []);

    const wrapper = useRef();
    const [size, setSize] = useState(0);
    const [unitSize, setUnitSize] = useState(16);
    useEffect(()=>{
        setUnitSize(size / (colList.length || 1));//NaN 방지
    }, [size, showNames, colList]);
    
    const calculate = useCallback(throttle(e=>{
        const width = parseInt(wrapper.current.getBoundingClientRect().width);
        setSize(width);
    }, 50), [wrapper, showNames, controls, rowList, colList]);
    useEffect(calculate, [wrapper, showNames, controls, rowList, colList]);

    useEffect(()=>{
        window.addEventListener("resize", calculate);
        return ()=>window.removeEventListener("resize", calculate);
    });

    const checkSeat = useCallback((e, target)=>{
        //console.log(e.target, e.target.checked, map.flatMap(seat=>seat.checked === true).join(","));
        setMap(prev=>prev.map((seat)=>{
            if(seat[fields.no] === target[fields.no]) {
                return {...seat, [fields["checked"]]:e.target.checked};
            }
            return seat;
        }));
    }, [map]);

    // const checkAllSeat = useCallback(()=>{
    //     setMap(seat=>{
    //         if(seat.disabled || seat.reserved) return {...seat};
    //         return {...seat, checked:true};
    //     });
    // }, [map]);

    //unitSize에 기반하여 names 크기 계산
    const fontSize = useMemo(()=>unitSize / 3, [unitSize]);

    //check event
    const checkSeatRow = useCallback((row, checked)=>{
        if(controls !== true) return;
        setMap(prev=>prev.map(seat=>{
            if(seat[fields.row] === row) {
                return {...seat, [fields["checked"]]:checked};
            }
            return {...seat};
        }));
    }, [map]);
    const checkSeatColumn = useCallback((col, checked)=>{
        if(controls !== true) return;
        setMap(prev=>prev.map(seat=>{
            if(seat[fields.col] === col) {
                return {...seat, [fields["checked"]]:checked};
            }
            return {...seat};
        }));
    }, [map]);

    //dispatch resize event once
    useEffect(()=>{window.dispatchEvent(new Event('resize'))}, []);

    //popup
    const [popupSeat, setPopupSeat] = useState(null);
    const [popupPos, setPopupPos] = useState({top:0, left:0});

    const enter = useCallback((e, seat)=>{
        const rectStyle = e.target.parentNode.style;
        const top = parseInt(rectStyle.top) + parseInt(rectStyle.fontSize) + fontSize * 1.5;
        const left = parseInt(rectStyle.left) /*+ parseInt(rectStyle.fontSize) */+ fontSize * 1.5;
        setPopupPos({ top : top, left : left });
        setPopupSeat(seat);
    }, [map, popupSeat, popupPos]);
    const leave = useCallback((e, seat)=>{
        setPopupSeat(null);
    }, [map, popupSeat, popupPos]);

    return (
        <>
            <div className="hacademy-cinema-seat-group-controls" style={{fontSize:fontSize, padding:showNames===true ? '1.5em':0}}>
                      {showNames===true && (<>
                    {rowList.map((row, index)=>(<span className="hacademy-cinema-seat-group-numbers" 
                        key={index} style={{
                            top:(index+1)*unitSize,
                            left:0,
                            transform:"translate(0, -50%)",
                            cursor:controls===true ? "pointer" : "default",
                        }}
                        onClick={e=>checkSeatRow(row, true)}>{row}</span>))}
                </>)}
                {showNames===true && (<>
                    {colList.map((col, index)=>(<span className="hacademy-cinema-seat-group-numbers" 
                        key={index} style={{
                            top:0,
                            left:(index+1)*unitSize, 
                            transform:"translate(-50%, 0)",
                            cursor:controls===true ? "pointer" : "default",
                    }}
                    onClick={e=>checkSeatColumn(col, true)}>{col}</span>))}
                </>) }
                {showNames===true && (<>
                    {rowList.map((row, index)=>(<span className="hacademy-cinema-seat-group-numbers" 
                        key={index} style={{
                            top:(index+1)*unitSize,
                            right:0,
                            transform:"translate(0, -50%)",
                            cursor:controls===true ? "pointer" : "default",
                        }}
                        onClick={e=>checkSeatRow(row, false)}>{row}</span>))}
                </>)}
                {showNames===true && (<>
                    {colList.map((col, index)=>(<span className="hacademy-cinema-seat-group-numbers" 
                        key={index} style={{
                            bottom:0,
                            left:(index+1)*unitSize, 
                            transform:"translate(-50%, 0)",
                            cursor:controls===true ? "pointer" : "default",
                        }} 
                        onClick={e=>checkSeatColumn(col, false)}>{col}</span>))}
                </>) }
                <div ref={wrapper} className={`hacademy-cinema-seat-group ${className === undefined ? '' : className}`}
                    style={{width:'100%', height:unitSize*rowList.length}}>
                    {map.map(seat=>(
                        <Seat key={seat[fields.no]} data={seat}
                            fields={fields}
                            size={unitSize}
                            x={colList.indexOf(seat[fields.col]) * unitSize} 
                            y={rowList.indexOf(seat[fields.row]) * unitSize}
                            onChange={e=>checkSeat(e, seat)}
                            onMouseEnter={e=>enter(e, seat)}
                            onMouseLeave={e=>leave(e, seat)}
                            showGrade={showGrade}
                            images={images}
                        ></Seat>
                    ))}
                </div>    

                { (popup === true && popupSeat !== null) && (
                <div className="hacademy-cinema-seat-info"
                        style={popupPos}>
                    <div>좌석 : {popupSeat[fields.row]}-{popupSeat[fields.col]}</div>
                    { fields.grade !== undefined && (
                    <div>등급 : {popupSeat[fields.grade]}</div>
                    ) }
                    { fields.price !== undefined && (
                    <div>가격 : {popupSeat[fields.price]}원</div>
                    ) }
                    { (popupSeat[fields.reserved] !== true && popupSeat[fields.disabled] !== true) ? (
                        <div className="text-valid">예약 가능</div>
                    ) : (
                        <div className="text-invalid">예약 불가</div>
                    ) }
                </div>                    
                ) }
            </div>
        </>
    );
};

//Required
SeatGroup.propTypes = {
    map:PropTypes.arrayOf(PropTypes.object).isRequired,
    onChange:PropTypes.func,
    showGrade:PropTypes.object,
};

export default SeatGroup;