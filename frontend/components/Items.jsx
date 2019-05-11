import React, { Component, Fragment } from 'react'
import ItemList from './ItemList';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY(
    $skip: Int, 
    ) {
    items(
      skip: $skip, 
      first: 4
    ) {
      id
      title
      price
      description
      image
      largeImage
    }
  }`

const Center = styled.div`  
  text-align: center;
`;

const ItemsWrapper = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 60px;
max-width: ${props => props.theme.maxWidth};
margin: 0 auto;
`;


class Items extends Component {

  render() {
    return (
      <div>
        <Center>
          <Query query={ALL_ITEMS_QUERY}>
            {({ loading, error, data, fetchMore }) => {
              if (loading) return <p>Loading...</p>
              if (error) return <p>{error.message}</p>
              console.log(data);
              return (
                <Fragment>
                  <ItemsWrapper>
                    <ItemList
                      items={data.items || []}
                      onLoadMore={() =>
                        fetchMore({
                          variables: {
                            skip: data.items.length
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (!fetchMoreResult) return prev;
                            return Object.assign({}, prev, {
                              items: [...prev.items, ...fetchMoreResult.items]
                            });
                          }
                        })
                      }
                    />
                  </ItemsWrapper>
                </Fragment>
              )
            }}
          </Query>
        </Center>
      </div>
    )
  }
}

export default Items;
export { ALL_ITEMS_QUERY };
