import React from 'react';

const Dashboard = props => {
  return (
    <>
    <div>
    <button onClick={(e)=>{
      e.preventDefault();
      props.addBall();
    }}>Ball</button>
    <button onClick={(e)=>{
      e.preventDefault();
      props.addFoul();
    }}>Foul</button>
    <button onClick={(e)=>{
      e.preventDefault();
      props.addStrike();
    }}>Strike</button>
    <button onClick={(e)=>{
      e.preventDefault();
      props.addOut();
    }}>Batter Out</button>
    </div>

    <div>
    <button onClick={(e)=>{
      e.preventDefault();
      props.addHit();
      props.advanceRunners('single');
    }}>Single</button>
    <button onClick={(e)=>{
      e.preventDefault();
      props.addHit();
      props.advanceRunners('double');
    }}>Double</button>
    <button onClick={(e)=>{
      e.preventDefault();
      props.addHit();
      props.advanceRunners('triple');
    }}>Tripple</button>
    <button onClick={(e)=>{
      e.preventDefault();
      props.addHit();
      props.advanceRunners('homerun');
    }}>Home Run</button>
    </div>

    <div>
    <button onClick={(e)=>{
      e.preventDefault();
      props.playerOut('first');
    }}>Runner on First Out</button>
    <button onClick={(e)=>{
      e.preventDefault();
      props.playerOut('second');
    }}>Runner on Second Out</button>
    <button onClick={(e)=>{
      e.preventDefault();
      props.playerOut('third');
    }}>Runner on Third Out</button>
    </div>

    <div>
    <button onClick={(e)=>{
      e.preventDefault();
      props.advanceRunners('stealSecond');
    }}>Steal Second</button>
    <button onClick={(e)=>{
      e.preventDefault();
      props.advanceRunners('stealThird');
    }}>Steal Third</button>
    <button onClick={(e)=>{
      e.preventDefault();
      props.advanceRunners('stealHome');
    }}>Steal Home</button>
    </div>
    </>
  );
}

export default Dashboard;