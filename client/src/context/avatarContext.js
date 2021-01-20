import { createContext } from "react";

const AvatarContext = createContext({
    avatar: String,
    setAvatar: () => {},
});

export { AvatarContext };
