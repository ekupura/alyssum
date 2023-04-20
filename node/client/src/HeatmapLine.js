import React from 'react';

export function HeatmapLine(props) {
  const Render = (token, color) => {
    return token.map((t, jdx) => {
      return <span className="text-sm" style={{backgroundColor: color[jdx]}}>{t}</span>
    });
  }

  // {data ? <div>{data.cluster}</div> : <button onClick={GetData}>データを取得</button>}
  // {data ? <div>Hello?, {data.cluster} </div> : <div> none </div>}
  // {data && <div>{data.cluster}</div>}
  return (
      <div>
        {props && <div>{Render(props.token, props.color)}</div>}
      </div>
  );
}

export default HeatmapLine;