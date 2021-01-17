import { verify } from "jsonwebtoken";

export const Query = {
    users: async (parent, args, { User }, info) => {
        try {
            if (!args.query) {
                const data = await User.find({});
                console.log(data);
                return data;
            }
            const data = User.find({ name: { $regex: args.query } });
            return data;
        } catch (err) {
            console.log(err);
        }
    },
    user: async (parent, args, { User }, info) => {
        try {
            if (!args.query) {
                const data = null;
                return data;
            }
            const data = await User.find({ _id: args.query });
            if (data) console.log(data[0].name + " welcome!");
            return data[0];
        } catch (err) {
            console.log(err);
        }
    },
};
