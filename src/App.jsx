import './App.css';
import { FaArrowCircleUp, FaArrowCircleDown, FaPlay, FaPause, FaUndo } from "react-icons/fa";
import { useState, useEffect } from 'react';


function App() {
  const [sessionLength, setSessionLength] = useState(25)
  const [breakLength, setBreakLength] = useState(5)
  const [isRunning, setIsRunning] = useState(false)
  const [work, setWork] = useState(true)
  const [timer, setTimer] = useState(1500)
  const [display, setDisplay] = useState("work")

  let minutes
  let seconds


  useEffect(() => {
    if(isRunning){
      const id = setInterval(() => {
        setTimer(timer => timer-1);
      }, 1000);
      return () => clearInterval(id);
    }
    else{
    }
  }, [isRunning, work])

  useEffect(() => {
    if(timer===0){
      if(work){
        setWork(false)
        setDisplay("break")
      }
      else{setWork(true)
      setDisplay("work")
      }
    }
  }, [timer])

  useEffect(() => {
    if(!work){
      setTimer(breakLength*60)
      console.log('time for a break')
    }
    else{
      setTimer(sessionLength*60)
    }
  },[work])

 
  return (
    <div className={`app pomodoro-wrapper ${display}`}>
    <div id="pomodoro">
      <div>
        {
          work && isRunning
          ? <h1>Time to work!</h1>
          : sessionLength*60 === timer 
          ? <h1>Welcome to Pomodoro!</h1>
          : <h1>Let's take a short break</h1>
        }
      </div>
        <div className="timer-circle" id='timer'>
          <h3 className="time">
            {`${minutes = Math.floor(timer/60) <10? '0' + Math.floor(timer/60) : Math.floor(timer/60)} : ${seconds = timer%60 < 10 ? '0' + timer%60 : timer%60}`}
          </h3>
        </div>

        <div className="buttons">
          {isRunning
            ? 
            <button className="play-pause" onClick={() => setIsRunning(false)}>
              <FaPause />
            </button>
            :
            <button className="play-pause" onClick={() => setIsRunning(true)}>
              <FaPlay />
            </button>
          }
          <button className ="reset" onClick={() =>{
            setIsRunning(false)
            setTimer(1500)
          }}>
            <FaUndo />
          </button>
        </div>

      <div id="settings">
      <div className="work-time">
        <h3>Work time</h3>
        <div className="adjust">
          <span className="increment" onClick={() => {
            setTimer(timer + 60)
            setSessionLength(sessionLength + 1)
            }}>
            <FaArrowCircleUp />
          </span>
          <p>
            {
            `${sessionLength}:00`
            }
          </p>
          <span className="decrement" onClick={() => {
            if(sessionLength>1){
            setTimer(timer - 60)
            setSessionLength(sessionLength - 1)
            }
              else{}
            }}>
            <FaArrowCircleDown />
          </span>
        </div>
      </div>
      <div className="break-time">
        <h3>Break time</h3>
        <div className="adjust">
          <span className="increment" onClick={() => setBreakLength(breakLength + 1)}>
            <FaArrowCircleUp />
          </span>
          <p>
          {
            `${breakLength < 10 ? '0' + breakLength : breakLength}:00`
            }
          </p>
          <span className="decrement" onClick={() => {
              if(breakLength>1){
                setBreakLength(breakLength - 1)}}}>
            <FaArrowCircleDown />
          </span>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
}

export default App;
