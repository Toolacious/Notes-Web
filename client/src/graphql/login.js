import { gql } from "apollo-boost";

export const LOGIN_Mutation = gql`
    mutation login($email: String!, $password: String!) {
        login(data: { email: $email, password: $password }) {
            userId
            name
            email
            accessToken
        }
    }
`;
