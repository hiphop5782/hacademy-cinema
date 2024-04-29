import { useCallback, useEffect, useState } from "react";
import "./Seat.css";

const Seat = ({
        className="", 
        name="seat", 
        row, col, 
        size=50,
        reserved=false,
        disabled=false,
        edit=false,
        direction="up",
        x=0, y=0,
        onChange
    })=>{

    //state
    const [image, setImage] = useState(`${process.env.PUBLIC_URL}/images/seat-basic.png`);
    const [angle, setAngle] = useState(0);

    //초기 상태 설정
    useEffect(()=>{
        if(reserved) {
            setImage(`${process.env.PUBLIC_URL}/images/seat-reserved.png`);
        }
    }, []);

    //callback
    const checkSeat = useCallback(e=>{
        if(reserved === true) return;//예약완료 좌석 체크불가
        if(disabled === true) return;//사용불가 좌석 체크불가

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

        if(edit === false) return;//관리 모드가 아닐 경우 차단

        const newAngle = (angle + 90) % 360;
        setAngle(newAngle);
    }, [image, angle]);

    //초기 각도 설정
    useEffect(()=>{
        const data = {
            up : 0, right : 90, down : 180, left : 270
        };
        setAngle(data[direction]);
    }, [direction]);

    return (
        <label className={`hacademy-cinema-seat ${className} ${reserved ? 'reserved' : ''} ${disabled ? 'disabled' : ''}`} 
            style={
                {
                    fontSize:size, left:x, top:y
                }
            }
            onContextMenu={rotateSeat}>
            <input type="checkbox" name={name} value={`${row}-${col}`} disabled={reserved}
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