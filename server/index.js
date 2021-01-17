require("dotenv-defaults").config();
import { GraphQLServer, PubSub } from "graphql-yoga";
import { Query } from "./resolvers/Query";
import { Mutation } from "./resolvers/Mutations";
import { Subscription } from "./resolvers/Subscription";
import { User } from "./model/User";
import { Notes } from "./model/Notes";
import { createAccessToken, createRefreshToken } from "./auth";
import { sendRefreshToken } from "./sendRefreshToken";
import { verify } from "jsonwebtoken";
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const pubsub = new PubSub();
const server = new GraphQLServer({
    typeDefs: "./server/schema.graphql",
    resolvers: {
        Query,
        Mutation,
        Subscription,
    },
    context: (req) => ({ ...req, User, pubsub, Notes }),
});

server.express.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

server.express.use("/refresh_token", cookieParser());

server.express.post("/refresh_token", async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
        console.log("No token");
        return res.send({ ok: false, accessToken: "" });
    }

    let payload = null;
    try {
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
        console.log(payload);
    } catch (err) {
        console.log(err);
        return res.send({ ok: false, accessToken: "" });
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOne({ _id: payload.userId });

    if (!user) {
        console.log("No user");
        return res.send({ ok: false, accessToken: "" });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
        console.log("token version not right");
        return res.send({ ok: false, accessToken: "" });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
});

if (!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL!!!");
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
    console.error(error);
});

db.once("open", () => {
    console.log("MongoDB connected!");
    const PORT = process.env.port || 4000;

    server.start(
        {
            port: PORT,
            cors: { credentials: true, origin: ["http://localhost:3000"] },
        },
        () => {
            console.log(`Listening on http://localhost:${PORT}`);
        }
    );
});
