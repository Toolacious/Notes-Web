import { gql } from "apollo-boost";

export const CREATE_USER_MUTATION = gql`
    mutation createUser(
        $fname: String!
        $lname: String!
        $name: String!
        $email: String!
        $password: String!
    ) {
        createUser(
            data: {
                fname: $fname
                lname: $lname
                name: $name
                email: $email
                password: $password
            }
        ) {
            id
            name
            password
        }
    }
`;
