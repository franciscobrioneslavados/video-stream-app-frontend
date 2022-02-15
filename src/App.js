import { useState } from "react";
import Index from "./components/Index";

function App() {
  const initialState = () => window.localStorage.getItem('isLoggedIn') || false;

  const [isLoggedIn, setLoggedIn ] = useState(initialState);

  return (
    <>
      <Index isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
    </>
  );
}

export default App;
