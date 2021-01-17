import { registerValidate } from "../validation";
import { loginValidate } from "../validation";
import { genSalt, compare, hash } from "bcryptjs";
import { sendRefreshToken } from "../sendRefreshToken";
import { createRefreshToken, createAccessToken } from "../auth";
import * as shortid from "shortid";
import { createWriteStream } from "fs";
import { NoteSchema } from "../model/Notes";

const storeUpload = async ({ stream }) => {
    const id = shortid.generate();
    const path = `images/${id}`;

    return new Promise((resolve, reject) =>
        stream
            .pipe(createWriteStream(path))
            .on("finish", () => resolve({ id, path }))
            .on("error", reject)
    );
};

const processUpload = async (upload) => {
    const { stream, filename } = await upload;
    const { id } = await storeUpload({ stream, filename });
    return id;
};

export const Mutation = {
    createUser: async (parent, args, { User, Notes, pubsub }, info) => {
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
            pubsub.publish("message", {
                message: {
                    mutation: "CREATED",
                    data: [saveMessage],
                },
            });
            return saveMessage;
        } catch (err) {
            console.log(err);
            return err;
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
    signS3: async (parent, { filename, filetype }, info) => {
        // AWS_ACCESS_KEY_ID
        // AWS_SECRET_ACCESS_KEY
        const s3 = new aws.S3({
            signatureVersion: "v4",
            region: "us-east-2",
        });

        const s3Params = {
            Bucket: s3Bucket,
            Key: filename,
            Expires: 60,
            ContentType: filetype,
            ACL: "public-read",
        };

        const signedRequest = await s3.getSignedUrl("putObject", s3Params);
        const url = `https://${s3Bucket}.s3.amazonaws.com/${filename}`;

        return {
            signedRequest,
            url,
        };
    },
    upload: async (parent, { picture }, info) => {
        const pictureUrl = await processUpload(picture);
        return true;
    },
    createNote: async (parent, args, { Notes, pubsub }, info) => {
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
            pubsub.publish("note", {
                note: {
                    mutation: "CREATED",
                    data: update.notes[update.notes.length - 1],
                },
            });
            return true;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    updateNote: async (parent, args, { Notes, pubsub }, info) => {
        try {
            const { id, email, title, markdown, tags, links } = args.data;
            const notes = await Notes.findOne({ email });
            notes.notes.id(id).set({ title, markdown, tags, links });
            await notes.save();
            pubsub.publish("note", {
                note: {
                    mutation: "UPDATED",
                    data: notes.notes.id(id),
                },
            });
            return true;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    deleteNote: async (parent, { id, email }, { Notes, pubsub }, info) => {
        try {
            const notes = await Notes.findOne({ email });
            notes.notes.id(id).remove();
            await notes.save();
            pubsub.publish("note", {
                note: {
                    mutation: "DELETED",
                    data: null,
                },
            });
            return true;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
};
