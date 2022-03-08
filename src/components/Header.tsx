import { ActiveLink, Link } from "raviger";
import React from "react";
import logo from "../logo.svg";

const navigation = [
  {
    name: "Home",
    path: "/",
  },
];

export const Header: React.FC = () => {
  return (
    <div className="flex gap-2 items-center my-4">
      <img
        className="h-16 w-16"
        src={logo}
        alt="logo"
        style={{ animation: "spin 2s infinite linear" }}
      />
      <div className="flex gap-2">
        {navigation.map(({ name, path }, i) => (
          <ActiveLink
            key={i}
            href={`${path}`}
            className="text-center text-lg"
            exactActiveClass="text-blue-500"
          >
            {name}
          </ActiveLink>
        ))}
        <ActiveLink
          href={`/forms`}
          className="text-center text-lg"
          activeClass="text-blue-500"
        >
          Forms
        </ActiveLink>
      </div>
    </div>
  );
};
