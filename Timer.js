import React, { useEffect, useState } from "react";

export default function Timer() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let timerId;

        if (running) {
            timerId = setInterval(() => {
                if (seconds === 0) {
                    if (minutes > 0) {
                        setMinutes((prevMinutes) => prevMinutes - 1);
                        setSeconds(59);
                    } else {
                        setRunning(false); 
                    }
                } else {
                    setSeconds((prevSeconds) => prevSeconds - 1);
                }
            }, 1000);
        }

        return () => clearInterval(timerId);
    }, [running, minutes, seconds]);

    const handleStart = () => setRunning(true);
    const handlePause = () => setRunning(false);
    const handleReset = () => {
        setRunning(false);
        setMinutes(25);
        setSeconds(0);
    };

    const handleMinuteChange = (e) => {
        const value = Math.max(0, Number(e.target.value)); 
        setMinutes(value);
    };

    const handleSecondChange = (e) => {
        let value = Math.min(59, Math.max(0, Number(e.target.value))); 
        setSeconds(value);
    };

    return (
        <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
            <h1>Timer</h1>
            <h2>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </h2>
            <div>
                <button onClick={handleStart} disabled={running}>
                    Start
                </button>
                <button onClick={handlePause} disabled={!running}>
                    Pause
                </button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div style={{ marginTop: "20px" }}>
                <label>
                    Set Minutes:{" "}
                    <input
                        type="number"
                        value={minutes}
                        placeholder="Set Minutes"
                        min={0}
                        onChange={handleMinuteChange}
                    />
                </label>
                <label style={{ marginLeft: "10px" }}>
                    Set Seconds:{" "}
                    <input
                        type="number"
                        value={seconds}
                        placeholder="Set Seconds"
                        min={0}
                        max={59}
                        onChange={handleSecondChange}
                    />
                </label>
            </div>
       </div>
     );
}
