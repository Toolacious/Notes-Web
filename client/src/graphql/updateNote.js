import { gql } from "apollo-boost";

export const UPDNOTE_Mutation = gql`
    mutation updateNote(
        $id: String!
        $email: String!
        $title: String
        $markdown: String
        $tags: [String]
        $links: [String]
    ) {
        updateNote(
            data: {
                id: $id
                email: $email
                title: $title
                markdown: $markdown
                tags: $tags
                links: $links
            }
        )
    }
`;
