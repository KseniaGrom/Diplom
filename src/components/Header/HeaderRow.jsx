import React, { useState, useEffect } from 'react';
import './HeaderRow.css';

function HeaderRow({ isLoading = false, onLoadComplete }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);

      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 95) {
            clearInterval(interval);
            return 95;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      if (onLoadComplete) onLoadComplete();
    }
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