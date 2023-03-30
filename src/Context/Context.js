import { createContext, useState } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [data, setData] = useState(JSON.parse(window.localStorage.getItem("movideData")) || []);
  return <Context.Provider value={{ data, setData }}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
