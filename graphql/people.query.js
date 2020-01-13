import gql from 'graphql-tag';

const PEOPLE_QUERY = gql`
query Peoples {
    allPeople {
        totalCount,
            edges { cursor, node { id name birthYear height gender homeworld { name } } }
    }
}
`;

export default PEOPLE_QUERY;
