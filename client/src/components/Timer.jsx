import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Timer({ timeLeft, totalTime }) {
    const safeTotal = totalTime || 60
    const percentage = (timeLeft / safeTotal) * 100

  return (
    <div className='w-22 h-22 sm:w-24 sm:h-24'>
        <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "22px",
          pathColor: "#0f8f71",
          textColor: "#0f8f71",
          trailColor: "#dbebe6",
        })}
        />
      
    </div>
  )
}

export default Timer
