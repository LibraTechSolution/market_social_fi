import React, { useState } from 'react';

const Children = ({ setCount }: { setCount: any }) => {
  return (
    <div className="parent">
      <p>Children</p>
      <button onClick={() => setCount(1)}>1</button>
      <button onClick={() => setCount(2)}>2</button>
      <button onClick={() => setCount(3)}>3</button>
    </div>
  );
};

export default Children;
