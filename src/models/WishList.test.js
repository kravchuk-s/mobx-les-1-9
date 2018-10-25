import { getSnapshot, onSnapshot, onPatch } from 'mobx-state-tree';
import { reaction } from 'mobx';
import { WishListItem, WishList } from './WishList';

it('can create model', () => {
  const item = WishListItem.create({
    name: 'Chronicles',
    price: 28.73,
  });

  expect(item.price).toBe(28.73);
  expect(item.image).toBe('');
  item.changeName('Narnia');
  expect(item.name).toBe('Narnia');
});

it('can create a wishlist', () => {
  const list = WishList.create({
    items: [
      {
        name: 'Chron',
        price: 28.73,
      },
    ],
  });

  expect(list.items.length).toBe(1);
  expect(list.items[0].price).toBe(28.73);
});

it('can add new items', () => {
  const list = WishList.create();
  const states = [];
  onSnapshot(list, snapshot => {
    states.push(snapshot);
  });
  list.add(
    WishListItem.create({
      name: 'Chersterton',
      price: 10,
    })
  );
    
  expect(list.items.length).toBe(1);
  expect(list.items[0].name).toBe('Chersterton');
  list.items[0].changeName('Book of');
  expect(list.items[0].name).toBe('Book of');

  expect(getSnapshot(list)).toMatchSnapshot();

  expect(states).toMatchSnapshot();
});

it('can add new items - 2', () => {
  const list = WishList.create();
  const patches = [];
  onPatch(list, patch => {
    patches.push(patch);
  });
  list.add(
    WishListItem.create({
      name: 'Chersterton',
      price: 10,
    })
  );
  list.items[0].changeName('Book of');

  expect(patches).toMatchSnapshot();
});

it('can calculate', () => {
  const list = WishList.create({
    items: [
      {
        name: 'Machine',
        price: 7.35,
        image: 'https://picsum.photos/200/300/?random',
      },
      {
        name: 'Lego',
        price: 349.95,
        image: 'https://picsum.photos/200/300/?random',
      },
    ],
  });

  expect(list.totalPrice).toBe(357.3);

  let changed = 0;
  reaction(() => list.totalPrice, () => changed++); // eslint-disable-line

  expect(changed).toBe(0);
  console.log(list.totalPrice);
  list.items[0].changeName('Test');
  expect(changed).toBe(0);
  list.items[0].changePrice(10);
  expect(changed).toBe(1);
});
