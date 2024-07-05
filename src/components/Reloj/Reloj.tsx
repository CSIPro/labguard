import { useState, useEffect } from "react";

const Clock = () => {
    const [currentTime, setCurrentTime]=useState(new Date());
    
    useEffect(()=> {
        const timerID = setInterval(()=> {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timerID);
    },[])

return(
    <div>
        <h1>{currentTime.toLocaleDateString()}</h1>
        <h1>{currentTime.toLocaleTimeString()}</h1>
    </div>
)
}
export default Clock;