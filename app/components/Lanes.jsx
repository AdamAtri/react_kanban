import React from 'react';
import Lane from './Lane';

export default ({lanes}) => (
  <div className="lanes">{lanes.map(lane => {
    if (lane && lane.id) return <Lane className="lane" key={lane.id} lane={lane} />
  })}</div>
)
