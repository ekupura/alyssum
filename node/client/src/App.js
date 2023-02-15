import React, { useState } from 'react';
import './App.css';
import Heatmap from "./Heatmap";
import ClusterNumber from "./ClusterNumber";

function App() {
  const [clusterSize, setClusterSize] = useState('');
  const [result, setResult] = useState();

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, */*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({size: clusterSize}),
  };

  console.log(requestOptions)

  const url = "/clustering";
  const GetClusteringResults = (e) => {
    setClusterSize(e.target.value)
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setResult(data))
  };

  return (
    <div>
      <div className="flex">
        <div className="flex-none w-32 p-10">
          TEST-v2
        </div>
        <div className="flex-none p-10 ...">
          <div className="flex flex-col h-24">
            <div className="flex">
              <div className="flex flex-none w-64 h-24">
                <input type="range" name="range1" min="10" max="30" onChange={GetClusteringResults} />
              </div>
              <div className="flex-initial w-64 ...">
                cluster_size={clusterSize}
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-none w-32 h-32">
                {result && <ClusterNumber result={result}/>}
              </div>
              <div className="flex-initial w-256 ...">
                {result && <Heatmap result={result}/>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
