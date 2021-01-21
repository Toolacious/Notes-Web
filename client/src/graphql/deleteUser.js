import { gql } from "apollo-boost";

export const DELUSER_Mutation = gql`
    mutation deleteUser($email: String!) {
        deleteUser(email: $email)
    }
`;
