import { navigate, useFullPath, useRoutes } from "raviger";
import React, { useEffect, useState } from "react";
import { request } from "./api/request";
import { AppContainer } from "./components/AppContainer";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { ListForms } from "./components/ListForms";
import { routes } from "./Router/routes";
import { GlobalProvider, initialGlobal } from "./utils/currentUser.context";

function App() {
  const routeResult = useRoutes(routes);
  const path = useFullPath();
  const [global, setGlobal] = useState(initialGlobal.state);
  const refreshToken = async () => {
    const refresh = localStorage.getItem("REFRESH_TOKEN");
    // try {
    //   const { access } = await request("/token/refresh", "POST", { refresh });
    //   localStorage.setItem("TOKEN", access);
    // } catch (error) {
    //   localStorage.removeItem("TOKEN");
    //   localStorage.removeItem("TOKEN");
    //   navigate("/login");
    // }
  };

  useEffect(() => {
    let timer = setInterval(refreshToken, 1000 * 60 * 5);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const refresh = localStorage.getItem("TOKEN");
    if (!refresh && path !== "/login") {
      navigate("/login");
      return;
    }
  }, [path]);
  return (
    <GlobalProvider value={{ setState: setGlobal, state: global }}>
      <AppContainer>{routeResult}</AppContainer>
    </GlobalProvider>
  );
}

export default App;
