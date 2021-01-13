import { registerValidate } from "../validation";
import { loginValidate } from "../validation";
import { genSalt, compare, hash } from "bcryptjs";
import { sendRefreshToken } from "../sendRefreshToken";
import { createRefreshToken, createAccessToken } from "../auth";

export const Mutation = {
    createUser: async (parent, args, { User, pubsub }, info) => {
        try {
            // validate
            const { error } = registerValidate(args.data);
            if (error) throw new Error(error.details[0].message);
            // checking if email exist
            const emailExist = await User.findOne({ email: args.data.email });
            if (emailExist) throw new Error("Email already exist");

            //Hash password
            const salt = await genSalt(10);
            const hashedpsw = await hash(args.data.password, salt);

            const user = new User({
                fname: args.data.fname,
                lname: args.data.lname,
                name: args.data.name,
                email: args.data.email,
                password: hashedpsw,
            });
            const saveMessage = await user.save(); //when fail its goes to catch
            console.log(saveMessage.name + "'s data saved to WEB collection.");
            pubsub.publish("message", {
                message: {
                    mutation: "CREATED",
                    data: [saveMessage],
                },
            });
            return saveMessage;
        } catch (err) {
            console.log(err);
        }
    },
    clearMessages: async (parent, args, { User, pubsub }, info) => {
        try {
            if (args.query) await User.deleteMany({ name: args.query });
            else await User.deleteMany({});
            const leftMsg = await User.find({});
            pubsub.publish("message", {
                message: {
                    mutation: "DELETED",
                    data: leftMsg,
                },
            });
            return {
                mutation: "DELETED",
                name: args.query,
            };
        } catch (err) {
            console.log(err);
        }
    },
    login: async (parent, args, { response, User }, info) => {
        try {
            const { error } = loginValidate(args.data);
            if (error) throw new Error(error.details[0].message);

            // checking if email exist
            const user = await User.findOne({ email: args.data.email });
            if (!user) throw new Error("Email doesn't exist");

            // check password
            const validPassword = await compare(
                args.data.password,
                user.password
            );
            if (!validPassword) throw new Error("Invalid password");

            // login successful
            sendRefreshToken(response, createRefreshToken(user));

            return {
                accessToken: createAccessToken(user),
                id: user.id,
            };
        } catch (err) {
            console.log(err);
        }
    },
    logout: async (parent, args, { response }, info) => {
        console.log("Logout ing....");
        sendRefreshToken(response, "");

        return true;
    },
};
