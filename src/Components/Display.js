import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import BasesGrid from './BasesGrid';

const Display = props => {
  const [balls, setBalls] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [outs, setOuts] = useState(0);
  const [runsHome, setRunsHome] = useState(0);
  const [runsAway, setRunsAway] = useState(0);
  const [inning, setInning] = useState(1);
  const [bottomOrTop, setBottomOrTop] = useState(0); //0 is the top half of the inning 1 is the bottom
  const [baseArray, setBaseArray] = useState([false, false, false]);
  const [inningHalf, setInningHalf] = useState(<p>Top</p>);
  const [home, setHome] = useState(<h2 style={{textDecoration:'underline'}}>Home</h2>);
  const [guest, setGuest] = useState(<h2>Guest</h2>);

  const resetCount = () => {
    setBalls(0);
    setStrikes(0);
  }

  const changeHalf = () => {
    setBaseArray([false, false, false]);
    if (bottomOrTop === 0) {
      setBottomOrTop(1)
    } else {
      setBottomOrTop(0);
      setInning(inning + 1);
    }
  }

  const addOut = () => {
    resetCount();
    if (outs < 2) {
      setOuts(outs + 1)
    } else if (outs === 2) {
      setOuts(0);
      changeHalf();
    }
  }

  const playerOut = (player) => {
    let tmpArr = [];
    switch (player) {
      case 'first':
        tmpArr = baseArray.map((base, i) => {
          if (i === 0) {
            if (base === true) {
              addOut();
            }
            return false;
          } else {
            return base;
          }
        });
        break;
      case 'second':
        tmpArr = baseArray.map((base, i) => {
          if (i === 1) {
            if (base === true) {
              addOut();
            }
            return false;
          } else {
            return base;
          }
        });
        break;
      case 'third':
        tmpArr = baseArray.map((base, i) => {
          if (i === 2) {
            if (base === true) {
              addOut();
            }
            return false;
          } else {
            return base;
          }
        });
        break;
    }
    setBaseArray(tmpArr);
  }

  const addBall = () => {
    if (balls < 3) {
      setBalls(balls + 1);
    } else {
      resetCount();
    }
  }

  const addStrike = () => {
    if (strikes < 2) {
      setStrikes(strikes + 1);
    } else {
      addOut();
    }
  }

  const addFoul = () => {
    if (strikes < 2) {
      addStrike();
    }
  }

  const addRun = (amount = 1) => {
    if (bottomOrTop === 0) {
      setRunsHome(runsHome + amount);
    } else {
      setRunsAway(runsAway + amount);
    }
  }

  const advanceAllRunners = (hitType) => {
    console.log('current bases: ', baseArray);
    var tmp = baseArray.join(',');
    switch (hitType) {
      case 'single':
        switch (tmp) {
          case [false, false, false].join(','):
            setBaseArray([true, false, false]);
            break;
          case [true, false, false].join(','):
            setBaseArray([true, true, false]);
            break;
          case [false, true, false].join(','):
            setBaseArray([true, true, false]);
            break;
          case [false, false, true].join(','):
            setBaseArray([true, false, true]);
            break;
          case [true, true, false].join(','):
            setBaseArray([true, true, true]);
            break;
          case [true, false, true].join(','):
            setBaseArray([true, true, true]);
            break;
          case [false, true, true].join(','):
            setBaseArray([true, true, true]);
            break;
          case [true, true, true].join(','):
            addRun();
            break;
        }
        break;
      case 'double':
        switch (tmp) {
          case [false, false, false].join(','):
            setBaseArray([false, true, false]);
            break;
          case [true, false, false].join(','):
            setBaseArray([false, true, true]);
            break;
          case [false, true, false].join(','):
            setBaseArray([false, true, true]);
            break;
          case [false, false, true].join(','):
            setBaseArray([false, true, true]);
            break;
          case [true, true, false].join(','):
            setBaseArray([false, true, true]);
            addRun();
            break;
          case [true, false, true].join(','):
            setBaseArray([false, true, true]);
            addRun();
            break;
          case [false, true, true].join(','):
            setBaseArray([false, true, true]);
            addRun();
            break;
          case [true, true, true].join(','):
            setBaseArray([false, true, true]);
            addRun(2);
            break;
        }
        break;
      case 'triple':
        switch (tmp) {
          case [false, false, false].join(','):
            break;
          case [true, false, false].join(','):
            addRun();
            break;
          case [false, true, false].join(','):
            addRun();
            break;
          case [false, false, true].join(','):
            addRun();
            break;
          case [true, true, false].join(','):
            addRun(2);
            break;
          case [true, false, true].join(','):
            addRun(2);
            break;
          case [false, true, true].join(','):
            addRun(2);
            break;
          case [true, true, true].join(','):
            addRun(3);
            break;
        }
        setBaseArray([false, false, true]);
        break;
      case 'homerun':
        switch (tmp) {
          case [false, false, false].join(','):
            addRun();
            break;
          case [true, false, false].join(','):
            addRun(2);
            break;
          case [false, true, false].join(','):
            addRun(2);
            break;
          case [false, false, true].join(','):
            addRun(2);
            break;
          case [true, true, false].join(','):
            addRun(3);
            break;
          case [true, false, true].join(','):
            addRun(3);
            break;
          case [false, true, true].join(','):
            addRun(3);
            break;
          case [true, true, true].join(','):
            addRun(4);
            break;
        }
        setBaseArray([false, false, false]);
        break;
      case 'stealSecond':
        if (baseArray[0]) {
          switch (tmp) {
            case [true, false, false].join(','):
              setBaseArray([false, true, false]);
              break;
            case [true, true, false].join(','):
              setBaseArray([false, true, true]);
              break;
            case [true, false, true].join(','):
              setBaseArray([false, true, true]);
              break;
            case [true, true, true].join(','):
              setBaseArray([false, true, true]);
              addRun();
              break;
          }
        }
        break;
      case 'stealThird':
        if (baseArray[1]) {
          switch (tmp) {
            case [false, true, false].join(','):
              setBaseArray([false, false, true]);
              break;
            case [true, true, false].join(','):
              setBaseArray([true, false, true]);
              break;
            case [false, true, true].join(','):
              setBaseArray([false, false, true]);
              addRun();
              break;
            case [true, true, true].join(','):
              setBaseArray([true, false, true]);
              addRun();
              break;
          }
        }
        break;
      case 'stealHome':
        if (baseArray[2]) {
          addRun();
          switch (tmp) {
            case [false, false, true].join(','):
              setBaseArray([false, false, false]);
              break;
            case [true, false, true].join(','):
              setBaseArray([true, false, false]);
              break;
            case [false, true, true].join(','):
              setBaseArray([false, true, false]);
              break;
            case [true, true, true].join(','):
              setBaseArray([true, true, false]);
              break;
          }
        }
        break;
    }
  }

  useEffect(() => {
    if (bottomOrTop === 0) {
      setInningHalf(<p>Top</p>);
      setHome(<h2 style={{textDecoration:'underline'}}>Home</h2>);
      setGuest(<h2 style={{textDecoration:'none'}}>Guest</h2>);
    } else {
      setInningHalf(<p>Bottom</p>);
      setHome(<h2 style={{textDecoration:'none'}}>Home</h2>);
      setGuest(<h2 style={{textDecoration:'underline'}}>Guest</h2>);
    }
  }, [bottomOrTop]);

  return (
    <div className='scoreboard'>
      <div className='score'>
        <div className='home scoreDisp'>
          {home}
          <p data-testid='runCountHome'>{runsHome}</p>
        </div>
        <div className='inning scoreDisp'>
          <div id='disp'>
            {inningHalf}
            <p data-testid='inningCount'>{inning}</p>
          </div>
          <h2>Inning</h2>
        </div>
        <div className='away  scoreDisp'>
          {guest}
          <p data-testid='runCountAway'>{runsAway}</p>
        </div>
      </div>
      <div className='count'>
        <div className='balls scoreDisp'>
          <h3>Balls:</h3>
          <p data-testid='ballCount'>{balls}</p>
        </div>
        <div className='strikes scoreDisp'>
          <h3>Strikes:</h3>
          <p data-testid='strikeCount'>{strikes}</p>
        </div>
        <div className='outs scoreDisp'>
          <h3>Outs:</h3>
          <p data-testid='outCount'>{outs}</p>
        </div>
      </div>
      <div>
        <BasesGrid baseArray={baseArray} />
      </div>
      <div>
        <Dashboard playerOut={playerOut} advanceRunners={advanceAllRunners} addOut={addOut} addFoul={addFoul} addStrike={addStrike} addBall={addBall} addHit={resetCount} addRun={addRun} />
      </div>
    </div>
  );
}

export default Display;