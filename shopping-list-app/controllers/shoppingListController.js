const ShoppingList = require('../models/shoppingListModel'); 

let shoppingLists = [
  new ShoppingList("3228", "Weekly Groceries", "123456", ["123457", "123458"], [
    { itemId: "12", name: "egg", quantity: 10, completed: false },
    { itemId: "13", name: "oil", quantity: 1, completed: true }
  ]),
  new ShoppingList("8223", "christmas", "11111", ["22222"], [
    { itemId: "33", name: "chocolate", quantity: 2, completed: false },
    { itemId: "34", name: "vodka", quantity: 9, completed: false }
  ])
];

const getShoppingLists = (req, res) => {
  const userShoppingLists = shoppingLists.filter(list => list.ownerId === req.user.userId);
  res.json({ shoppingLists: userShoppingLists });
};

const createShoppingList = (req, res) => {
  const { name, members, items } = req.body;

  const newShoppingList = new ShoppingList(
    shoppingLists.length + 1, 
    name,
    req.user.userId,
    members,
    items
  );

  shoppingLists.push(newShoppingList);
  res.json({ success: true, shoppingList: newShoppingList });
};

const getSingleShoppingList = (req, res) => {
  const { listId } = req.params;
  const shoppingList = shoppingLists.find(list => list.listId === listId);

  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  res.json({ shoppingList });
};


const deleteShoppingList = (req, res) => {
  const { listId } = req.params;
  const index = shoppingLists.findIndex(list => list.listId === listId);

  if (index === -1) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  shoppingLists.splice(index, 1);
  res.json({ success: true, message: 'Shopping list deleted' });
};


const updateShoppingList = (req, res) => {
  const { listId } = req.params;
  const { name, members, items } = req.body;

  const shoppingList = shoppingLists.find(list => list.listId === listId);

  if (!shoppingList) {
    return res.status(404).json({ error: 'Shopping list not found' });
  }

  shoppingList.name = name || shoppingList.name;
  shoppingList.members = members || shoppingList.members;
  shoppingList.items = items || shoppingList.items;

  res.json({ success: true, shoppingList });
};

module.exports = {
  getShoppingLists,
  createShoppingList,
  getSingleShoppingList,
  deleteShoppingList,
  updateShoppingList
};
