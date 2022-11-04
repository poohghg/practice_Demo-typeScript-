import RouterApp from "./RouterApp";
import { ThemeProvider } from "styled-components";
import { Theme, dark, light } from "./style/them";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <RouterApp />
    </ThemeProvider>
  );
}

export default App;
