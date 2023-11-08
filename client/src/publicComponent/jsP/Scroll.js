import React from 'react';

const Scroll = (props) => {
  return( 
    <div style={{overflowY: 'scroll', height:'auto'}}>
      {props.children}
    </div>	
  );
}

export default Scroll;