import React from "react";

export const AppContainer: React.FC = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen text-white py-8">
      {children}
    </div>
  );
};
