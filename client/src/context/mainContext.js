import { String } from "core-js";
import { createContext } from "react";

const mainContext = createContext({
    mode: String,
    setMode: () => {},
    open: Boolean,
    setOpen: () => {},
    searchStr: String,
    setSearchStr: () => {},
    guide: String,
});

export { mainContext };
