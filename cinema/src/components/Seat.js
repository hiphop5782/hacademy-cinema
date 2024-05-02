import "./Seat.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import SeatDefault from "./images/seat-default.png";
import SeatChecked from "./images/seat-checked.png";
import SeatDisabled from "./images/seat-disabled.png";
import SeatReserved from "./images/seat-reserved.png";

const Seat = ({
        className="", 
        data, 
        fields={
            no:'no', 
            row:'row', 
            col:'col', 
            price:'price', 
            grade:'grade',
            reserved:'reserved', 
            disabled:'disabled', 
            direction:'direction',
            checked:'checked'
        },
        name="seat", 
        size=50,
        x=0, y=0,
        onChange,
        onMouseEnter, onMouseLeave,
        showGrade,
        images
    })=>{

    //state
    const [angle, setAngle] = useState(0);
    const image = useMemo(()=>{
        if(fields !== undefined) {
            if(data[fields.disabled] === true) 
                return images === undefined ? SeatDisabled : images.disabledState;
            if(data[fields.reserved] === true) 
                return images === undefined ? SeatReserved : images.reservedState;
            if(data[fields.checked] === true)
                return images === undefined ? SeatChecked : images.checkedState;
        }
        return images === undefined ? SeatDefault : images.defaultState;
    }, [data]);

    //callback
    const checkSeat = useCallback(e=>{
        if(fields === undefined) return;
        if(data[fields.reserved] === true) return;//예약완료 좌석 체크불가
        if(data[fields.disabled] === true) return;//사용불가 좌석 체크불가

        if(onChange) {
            onChange(e);
        }
    }, [image]);

    const rotateSeat = useCallback(e=>{
        e.preventDefault();
        if(fields === undefined) return;
        if(data[fields.edit] === false) return;//관리 모드가 아닐 경우 차단

        const newAngle = (angle + 90) % 360;
        setAngle(newAngle);
    }, [image, angle]);

    //초기 각도 설정
    useEffect(()=>{
        if(fields === undefined) return;
        const angles = {
            up : 0, right : 90, down : 180, left : 270
        };
        setAngle(angles[data[fields.direction]]);
    }, [data[fields.direction]]);

    return (
        <label className={`hacademy-cinema-seat ${className}}`} 
            style={
                {
                    fontSize:size, left:x, top:y
                }
            }
            onContextMenu={rotateSeat}>
            <input type="checkbox" name={name} value={`${data[fields.row]}-${data[fields.col]}`} disabled={data[fields.reserved]}
                onChange={checkSeat} checked={data[fields.checked]===true ? true : false}/>
            <span style={
                {
                    backgroundImage : `url(${image})` ,
                    transform : `rotate(${angle}deg)`,
                }
            } 
            onMouseEnter={e=>onMouseEnter !== undefined && onMouseEnter(e)}
            onMouseLeave={e=>onMouseLeave !== undefined && onMouseLeave(e)}
            >
                {(showGrade !== undefined && fields.grade !== undefined) && (
                    <label style={{...showGrade}}>{data[fields.grade]}</label>
                ) }
            </span>
        </label>
    );
};

export default Seat;