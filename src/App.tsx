import { navigate, useFullPath, useRoutes } from "raviger";
import { Suspense, useEffect, useState } from "react";
import { AppContainer } from "./components/AppContainer";
import { Spinner } from "./components/Spinner";
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
      <AppContainer>
        <Suspense fallback={<Spinner />}>{routeResult}</Suspense>
      </AppContainer>
    </GlobalProvider>
  );
}

export default App;
