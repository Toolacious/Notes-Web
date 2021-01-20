import { gql } from "apollo-boost";

export const DELNOTE_Mutation = gql`
    mutation deleteNote($id: String!, $email: String!) {
        deleteNote(id: $id, email: $email)
    }
`;
