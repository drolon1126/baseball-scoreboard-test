import React, {useState, useEffect} from 'react';

const BasesGrid = props => {
  const [emptyBase] = useState(
    <div style={{transform:'rotate(-45deg)', backgroundColor:'khaki',margin:'0 10px', lineHeight:'40px', height:'40px', width:'40px', border:'1px solid red', textAlign:'center'}} >
      <p style={{background:'none', transform:'rotate(45deg)', margin:'0'}}>[---]</p>
    </div>
  );
  const [filledBase] = useState(
    <div style={{transform:'rotate(-45deg)', backgroundColor:'yellow',margin:'0 10px', lineHeight:'40px', height:'40px', width:'40px', border:'1px solid red', textAlign:'center'}}>
      <p style={{background:'none', transform:'rotate(45deg)', margin:'0'}}>[-X-]</p>
    </div>
  );

  const [firstBase,setFirstBase] = useState(emptyBase);
  const [secondBase,setSecondBase] = useState(emptyBase);
  const [thirdBase,setThirdBase] = useState(emptyBase);

  useEffect(()=>{
    if(props.baseArray[0]){
      setFirstBase(filledBase);
    } else {
      setFirstBase(emptyBase);
    }

    if(props.baseArray[1]){
      setSecondBase(filledBase);
    } else {
      setSecondBase(emptyBase);
    }

    if(props.baseArray[2]){
      setThirdBase(filledBase);
    } else {
      setThirdBase(emptyBase);
    }

  },[props.baseArray])
  

  return(
    <div>
      <h2>Field</h2>
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', backgroundColor:'black', width:'140px', height:'140px', margin:'20px auto'}}>
      <div style={{margin:'-10px 0'}}>
        {secondBase}
      </div>
      <div style={{display:'flex',margin:'0'}}>
        {thirdBase}
        {firstBase}
      </div>
    </div>
    </div>
  );
}

export default BasesGrid;