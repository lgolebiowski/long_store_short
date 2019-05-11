import React, { Component, Fragment } from 'react'
import Button from './styles/Button';
import Item from './Item';


const handleScroll = ({ currentTarget }, onLoadMore) => {
  console.log('scroll');
  console.log({ currentTarget });

  if (
    currentTarget.scrollTop + currentTarget.clientHeight >=
    currentTarget.scrollHeight
  ) {
    onLoadMore();
  }
};

const ItemList = ({ items, onLoadMore }) => (
  <Fragment>
    <Fragment>
      {items.map(item => <Item item={item} key={item.id} />)}
    </Fragment>
    <Button>
      <button 
        type="submit"
        onClick={e => handleScroll(e, onLoadMore)}
      >
      Load More</button>
    </Button>
  </Fragment>
);

export default ItemList;