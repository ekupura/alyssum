import React, { useState, useEffect } from 'react';
import './App.css';
import Heatmap from "./Heatmap";
import Image from "./Image";


export function Inbox(props){
  const [result, setResult] = useState();
  const [clusterSize, setClusterSize] = useState(10);
  const [mask, setMask] = useState(false);
  const [term, setTerm] = useState('A');
  const [question, setQuestion] = useState('Y14_1213');
  const [setting, setSetting] = useState('Y14_1213_A_R');
  const [files, setFiles] = useState(['']);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json, */*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      'size': clusterSize,
      'setting': setting,
      'mask': mask,
    }),
  };
  const requestFileOptions = {
    method: 'GET',
    headers: {
      'Accept': 'application/json, */*',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  useEffect(() => {
    fetch("/file", requestFileOptions)
      .then(response => response.json())
      .then(data => setFiles(data.file))
  }, []);

  const url = "/distance";
  const GetClusteringResults = (e) => {
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => setResult(data))
  };

  const GetClusterSize = (e) => {
    setClusterSize(e.target.value)
  };

  const SetMask = (e) => {
    setMask(!mask)
  };

  const HeatmapList = () => {
    const list = [];
    console.log(result)
    for (let idx = 0; idx < result.max; idx++) {
      list.push(
        <div className="col-span-3 bg-white border border-gray-300">
          <div className="p-2">
            <Heatmap result={result} number={idx + 1}/>
          </div>
        </div>
      );
    }
    return list;
  };

  const FileList = () => {
    return files.map(f => (
      <button className="flex items-center flex-shrink-0 h-10 px-2 text-sm font-medium rounded hover:bg-gray-300" onClick={() => setSetting(f)} key={f}>
        {f}
      </button>
    ))
  }

  return (
    <div className="flex w-screen h-screen text-gray-700">
      {/* Component Start */}
      <div className="flex flex-col items-center w-16 pb-4 overflow-auto border-r border-gray-300">
        <a
          className="flex items-center justify-center flex-shrink-0 w-full h-16 bg-gray-300"
          href="#"
        >
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </a>
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-col h-16 w-auto">
          <div className="flex items-center flex-shrink-0 h-16 px-8 border-b border-gray-300">
            <h1 className="text-lg font-medium">{setting}</h1>
            <input type="range" className="flex items-center justify-center h-10 w-32 px-4 ml-auto text-sm font-medium rounded hover:bg-gray-300"
              min="2" max="30" onChange={GetClusterSize} />
            <div className="flex items-center justify-center h-10 w-48 px-4 ml-2 text-sm font-medium bg-white">
              Cluster size = {clusterSize}
            </div>
            {/*
            <div className="flex">
              <div className="w-72">
                <input type="text" value={setting} onChange={(e) => setSetting(e.target.value)} />
              </div>
            </div>
            */}
            <button className="flex items-center justify-center h-10 w-48 px-4 ml-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
              onClick={SetMask}>
              Justification Cue
            </button>
            <button className="flex items-center justify-center h-10 w-32 px-4 ml-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
              onClick={GetClusteringResults}>
              実行
            </button>
          </div>
        </div>
        <div className="flex flex-row h-full">
          <div className="flex flex-col w-56 border-r border-gray-300">
            <div className="flex flex-col flex-grow p-4 overflow-auto">
              {FileList()}
            </div>
          </div>
          <div className="flex flex-col w-screen overflow-auto">
            <div className="flex flex-row h-auto bg-gray-0 p-6">
              {/*
              <div className="flex-1">
                {result && <Image endpoint="tsne" setting={setting}/>}
              </div>
              */}
              <div className="flex-1">
                {result && <Image endpoint="dendrogram" setting={setting} size={clusterSize}/>}
              </div>
            </div>
            <div className="flex-grow p-6 bg-gray-200">
              <div className="grid grid-cols-3 gap-6">
                {result && HeatmapList()}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Component End  */}
    </div>
  );
}
