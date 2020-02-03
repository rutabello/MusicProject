import React from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const MyCountdown = (props) => {
    
    const renderTime = value => {
        if (value === 0) {
          return <div className="timer">Too late...</div>;
        }
      
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{value}</div>
            <div className="text">seconds</div>
          </div>
        );
    };
    
    
    return (
        <CountdownCircleTimer
        isPlaying
        durationSeconds={10}
        colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        renderTime={renderTime}
        // onComplete={() => [true, 1000]}
      />
    )
};

export default MyCountdown;

// Info https://www.npmjs.com/package/react-countdown-circle-timer