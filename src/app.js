import React from "react";
import Gallery from "./pages/gallery";
import Wrapper from "./components/wrapper";
import Header from "./components/header";



function App() {
  return (
    <div className="App">
      <Wrapper>
        <Header />
        <Gallery />
      </Wrapper>
    </div>
  );
}

export default App;