import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import gql from 'graphql-tag'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

export default class CreateItem extends Component {

  state = { 
    title: 'Nike',
    description: 'Air MAX 1',
    image: '',
    largeImage: '',
    price: 215,
  }

  handleChange = (e) => {
    const { type, name, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    })
  }

  render() {
    return (
      <Mutation mutation={ CREATE_ITEM_MUTATION } variables={ this.state }>
        {(createItem, { loading, error }) => (
        <Form
          onSubmit={async e => {
          e.preventDefault();
          // call the mutation
          const res = await createItem();
          // change them to the single item page
          // console.log(res);
          // Router.push({
          //   pathname: '/item',
          //   query: { id: res.data.createItem.id },
          // });
        }}>
          <fieldset disabled={loading} aria-busy={loading}>
            Create a new Item
            <label htmlFor="title">
              Title 
              <input
                type="text"
                name="title"
                placeholder="title"
                required
                value={this.state.title}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="price">
              Price 
              <input
                type="number"
                name="price"
                placeholder="price"
                required
                value={this.state.price}
                onChange={this.handleChange}
              />
            </label>
            <label htmlFor="description">
              Description
              <textarea
                type="text"
                name="description"
                placeholder="description"
                required
                value={this.state.description}
                onChange={this.handleChange}
              />
            </label>
            <button type="submit">Submit</button>
          </fieldset>
        </Form>
      )}
      </Mutation>
    )
  }
}
