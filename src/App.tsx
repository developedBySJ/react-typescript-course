import { useRoutes } from "raviger";
import React, { useState } from "react";
import { AppContainer } from "./components/AppContainer";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { ListForms } from "./components/ListForms";
import { routes } from "./Router/routes";

function App() {
  const routeResult = useRoutes(routes);

  return <AppContainer>{routeResult}</AppContainer>;
}

export default App;
