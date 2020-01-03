import React, { Component } from 'react'
import { Query } from 'react-apollo';
import Queries from '../queries'
import gql from 'graphql-tag';
import Head from 'next/head';
import styled from 'styled-components';


const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;


export default class SingleItem extends Component {

  render() {
    return (
      <Query
        query={Queries.GetSingleItem}
        variables={{
          id: this.props.id,
        }}
      >
        {({ data, loading }) => {
          const { item } = data;
          if (loading) {return <p>Loading...</p>}
          console.log(data);
          return (
            <SingleItemStyles>
              <Head>
                <title>Masujkule | {item.title}</title>
              </Head>
                <img src={item.largeImage} alt={item.title} />
                <div className="details">
                  <h2>Viewing {item.title}</h2>
                  <p>{item.description}</p>
              </div>
            </SingleItemStyles>
          )
        }
      }
      </Query>
    )
  }
}
