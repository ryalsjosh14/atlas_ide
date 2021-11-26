import * as React from 'react';
import './progressBarStyles.css';
export var ProgressBar =  ({width, percent}) => {
  
    let progress = percent * width;
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
      setValue(percent * width);
    });
    return (
      <div className="progress-div" style={{width: width}}>
           <div style={{width: `${progress}px`}}className="progress"/>
      </div>
    )
}