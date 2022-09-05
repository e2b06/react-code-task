import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//  styles
import "./styles/main.scss";

//  components
import { ContactList } from "./components/ContactList";
import { Error } from "./components/Error";
import { ContactDetail } from "./components/ContactDetail";

//  Page
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="contact" element={<ContactList />} />

            <Route path="contact/:id" element={<ContactDetail />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
