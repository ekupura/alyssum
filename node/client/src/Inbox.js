import React, { useState } from 'react';
import './App.css';
import Heatmap from "./Heatmap";

export function Inbox(props){
  const [result, setResult] = useState();
  const [clusterSize, setClusterSize] = useState(10);
  const [mask, setMask] = useState(false);
  const [term, setTerm] = useState('A');
  const [question, setQuestion] = useState('Y14_1213');
  const [setting, setSetting] = useState('Y14_1213_A_2');

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

  const SetTerm = (selectTerm, e) => {
    setTerm(selectTerm)
  };

  const SetQuestion = (selectQuestion, e) => {
    setQuestion(selectQuestion)
  };

  const SetSetting = (selectSetting, e) => {
    setSetting(selectSetting)
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

  return (
    <>
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
          <a
            className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-300"
            href="#"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </a>
          <a
            className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-300"
            href="#"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </a>
          <a
            className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-300"
            href="#"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </a>
          <a
            className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-300"
            href="#"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </a>
          <a
            className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 rounded hover:bg-gray-300"
            href="#"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </a>
          <a
            className="flex items-center justify-center flex-shrink-0 w-10 h-10 mt-4 mt-auto rounded hover:bg-gray-300"
            href="#"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex items-center flex-shrink-0 h-16 px-8 border-b border-gray-300">
            <h1 className="text-lg font-medium">問題{setting}</h1>
            <input type="range" className="flex items-center justify-center h-10 w-32 px-4 ml-auto text-sm font-medium rounded hover:bg-gray-300"
                   min="2" max="30" onChange={GetClusterSize}/>
            <div className="flex items-center justify-center h-10 w-48 px-4 ml-2 text-sm font-medium bg-white">
              Cluster size = {clusterSize}
            </div>
            <div className="flex">
              <div className="w-72">
                <input type="text" value={setting} onChange={(e) => setSetting(e.target.value)}/>
              </div>
            </div>
            <button className="flex items-center justify-center h-10 w-48 px-4 ml-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
                    onClick={SetMask}>
              Justification Cue
            </button>
            <button className="flex items-center justify-center h-10 w-32 px-4 ml-2 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300"
                    onClick={GetClusteringResults}>
              実行
            </button>
            <button className="relative ml-2 text-sm focus:outline-none group">
              <div className="flex items-center justify-between w-10 h-10 rounded hover:bg-gray-300">
                <svg
                  className="w-5 h-5 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </div>
              <div className="absolute right-0 flex-col items-start hidden w-40 pb-1 bg-white border border-gray-300 shadow-lg group-focus:flex">
                <a
                  className="w-full px-4 py-2 text-left hover:bg-gray-300"
                  href="#"
                >
                  Menu Item 1
                </a>
                <a
                  className="w-full px-4 py-2 text-left hover:bg-gray-300"
                  href="#"
                >
                  Menu Item 1
                </a>
                <a
                  className="w-full px-4 py-2 text-left hover:bg-gray-300"
                  href="#"
                >
                  Menu Item 1
                </a>
              </div>
            </button>
          </div>
          <div className="flex-grow p-6 overflow-auto bg-gray-200">
            <div className="grid grid-cols-3 gap-6">
              {result && HeatmapList()}
            </div>
          </div>
        </div>
        {/* Component End  */}
      </div>
    </>
  );
}
