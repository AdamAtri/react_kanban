import React from 'react';

export defult ({lane, ...props}) => (
  <div {...props}>{lane.name}</div>
)
