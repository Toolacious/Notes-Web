const { registerValidate } = require("../validation");
const { loginValidate } = require("../validation");
const { genSalt, compare, hash } = require("bcryptjs");
const { sendRefreshToken } = require("../sendRefreshToken");
const { createRefreshToken, createAccessToken } = require("../auth");

const Mutation = {
    createUser: async (parent, args, { User, Notes }, info) => {
        try {
            // validate
            const { error } = registerValidate(args.data);
            if (error) {
                throw new Error(error.details[0].message);
            }
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
            const notes = new Notes({
                email: user.email,
                notes: [],
            });
            await notes.save();
            return saveMessage;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    login: async (parent, args, { response, User, Notes }, info) => {
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
            if (!validPassword) throw new Error("Password is invalid");

            // login successful
            sendRefreshToken(response, createRefreshToken(user));
            return {
                accessToken: createAccessToken(user),
                userId: user.id,
                name: user.name,
                email: user.email,
            };
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    logout: async (parent, args, { response }, info) => {
        console.log("Logout ing....");
        sendRefreshToken(response, "");

        return true;
    },

    upload: async (parent, { id, picture }, { User }, info) => {
        const user = await User.findOne({ _id: id });
        user.set({ img: picture });
        await user.save();
        return true;
    },
    createNote: async (parent, args, { Notes }, info) => {
        try {
            const { email, title, markdown, tags, links } = args.data;
            const notes = await Notes.findOne({ email });
            notes.notes.push({
                title,
                markdown,
                tags,
                links,
            });
            const update = await notes.save();
            return update.notes[update.notes.length - 1];
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    updateNote: async (parent, args, { Notes }, info) => {
        try {
            const { id, email, title, markdown, links } = args.data;
            const notes = await Notes.findOne({ email });
            if (markdown) {
                notes.notes.id(id).set({ markdown, links });
            } else {
                notes.notes.id(id).set({ title });
            }
            await notes.save();
            return true;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    deleteNote: async (parent, { id, email }, { Notes }, info) => {
        try {
            const notes = await Notes.findOne({ email });
            notes.notes.id(id).remove();
            await notes.save();
            return true;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    addtag: async (parent, { email, id, tag }, { Notes }, info) => {
        try {
            const notes = await Notes.findOne({ email });
            const note = notes.notes.id(id);
            note.tags.push(tag);
            await notes.save();
            return true;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    deletetag: async (parent, { index, email, id }, { Notes }, info) => {
        try {
            const notes = await Notes.findOne({ email });
            const note = notes.notes.id(id);
            note.tags.splice(index, 1);
            await notes.save();
            return true;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
};
module.exports.Mutation = Mutation;
