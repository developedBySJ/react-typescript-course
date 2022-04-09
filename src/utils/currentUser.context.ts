import React from "react";

interface InitialGlobalState {
  user: {
    username: string;
    name: string;
  };
}
interface InitialGlobal {
  state: InitialGlobalState;
  setState: React.Dispatch<React.SetStateAction<InitialGlobalState>>;
}

export const initialGlobal: InitialGlobal = {
  state: { user: { username: "", name: "" } },
  setState: () => {},
};

export const globalContext = React.createContext(initialGlobal);

export const GlobalProvider = globalContext.Provider;
