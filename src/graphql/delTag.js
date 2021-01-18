import { gql } from "apollo-boost";

export const DELTAG_Mutation = gql`
    mutation deletetag($id: String!, $email: String!, $index: Int!) {
        deletetag(id: $id, email: $email, index: $index)
    }
`;
