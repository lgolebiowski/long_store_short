import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const AllItemsQuery = gql`
  query AllItemsQuery {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }`

export default class Items extends Component {
  render() {
    return (
      <div>
        <Query query={AllItemsQuery}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>{error.message}</p>
            console.log(data);
            return (
              <Fragment>
                {data.items.map(item => {
                  return (
                    <div>
                    <p>{item.title}</p>
                    <p>{item.image}</p>
                    <p>{item.price}</p>
                    </div>
                  )})}
              </Fragment>
            )
          }}
        </Query>
      </div>
    )
  }
}
