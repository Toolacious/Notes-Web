import { createContext } from "react";

const filecontext = createContext({
  usernotes: [],
  openFiles: [],
  currentOpenFile: "",
  setcurrentOpenFile: () => {},
  setuserNotes: () => {},
  setopenFiles: () => {},
});

export { filecontext };
