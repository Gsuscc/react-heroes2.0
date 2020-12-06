import React, { useState } from 'react';
import './Loading.css';

const Loading = () => {
  const [dots, setDots] = useState('');

  setTimeout(() => {
    const newDots = dots === '...' ? '' : dots + '.';
    setDots(newDots)
  }, 500)

  return (
    <div className='loading'>
      LOADING{dots}
    </div>
  )
}

export default Loading;
