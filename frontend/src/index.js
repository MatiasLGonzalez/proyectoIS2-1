import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="dev-bg7tosd2.us.auth0.com"
    clientId="NDaiadS9ELFv44LNSoGHpSX94CxurV2J"
    redirectUri={"http://localhost:3000/"}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
