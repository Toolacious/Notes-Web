import { gql } from "apollo-boost";

export const UPLOAD_Mutation = gql`
    mutation upload($id: String!, $picture: String!) {
        upload(id: $id, picture: $picture)
    }
`;
