import React from "react";
import logo from "./logo.svg";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex gap-2 items-center my-4">
      <img
        className="h-16 w-16"
        src={logo}
        alt="logo"
        style={{ animation: "spin 2s infinite linear" }}
      />
      <h1 className="text-center text-lg">{title}</h1>
    </div>
  );
};
