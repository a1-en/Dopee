import React from 'react';

export const Toaster = ({ children }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      {children}
    </div>
  );
};
