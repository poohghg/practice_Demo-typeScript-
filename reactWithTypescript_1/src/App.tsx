import RouterApp from "./RouterApp";
import { ThemeProvider } from "styled-components";
import { Theme, dark, light } from "./style/them";
import { QueryClientProvider } from "react-query";
import { getClient } from "./queryClient";

function App() {
  const queryClient = getClient();
  return (
    <ThemeProvider theme={Theme}>
      <QueryClientProvider client={queryClient}>
        <RouterApp />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
