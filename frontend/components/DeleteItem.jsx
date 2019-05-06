import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {

  update = ( cache, payload ) => {
    // get data from cache - double check the queryname
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // filter the item with equal id
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id)
    // write back the updated copy to cache
    cache.writeQuery({ query: ALL_ITEMS_QUERY , data });
    console.log(cache.readQuery({ query: ALL_ITEMS_QUERY }));
  }


  render() {
    const { id, children } = this.props
    return (
      <Mutation 
        mutation={DELETE_ITEM_MUTATION}
        variables={{id,}}
        update={this.update}
      >
        {( deleteItem, { error }) => (
        <div>
          <button onClick={() => {
            if (confirm('Are you sure?')) {
              deleteItem();
            }
          }}>{children}</button>
        </div>
        )}
      </Mutation>
    )
  }
}

export default DeleteItem
