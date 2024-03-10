import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [intervalSeconds, setIntervalSeconds] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
          if (timeLeft % intervalSeconds === 0) {
            playAlert();
          }
        } else {
          clearInterval(interval);
          setTimerRunning(false);
          playAlert();
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timeLeft, intervalSeconds]);

  const startTimer = () => {
    if (minutes === '' && seconds === '') {
      alert('Please enter a valid time.');
      return;
    }
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    setTimeLeft(totalSeconds);
    setTimerRunning(true);
  };

  const resetTimer = () => {
    setTimeLeft(null);
    setMinutes('');
    setSeconds('');
    setTimerRunning(false);
  };

  const playAlert = () => {
    const audio = new Audio('/buzzer1.mp3'); // Change 'buzzer.mp3' to the name of your buzzer sound file
    audio.play();
  };

  const formattedDateTime = currentDateTime.toLocaleString([], {
    
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  });

  return (
    <div className="App">
      <header className="header">
        <nav className="navbar">
         <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Countdown Timer Page</h1>
          <div className="current-time">{formattedDateTime}</div>
        </nav>
    
      <div className="background-image">
        <div className="timer-container">
          <h1 id="timer">{timeLeft !== null ? `${Math.floor(timeLeft / 60)
            .toString()
            .padStart(2, '0')}:${(timeLeft % 60)
            .toString()
            .padStart(2, '0')}` : '00:00'}
          </h1>
          <div className="controls">
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="Minutes"
            />
            <input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              placeholder="Seconds"
            />
            <input
              type="number"
              value={intervalSeconds}
              onChange={(e) => setIntervalSeconds(e.target.value)}
              placeholder="Interval (seconds)"
            />
            <br/>
            <button onClick={startTimer}>Start</button>
            &nbsp;&nbsp;
            <button onClick={resetTimer}>Reset</button>
          </div>
        </div>
      </div>
      </header>
    </div>
  );
}

export default App;

