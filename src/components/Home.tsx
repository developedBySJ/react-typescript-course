import { Link, navigate } from "raviger";
import React, { useEffect } from "react";
import { AppContainer } from "./AppContainer";
import { Header } from "./Header";

export const Home = () => {
  useEffect(() => {
    navigate("/forms");

    return () => {};
  }, []);

  return <div className="mb-4"></div>;
};
