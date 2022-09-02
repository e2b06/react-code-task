import React from "react";
import "./styles/main.scss";
import { SideMenu } from "./components/SideMenu";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      <h1>Welcome to React Router!</h1>
      <SideMenu />
    </div>
  );
}

export default App;
