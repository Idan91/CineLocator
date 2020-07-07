import React from "react";
import ContextProvider from "./context/Context";
import CineLocator from "./components/CineLocator";

const App = () => {
  return (
    <ContextProvider>
      <CineLocator />
    </ContextProvider>
  );
};

export default App;
