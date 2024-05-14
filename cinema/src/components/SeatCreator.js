import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import SeatGroup from "./SeatGroup";

import "./SeatCreator.css";

const SeatCreator = ({
    rows, cols,
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
    images
})=>{
    const [map, setMap] = useState([]);
    useEffect(()=>{
        const array = [];
        let seq = 1;
        for(let i=0; i < rows.length; i++) {
            for(let k=0; k < cols.length; k++) {
                array.push({
                    [fields.no] : seq++,
                    [fields.row] : rows[i],
                    [fields.col] : cols[k],
                    [fields.grade] : '일반',
                    [fields.price] : 0,
                    [fields.reserved] : false,
                    [fields.disabled] : false,
                    [fields.checked] : false
                })
            }
        }
        setMap(array);
    }, [rows, cols]);

    const [checkState, setCheckState] = useState(false);

    const checkAll = useCallback(e=>{
        setCheckState(e.target.checked);
    }, [map, checkState]);

    useEffect(()=>{
        setMap(prev=>prev.map(seat=>({...seat, [fields["checked"]]:checkState})));
    }, [checkState]);

    return (
        <div className="hacademy-cinema-seat-creator">
            <input type="checkbox" className="hacademy-cinema-seat-checker" checked={checkState} onChange={e=>checkAll(e)}/>
            <input type="checkbox" className="hacademy-cinema-seat-checker" checked={checkState} onChange={e=>checkAll(e)}/>
            <input type="checkbox" className="hacademy-cinema-seat-checker" checked={checkState} onChange={e=>checkAll(e)}/>
            <input type="checkbox" className="hacademy-cinema-seat-checker" checked={checkState} onChange={e=>checkAll(e)}/>
            <SeatGroup map={map} setMap={setMap} fields={fields}
                rows={rows} cols={cols} controls images/>
        </div>
    );
};

//Required
SeatCreator.propTypes = {
    rows : PropTypes.array.isRequired,
    cols : PropTypes.array.isRequired
};

export default SeatCreator;