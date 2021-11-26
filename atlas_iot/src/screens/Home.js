import {ProgressBar} from '../components/progressBar';
import React, { useState } from 'react';

function Home() {
    const [percent,setPercent] = useState(0);
    return (
      <div className="App">
          <ProgressBar width={500} percent={percent}/>
        <button
            onClick={() => {setPercent({percent}+0.1)
                console.log(percent)}
                    }>
            Add 10%
            </button>
        <header className="App-header">
            Learns React
        </header>
        <div>
        </div>
      </div>
    );
  }

  export default Home;