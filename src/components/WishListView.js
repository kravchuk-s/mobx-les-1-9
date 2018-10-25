import React from 'react';
import { observer } from 'mobx-react';
import T from 'prop-types';
import WishListItemView from './WishListItemView';
import WishListItemEntry from './WishListItemEntry';

const WishListView = ({ wishList }) => (
  <div className="list">
    <ul>{wishList.items.map((item, index) =>
      <WishListItemView key={index} item={item} />)}
    </ul>
    Total: {wishList.totalPrice} $
    <WishListItemEntry wishList={wishList} />
  </div>
);

WishListView.propTypes = {
  wishList: T.object,
};

export default observer(WishListView);
