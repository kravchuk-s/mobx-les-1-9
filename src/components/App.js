import React, { Component } from 'react';
import DevTools from 'mobx-react-devtools';
import T from 'prop-types';
import '../assets/index.css';
import WishListView from './WishListView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="app-title">WishList</h1>
        </header>
        <WishListView wishList={this.props.wishList} />
        <DevTools />
      </div>
    );
  }
}

App.propTypes = {
  wishList: T.object,
};

export default App;
