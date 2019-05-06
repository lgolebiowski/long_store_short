import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import Form from './styles/Form';
import gql from 'graphql-tag'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
    $image: String
    $largeImage: String
  ) {
    updateItem(
      id: $id
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

class UpdateItem extends Component {

  state = { 
    // title: 'Nike',
    // description: 'Air MAX 1',
    // image: '',
    // largeImage: '',
    // price: 215,
  }

  handleChange = (e) => {
    const { type, name, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    })
  }

  addFile = async (e) => {
    debugger;
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'long_store');
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/deby1avwi/image/upload',
      { method: 'POST', body: data }
    )
    
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    })
  }

  updateItem = async (e, updateItemMutation) => {
    e.preventDefault();
    console.log(this.state);
    const res = await updateItemMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    });

  }

  // addFile = async e => {
  //   const files = e.target.files;
  //   const data = new FormData();
  //   data.append('file', files[0]);
  //   data.append('upload_preset', 'long_store');

  //   const res = await fetch('https://api.cloudinary.com/v1_1/deby1avwi/image/upload', 
  //   {
  //     method: 'POST',
  //     body: data,
  //   });
  //   const file = await res.json();
  //   this.setState({
  //     image: file.secure_url,
  //     largeImage: file.eager[0].secure_url,
  //   });
  // };

  
  render() {
    return (
    <Query
      query={SINGLE_ITEM_QUERY}
      variables={{
        id: this.props.id,
      }}
    >
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (!data.item) return <p>No Item Found for ID {this.props.id}</p>;
        return (
        <Mutation mutation={ UPDATE_ITEM_MUTATION } variables={ this.state }>
          {(UpdateItem, { loading, error }) => (
          <Form
            onSubmit={(e) => {
              this.updateItem(e, UpdateItem)}
          }>
            <fieldset disabled={loading} aria-busy={loading}>
              Update Item
              <label htmlFor="title">
                Title 
                <input
                  type="text"
                  name="title"
                  placeholder="title"
                  required
                  defaultValue={data.item.title}
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
                  defaultValue={data.item.price}
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
                  defaultValue={data.item.description}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="uploadFile">
                Upload
                <input
                  type="file"
                  name="file"
                  placeholder="upload file"
                  required
                  onChange={this.addFile}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
        </Mutation>
      )
    }}
    </Query>
  )}
}
export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
