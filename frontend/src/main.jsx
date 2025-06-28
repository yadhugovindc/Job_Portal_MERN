import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./contextApi/AppContext.jsx";



const AppWrapper = () => {
  
  return (
      <AppProvider>
      <App />
      </AppProvider>
    
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <AppWrapper />
  </>
);
