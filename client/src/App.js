import React from "react";
import { useState } from "react";
import Todolist from "./Todolist";
import Login from "./Login";

const App = () => {
  const [login, setLogin] = useState(false);

  return login ? <Todolist setLogin={setLogin} /> : <Login style={{ fontFamily: "Poppins, Sans-serif" }} setLogin={setLogin} />;
};

export default App;
