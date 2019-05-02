import React, { Component } from 'react'
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
        
      </div>
    )
  }
}
