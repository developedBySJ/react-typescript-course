import React from "react";

export const AppContainer: React.FC = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-screen text-white">
      {children}
    </div>
  );
};
