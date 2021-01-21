import { gql } from "apollo-boost";

export const ADDNOTE_Mutation = gql`
    mutation createNote(
        $email: String!
        $title: String!
        $markdown: String!
        $tags: [String]!
        $links: [String]!
    ) {
        createNote(
            data: {
                email: $email
                title: $title
                markdown: $markdown
                tags: $tags
                links: $links
            }
        ) {
            id
            tags
            title
            markdown
            links
        }
    }
`;
