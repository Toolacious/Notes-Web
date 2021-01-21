import { createContext } from "react";

const filecontext = createContext({
  usernotes: [],
  openFiles: [],
  currentOpenFile: "",
  setcurrentOpenFile: (data) => {},
  setuserNotes: (data) => {},
  setopenFiles: (data) => {},
  actions: null,
});

export { filecontext };
