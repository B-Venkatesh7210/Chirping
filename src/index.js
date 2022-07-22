import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./home.css";
import { MoralisProvider } from "react-moralis";

import { BrowserRouter } from "react-router-dom";

const serverUrl = "https://odzn6qu9o4zo.usemoralis.com:2053/server";
const appId = "DhIkCD6RgzXux1tHt61zUUfy05Qw6YDg7P4F77TI";

ReactDOM.render(
  <BrowserRouter>
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <App />
    </MoralisProvider>
  </BrowserRouter>,

  document.getElementById("root")
);
