import React, { useState, useEffect } from 'react';
import './HeaderRow.css';

function HeaderRow({ isLoading = false, onLoadComplete }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);

      // Временно работает по интервалу, чтобы было видно работу
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 6 + 2;
          if (newProgress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              if (onLoadComplete) {
                onLoadComplete();
              }
            }, 500);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
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