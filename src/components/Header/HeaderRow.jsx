import React, { useState, useEffect } from 'react';
import './HeaderRow.css';

function HeaderRow({ isLoading = false, onLoadComplete }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      if (onLoadComplete) onLoadComplete();
      return;
    }

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + Math.random() * 6 + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }, 50);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="header-row-wrapper">
      <div 
        className="header-row" 
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );
}

export default HeaderRow;