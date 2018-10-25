import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './components/App';
import { onSnapshot } from 'mobx-state-tree';
import { WishList } from './models/WishList';

let initialState = {
  items: [
    {
      name: 'Machine',
      price: 7.35,
      image: 'https://picsum.photos/100/100/?random',
    },
    {
      name: 'Lego',
      price: 349.95,
      image: 'https://picsum.photos/100/100/?random',
    },
  ],
};

if (localStorage.getItem('wishlistapp')) {
  const json = JSON.parse(localStorage.getItem('wishlistapp'));
  if (WishList.is(json)) {
    initialState = json;
  }
}

const wishList = WishList.create(initialState);

onSnapshot(wishList, snapshot => {
  localStorage.setItem('wishlistapp', JSON.stringify(snapshot));
});
// eslint-disable-next-line
ReactDOM.render(<App wishList={wishList} />, document.getElementById('root'));

// setInterval(() => {
//     wishList.items[0].changePrice(wishList.items[0].price + 1)
// }, 1000)
