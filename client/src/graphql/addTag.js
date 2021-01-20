import { gql } from "apollo-boost";

export const ADDTAG_Mutation = gql`
    mutation addtag($id: String!, $email: String!, $tag: String!) {
        addtag(id: $id, email: $email, tag: $tag)
    }
`;
