import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";

import App from "./app";
import { store } from "@/store/store";

import './main.scss'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ToastContainer
      position="top-right"
      hideProgressBar={false}
      newestOnTop={false}
      autoClose={3000}
      closeOnClick={true}
      limit={3}
      rtl={false}
      draggable={false}
      pauseOnHover
      theme="dark"
    />
  </StrictMode>
);
