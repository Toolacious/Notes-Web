import { gql } from "apollo-boost";

export const LOGIN_QUERY = gql`
    query user($id: ID) {
        user(query: $id) {
            name
            email
        }
    }
`;
