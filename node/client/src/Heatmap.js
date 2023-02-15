import React from 'react';
import HeatmapLine from "./HeatmapLine";

export function Heatmap(props) {
  const Render = (data) => {
    return data.cluster.map((value, idx) => {
      return <p><HeatmapLine token={data.token[idx]} color={data.color[idx]} idx={idx}/></p>
    });
  }

  // {data ? <div>{data.cluster}</div> : <button onClick={GetData}>データを取得</button>}
  // {data ? <div>Hello?, {data.cluster} </div> : <div> none </div>}
  // {data && <div>{data.cluster}</div>}
  return (
      <div>
        {props && <div>{Render(props.result)}</div>}
      </div>
  );
}

export default Heatmap;