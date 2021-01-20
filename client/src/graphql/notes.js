import { gql } from "apollo-boost";

export const NOTES_QUERY = gql`
    query usernotes($email: String!) {
        usernotes(email: $email) {
            id
            tags
            links
            markdown
            title
        }
    }
`;
