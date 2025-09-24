
import React from 'react';

const LoadingSpinner: React.FC<{ size?: string }> = ({ size = 'h-8 w-8' }) => {
  return (
    <div className={`animate-spin rounded-full border-4 border-slate-700 border-t-sky-400 ${size}`} />
  );
};

export default LoadingSpinner;
