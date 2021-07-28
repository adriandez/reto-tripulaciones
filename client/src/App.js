import { BrowserRouter } from "react-router-dom";

import Main from "../src/components/Main";

import "./App.scss";
 
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Main />
      
      </BrowserRouter>
    </>
  );
};

export default App;
