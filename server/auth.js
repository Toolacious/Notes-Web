import { sign } from "jsonwebtoken";

export const createAccessToken = (user) => {
    return sign(
        { userId: user.id, email: user.email, name: user.name },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m",
        }
    );
};

export const createRefreshToken = (user) => {
    return sign(
        { userId: user.id, tokenVersion: user.tokenVersion },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d",
        }
    );
};
