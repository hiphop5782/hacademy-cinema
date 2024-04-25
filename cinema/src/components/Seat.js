import "./Seat.css";

const Seat = ({
        className="", 
        name="seat", 
        row, col, 
        size=50,
        reserved=false
    })=>{
    return (
        <label className={`hacademy-cinema-seat ${className} ${reserved && 'reserved'}`} style={{'font-size':size}}>
            <input type="checkbox" name={name} row={row} col={col} disabled={reserved}/>
        </label>
    );
};

export default Seat;