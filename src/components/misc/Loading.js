import React, { useState, useEffect } from 'react';
import './Loading.css';

const Loading = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotCycler = setTimeout(() => {
      const newDots = dots === '...' ? '' : dots + '.';
      setDots(newDots)
    }, 500)
    return () => {
      clearTimeout(dotCycler)
    }
  }, [dots])


  return (
    <div className='loading'>
      LOADING{dots}
    </div>
  )
}

export default Loading;
