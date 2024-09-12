import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import store from "./services/store.ts";
import { Provider } from "react-redux";
import "./index.sass";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
