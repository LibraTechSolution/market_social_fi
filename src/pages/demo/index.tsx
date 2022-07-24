import React, { useState } from 'react';
import Children from './children';

const Parents = () => {
  const [count, setCount] = useState();

  return (
    <div className="parent">
      <p>Parent</p>
      <p>Count: {count}</p>
      <Children setCount={setCount} />
    </div>
  );
};

export default Parents;
