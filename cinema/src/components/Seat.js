import { useCallback, useEffect, useMemo, useState } from "react";
import "./Seat.css";

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
        onChange
    })=>{

    //state
    const [angle, setAngle] = useState(0);
    const image = useMemo(()=>{
        if(data[fields.disabled] === true) 
            return `${process.env.PUBLIC_URL}/images/seat-disabled.png`;
        if(data[fields.reserved] === true) 
            return `${process.env.PUBLIC_URL}/images/seat-reserved.png`;
        if(data[fields.checked])
            return `${process.env.PUBLIC_URL}/images/seat-checked.png`;
        return `${process.env.PUBLIC_URL}/images/seat-default.png`;
    }, [data]);

    //callback
    const checkSeat = useCallback(e=>{
        if(data[fields.reserved] === true) return;//예약완료 좌석 체크불가
        if(data[fields.disabled] === true) return;//사용불가 좌석 체크불가

        if(onChange) {
            onChange(e);
        }
    }, [image]);

    const rotateSeat = useCallback(e=>{
        e.preventDefault();

        if(data[fields.edit] === false) return;//관리 모드가 아닐 경우 차단

        const newAngle = (angle + 90) % 360;
        setAngle(newAngle);
    }, [image, angle]);

    //초기 각도 설정
    useEffect(()=>{
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
                    transform : `rotate(${angle}deg)`
                }
            }></span>
        </label>
    );
};

export default Seat;