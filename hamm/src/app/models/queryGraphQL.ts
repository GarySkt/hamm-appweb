import gql from 'graphql-tag';


export const ITEMLIST = gql`
    query{
      getItems{
        name
        percentage
        amount
      }     
    }
`;