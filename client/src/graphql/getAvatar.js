import { gql } from "apollo-boost";

export const AVATAR_QUERY = gql`
    query userAvatar($id: String!) {
        userAvatar(id: $id)
    }
`;
