import React from "react";
import { Header } from "./Header";

export const AppContainer: React.FC = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen text-white py-8">
      <div className="w-full max-w-md px-4 rounded-2xl bg-gray-900 pb-4">
        <Header />
        {children}
      </div>
    </div>
  );
};
