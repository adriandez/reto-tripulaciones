import { BrowserRouter } from "react-router-dom";

import Header from "../src/components/Header";
import Main from "../src/components/Main";
import Footer from "../src/components/Footer";

import "./App.scss";

const App = () => {
  return (
    <>
      <BrowserRouter>
 
        <Main />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
