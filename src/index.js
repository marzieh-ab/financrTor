
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// import { ApolloProvider } from "@apollo/client";
import CustomApolloProvider from "./ApolloClient";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CustomApolloProvider>
      <Router>
        <App />
      </Router>
    </CustomApolloProvider>
  </React.StrictMode>
);