import { useRoutes } from "react-router-dom";
import { routes } from "./routes"; // or use Vite's alias to simplify import path for nested components
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { getClient } from "./queryClient";
import { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { Theme } from "./style/them";
import GlobalStyle from "./style/globalStyle";

const App = () => {
  const element = useRoutes(routes);
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <QueryClientProvider client={getClient}>
        {element}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
