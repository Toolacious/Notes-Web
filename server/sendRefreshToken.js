export const sendRefreshToken = (res, token) => {
    if (token) console.log("set cookie");
    else console.log("remove cookie");
    res.cookie("jid", token, {
        httpOnly: true,
        path: "/refresh_token",
    });
};
