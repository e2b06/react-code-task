import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

// import { ContactList } from "./components/ContactList";
import { DummyComponent } from "./components/DummyComponent";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="contact" element={<DummyComponent title="contact" />} />
          <Route
            path="contact:id"
            element={<DummyComponent title="chaaracter" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
