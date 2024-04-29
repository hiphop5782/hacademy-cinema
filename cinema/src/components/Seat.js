import { useCallback, useEffect, useState } from "react";
import "./Seat.css";

const Seat = ({
        className="", 
        data = {
            no:'no', 
            row:'row', 
            col:'col', 
            price:'price', 
            grade:'grade',
            reserved:'reserved', 
            disabled:'disabled', 
            direction:'direction',
        }, 
        fields,
        name="seat", 
        size=50,
        x=0, y=0,
        onChange
    })=>{

    //state
    const [image, setImage] = useState(`${process.env.PUBLIC_URL}/images/seat-basic.png`);
    const [angle, setAngle] = useState(0);

    //초기 상태 설정
    useEffect(()=>{
        if(data[fields.disabled] === true) {
            setImage(`${process.env.PUBLIC_URL}/images/seat-disabled.png`);
            return;
        }
        if(data[fields.reserved] === true) {
            setImage(`${process.env.PUBLIC_URL}/images/seat-reserved.png`);
            return;
        }
    }, []);

    //callback
    const checkSeat = useCallback(e=>{
        if(data[fields.reserved] === true) return;//예약완료 좌석 체크불가
        if(data[fields.disabled] === true) return;//사용불가 좌석 체크불가

        if(e.target.checked) {
            setImage(`${process.env.PUBLIC_URL}/images/seat-check.png`);
        }
        else {
            setImage(`${process.env.PUBLIC_URL}/images/seat-basic.png`);
        }
        onChange(e);
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
        <label className={`hacademy-cinema-seat ${className} ${data[fields.reserved] ? 'reserved' : ''} ${data[fields.disabled] ? 'disabled' : ''}`} 
            style={
                {
                    fontSize:size, left:x, top:y
                }
            }
            onContextMenu={rotateSeat}>
            <input type="checkbox" name={name} value={`${data[fields.row]}-${data[fields.col]}`} disabled={data[fields.reserved]}
                onChange={checkSeat}/>
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