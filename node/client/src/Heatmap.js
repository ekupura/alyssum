import React, { useState, useEffect } from 'react';
import HeatmapLine from "./HeatmapLine";

export function Heatmap(props) {
  const [slice, setSlice] = useState(true);

  const changeValue = () => {
    setSlice(!slice)
  }

  const Render = () => {
    const heatmap = 
      props.result.cluster.map((c, idx) => {
        if (c !== props.number) {
          return 0
        } else {
          return (
            <div onClick={changeValue}>
              <p><HeatmapLine token={props.result.token[idx]} color={props.result.color[idx]}/></p>
            </div>
          );
        }
      }).filter(e => e);
    if (slice) {
      return heatmap.slice(0, 3);
    } else {
      return heatmap;
    }
  }

  return (
      <div>
        {props && <div>{Render()}</div>}
      </div>
  );
}

export default Heatmap;