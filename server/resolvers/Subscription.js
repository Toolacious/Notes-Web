export const Subscription = {
    message: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator("message");
        },
    },
    note: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator("note");
        },
    },
    errors: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator("errors");
        },
    },
};
